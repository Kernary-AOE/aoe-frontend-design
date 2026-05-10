# IacRequired [rule] v1.0.0
Every production cloud resource — VPC, subnet, security group, IAM role, RDS instance, S3 bucket, Kubernetes cluster, DNS record — must be created, modified, and destroyed via committed Infrastructure as Code (Terraform, OpenTofu, Pulumi, CloudFormation, CDK). Click-ops (changes via console) is forbidden in production.
> All infrastructure changes go through pull request → plan review → approved apply, executed by an automation account that the developer cannot bypass. Drift detection runs nightly: any resource whose live state diverges from the IaC state is either reconciled back or imported into IaC. Console-write IAM permissions are removed from human users in production accounts; break-glass access is audited and time-boxed.
domain: infrastructure

## Applies To
- All cloud accounts hosting production workloads
- DNS — Route 53, Cloudflare, etc. (Terraform providers exist for every major DNS host)
- Kubernetes manifests (kubectl apply via GitOps: ArgoCD, Flux)
- SaaS configuration with Terraform providers (Datadog monitors, PagerDuty rotations, GitHub repo settings, Auth0 tenants)
- Secrets storage layout (Vault paths, AWS Secrets Manager hierarchies — define structure in IaC, secret values in vault)
- Network policies, WAF rules, CDN configs

## Implementation Checklist
- Terraform / OpenTofu / Pulumi state stored in remote backend (S3 + DynamoDB lock, GCS + lease, or Terraform Cloud) — never local
- CI/CD runs `terraform plan` on PR; plan output posted as PR comment; `apply` runs only on merge to main via service-account
- Production IAM: human users have read-only console; `Allow: ec2:*` on the deploy-bot role is the only path to mutate
- Drift detection: nightly `terraform plan -detailed-exitcode`; non-zero alerts the platform team; reconciliation is the next PR
- Resource naming convention enforced (e.g. `{env}-{service}-{type}-{purpose}`) and validated via tflint or pre-commit
- Module versioning: shared modules (vpc, eks-cluster, rds-postgres) pinned by tag; renovate-bot opens upgrade PRs
- All secrets injected at apply-time from vault; never `terraform.tfvars` with secrets in repo

## Severity
block

## Counter Examples
- Engineer A creates an S3 bucket via console for 'a quick demo'; bucket is left public; appears in next-day Shodan scan; data exfiltrated. Bucket was not in Terraform, so the security audit never reviewed its policy.
- Manual ALB target-group change to 'fix' a 502 error during incident; change is forgotten; six months later a Terraform apply drops the manual change; outage recurs.
- Acquired team's 'production' is 200 manually-configured EC2 instances; integration takes 18 months because the new team must reverse-engineer + IaC-import every resource.

## Examples
- HashiCorp Terraform Cloud + GitHub: PR triggers plan, posts diff as comment; merge triggers apply by Terraform Cloud's service identity; drift detection runs every 24h.
- GitLab + Atlantis: open-source PR-driven Terraform workflow; comment `atlantis plan` runs plan, `atlantis apply` runs apply with approval gate.
- Pulumi automation API: programmatic IaC; useful when generating resources dynamically (e.g. tenant-per-customer).
- AWS CDK + CloudFormation StackSets: deploys identical stacks across multiple accounts/regions for org-wide policies.
- FluxCD / ArgoCD: GitOps for Kubernetes — cluster reconciles to git state every few minutes; drift = automatic revert.

## Rationale
Infrastructure changes made via the console are not reviewable, not reversible, not auditable, and not reproducible. The team loses three things at once: (1) a single source of truth for what production looks like, (2) the ability to spin up an identical staging or DR environment, (3) the ability to roll back a misconfiguration. Every major cloud incident post-mortem in the past decade includes some variant of 'engineer made a manual change'. Hashicorp's State of Cloud Strategy 2023 reports 88% of organizations using IaC for >75% of resources cite reduced incidents as the top benefit.

## Applies To
- All cloud accounts hosting production workloads
- DNS — Route 53, Cloudflare, etc. (Terraform providers exist for every major DNS host)
- Kubernetes manifests (kubectl apply via GitOps: ArgoCD, Flux)
- SaaS configuration with Terraform providers (Datadog monitors, PagerDuty rotations, GitHub repo settings, Auth0 tenants)
- Secrets storage layout (Vault paths, AWS Secrets Manager hierarchies — define structure in IaC, secret values in vault)
- Network policies, WAF rules, CDN configs

## Implementation Checklist
- Terraform / OpenTofu / Pulumi state stored in remote backend (S3 + DynamoDB lock, GCS + lease, or Terraform Cloud) — never local
- CI/CD runs `terraform plan` on PR; plan output posted as PR comment; `apply` runs only on merge to main via service-account
- Production IAM: human users have read-only console; `Allow: ec2:*` on the deploy-bot role is the only path to mutate
- Drift detection: nightly `terraform plan -detailed-exitcode`; non-zero alerts the platform team; reconciliation is the next PR
- Resource naming convention enforced (e.g. `{env}-{service}-{type}-{purpose}`) and validated via tflint or pre-commit
- Module versioning: shared modules (vpc, eks-cluster, rds-postgres) pinned by tag; renovate-bot opens upgrade PRs
- All secrets injected at apply-time from vault; never `terraform.tfvars` with secrets in repo

## Severity
block

## Counter Examples
- Engineer A creates an S3 bucket via console for 'a quick demo'; bucket is left public; appears in next-day Shodan scan; data exfiltrated. Bucket was not in Terraform, so the security audit never reviewed its policy.
- Manual ALB target-group change to 'fix' a 502 error during incident; change is forgotten; six months later a Terraform apply drops the manual change; outage recurs.
- Acquired team's 'production' is 200 manually-configured EC2 instances; integration takes 18 months because the new team must reverse-engineer + IaC-import every resource.

## Derived From
@community/principle-immutable-infrastructure
