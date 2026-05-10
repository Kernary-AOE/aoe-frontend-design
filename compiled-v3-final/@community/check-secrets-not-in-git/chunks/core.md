# SecretsNotInGit [check] v1.0.0
No secrets (API keys, passwords, tokens, private keys, connection strings) must exist in any git commit — past or present. A pre-commit hook and CI scan must enforce this automatically.
domain: security

## Success Criterion
gitleaks / git-secrets pre-commit hook installed and passing. CI gitleaks scan returns zero findings. No .env files tracked by git. No private keys (BEGIN PRIVATE KEY / BEGIN RSA PRIVATE KEY) in repository history.

## How To Verify
```
    # 1. Install gitleaks and scan full repo history
    brew install gitleaks     # macOS
    # or: go install github.com/gitleaks/gitleaks/v8@latest

    gitleaks detect --source . --verbose
    # Scans entire git history. Zero findings = pass.

    # 2. Scan only the last commit (fast, for pre-commit hook)
    gitleaks protect --staged --verbose
    # Scans staged changes before commit.

    # 3. git-secrets (AWS-focused, simpler)
    brew install git-secrets
    git secrets --install    # installs pre-commit hook into current repo
    git secrets --add-provider -- git secrets --aws-provider
    git secrets --scan-history

    # 4. Check .gitignore covers common secret file patterns
    grep -E '\.env|\.env\.local|\.env\.\*|private\.key|secrets\.json' .gitignore \
      || echo "WARN: .gitignore may not exclude secret files"

    # 5. Verify tracked files do not include .env
    git ls-files | grep -E '\.env$|\.env\.'
    # Should return nothing

    # 6. GitHub Actions — CI scan
    - name: Secrets scan
      uses: gitleaks/gitleaks-action@v2
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

    # 7. Trufflehog (high recall, good for deep history scans)
    trufflehog git file://. --since-commit HEAD~50 --only-verified
  
```

## Fix Suggestion
If a secret is found in history: (1) immediately rotate the exposed credential, (2) use git filter-repo to purge the secret from history (NOT git rebase — it leaves reflog), (3) force-push to all remotes, (4) notify affected service (GitHub revokes exposed PATs automatically). Add the pattern to .gitleaks.toml allowlist only for false positives (test fixture public keys, example values), never for real secrets.

## Severity
critical
