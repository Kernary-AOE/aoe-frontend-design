# IacRequired [rule] v1.0.0
Every production cloud resource — VPC, subnet, security group, IAM role, RDS instance, S3 bucket, Kubernetes cluster, DNS record — must be created, modified, and destroyed via committed Infrastructure as Code (Terraform, OpenTofu, Pulumi, CloudFormation, CDK). Click-ops (changes via console) is forbidden in production.
> All infrastructure changes go through pull request → plan review → approved apply, executed by an automation account that the developer cannot bypass. Drift detection runs nightly: any resource whose live state diverges from the IaC state is either reconciled back or imported into IaC. Console-write IAM permissions are removed from human users in production accounts; break-glass access is audited and time-boxed.
domain: infrastructure
