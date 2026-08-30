# Security Policy

## Scope

Shrink is a browser-based compression application. The normal compression workflow is designed to process files locally in the browser. Optional AI-assisted functionality uses separate external services when explicitly enabled.

## Reporting a vulnerability

Please do not disclose a suspected security vulnerability publicly before it has been reviewed.

For security issues involving the Shrink application, source code, deployment configuration, or exposed project assets, contact the project maintainer through a private GitHub security report when GitHub's private reporting features are enabled for this repository.

When reporting an issue, include:

- a clear description of the vulnerability;
- affected URL, file, feature, or workflow;
- reproducible steps or a minimal proof of concept;
- the security impact you observed; and
- any relevant browser, operating-system, or deployment details.

Please do not include real user files, API keys, access tokens, passwords, or other sensitive information in a report.

## Secrets and private services

The repository must not contain API keys, tokens, credentials, private relay code, or user data. The private AI relay is intentionally kept outside this public repository.

If a credential is accidentally committed, treat it as compromised: revoke or rotate it immediately and remove it from active configuration. Removing a secret from the latest commit does not by itself make the credential safe again.

## Dependency security

Review third-party dependencies and remotely loaded libraries when they are added or upgraded. Pay particular attention to browser-executed JavaScript, WebAssembly codecs, CDN delivery, and any package whose runtime behavior can change independently of the Shrink source.

See `THIRD_PARTY_NOTICES.txt` for the current dependency and external-service inventory.

## Supported releases

Security fixes should be applied to the current production branch and deployed version. Historical commits and old deployments are not guaranteed to receive security updates.
