#!/usr/bin/env python3
"""Validate Shrink's static SEO site without executing the application.

Checks HTML metadata, canonical URLs, sitemap coverage, internal links, and
common placeholder/TODO markers. The script uses only the Python standard
library so it can run in CI without installing dependencies.
"""
from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
SITEMAP = PUBLIC / "sitemap.xml"
SITE_ORIGIN = "https://shrink.saharitam171.workers.dev"
PLACEHOLDER_RE = re.compile(r"REPLACE_WITH_YOUR_DOMAIN|TODO(?:\b|:)", re.I)


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.description = ""
        self.canonical = ""
        self.h1_count = 0
        self.links: list[str] = []
        self._in_title = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_d = dict(attrs)
        if tag.lower() == "title":
            self._in_title = True
        elif tag.lower() == "meta" and attrs_d.get("name", "").lower() == "description":
            self.description = attrs_d.get("content") or ""
        elif tag.lower() == "link" and attrs_d.get("rel", "").lower() == "canonical":
            self.canonical = attrs_d.get("href") or ""
        elif tag.lower() == "h1":
            self.h1_count += 1
        elif tag.lower() == "a":
            href = attrs_d.get("href")
            if href:
                self.links.append(href)

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "title":
            self._in_title = False

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self.title += data


def public_html_pages() -> list[Path]:
    return sorted(PUBLIC.rglob("*.html"))


def page_url(path: Path) -> str:
    relative = path.relative_to(PUBLIC)
    if relative.name == "index.html":
        relative = relative.parent
    return SITE_ORIGIN + "/" + str(relative).replace("\\", "/").strip("/") + "/"


def href_to_public_path(page: Path, href: str) -> Path | None:
    href = href.strip()
    if not href or href.startswith(("#", "mailto:", "tel:", "javascript:")):
        return None
    parsed = urlparse(href)
    if parsed.scheme or parsed.netloc:
        if parsed.scheme not in ("http", "https"):
            return None
        if parsed.netloc != urlparse(SITE_ORIGIN).netloc:
            return None
        target = parsed.path
    else:
        target = href.split("#", 1)[0].split("?", 1)[0]

    if target.startswith("/"):
        relative = target.lstrip("/")
    else:
        relative = str((page.parent / target).resolve().relative_to(PUBLIC.resolve())).replace("\\", "/")

    candidate = PUBLIC / relative
    if candidate.is_file():
        return candidate
    if candidate.is_dir() and (candidate / "index.html").is_file():
        return candidate / "index.html"
    if not candidate.suffix and (PUBLIC / (relative + ".html")).is_file():
        return PUBLIC / (relative + ".html")
    return None


def load_sitemap_urls() -> set[str]:
    root = ET.parse(SITEMAP).getroot()
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    return {
        (node.text or "").strip().rstrip("/") + "/"
        for node in root.findall("sm:url/sm:loc", ns)
        if node.text
    }


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []
    pages = public_html_pages()

    if not pages:
        errors.append("No HTML pages found under public/")
        pages = []

    sitemap_urls = load_sitemap_urls()
    expected_sitemap = {page_url(p).rstrip("/") + "/" for p in pages}

    missing_from_sitemap = sorted(expected_sitemap - sitemap_urls)
    extra_in_sitemap = sorted(sitemap_urls - expected_sitemap)

    for url in missing_from_sitemap:
        warnings.append(f"HTML page missing from sitemap: {url}")
    for url in extra_in_sitemap:
        errors.append(f"Sitemap URL has no matching HTML page: {url}")

    seen_canonicals: dict[str, Path] = {}

    for page in pages:
        text = page.read_text(encoding="utf-8", errors="strict")
        parser = PageParser()
        try:
            parser.feed(text)
        except Exception as exc:  # pragma: no cover - defensive
            errors.append(f"{page}: HTML parse failure: {exc}")
            continue

        if not parser.title.strip():
            errors.append(f"{page}: missing <title>")
        if not parser.description.strip():
            errors.append(f"{page}: missing meta description")
        if parser.h1_count != 1:
            errors.append(f"{page}: expected exactly 1 <h1>, found {parser.h1_count}")

        expected = page_url(page)
        canonical = parser.canonical.strip()
        if not canonical:
            errors.append(f"{page}: missing canonical")
        elif canonical.rstrip("/") != expected.rstrip("/"):
            errors.append(f"{page}: canonical mismatch; expected {expected}, got {canonical}")
        elif canonical in seen_canonicals:
            errors.append(f"Duplicate canonical {canonical}: {seen_canonicals[canonical]} and {page}")
        else:
            seen_canonicals[canonical] = page

        if PLACEHOLDER_RE.search(text):
            warnings.append(f"{page}: contains TODO/placeholder text")

        for href in parser.links:
            target = href_to_public_path(page, href)
            parsed = urlparse(href)
            local = not parsed.scheme and not parsed.netloc
            same_origin = parsed.netloc == urlparse(SITE_ORIGIN).netloc if parsed.netloc else True
            if (local or same_origin) and href_to_public_path(page, href) is None:
                # Ignore links to the root fragment only; those were filtered above.
                errors.append(f"{page}: broken internal link: {href}")

    robots = PUBLIC / "robots.txt"
    if not robots.exists():
        errors.append("Missing public/robots.txt")
    else:
        robots_text = robots.read_text(encoding="utf-8")
        if f"Sitemap: {SITE_ORIGIN}/sitemap.xml" not in robots_text:
            errors.append("robots.txt does not reference the production sitemap")

    if not SITEMAP.exists():
        errors.append("Missing public/sitemap.xml")

    print(f"Checked {len(pages)} HTML pages.")
    print(f"Sitemap entries: {len(sitemap_urls)}")
    print(f"Canonical URLs: {len(seen_canonicals)}")

    for warning in warnings:
        print(f"WARN: {warning}")
    for error in errors:
        print(f"ERROR: {error}")

    if errors:
        print(f"FAILED: {len(errors)} error(s), {len(warnings)} warning(s).")
        return 1

    print(f"PASS: 0 errors, {len(warnings)} warning(s).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
