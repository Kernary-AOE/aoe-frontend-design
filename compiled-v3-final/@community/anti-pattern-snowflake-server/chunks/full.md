# SnowflakeServer [anti-pattern] v1.0.0
A production server that has been hand-tweaked over its lifetime — packages installed manually, config files edited via SSH, cron jobs added by request, library versions pinned to fix a specific bug — to the point where no one can reproduce it. The server is unique, fragile, and impossible to replace.
domain: infrastructure

## Label
Snowflake Server

## Why Bad
A snowflake server has three compounding harms. (1) It cannot be reliably replaced — autoscaling, AZ failure, or hardware retirement require a manual rebuild that takes hours/days because the changes are documented (if at all) in tribal knowledge. (2) Its configuration cannot be code-reviewed, audited, or rolled back; security patches and compliance scans show divergent results across the fleet. (3) Capacity events become outages: the surviving servers are not identical, so adding capacity = bringing up a freshly-built host that immediately exhibits 'the new pod runs differently than the old' bugs. The term originated in Martin Fowler's 2012 'SnowflakeServer' bliki entry and was popularized by Kief Morris ('Infrastructure as Code', O'Reilly 2016): the metaphor is that no two snowflakes are alike, and that's bad for production.

## Instead Do
Adopt phoenix servers (Fowler) — every server is built fresh from an image and an immutable, version-controlled spec, then thrown away rather than modified. Combine with three reinforcing practices: (a) Infrastructure as Code (Terraform/Pulumi/CloudFormation) defines the resource shape; (b) configuration management (Ansible/Chef/Puppet) is run only at image-build time, never on running production hosts; (c) chaos-engineering exercises (Chaos Monkey, kube-monkey) routinely terminate hosts to prove they are replaceable. If a manual change to a production host is ever necessary (true emergency), the change is captured as a code commit within the same shift, and the entire fleet is rebuilt from the new image.

## Structure
```
    # WRONG — snowflake birthing process
    1. Ops engineer SSHes to web-prod-04
    2. apt-get install <new package>
    3. vim /etc/nginx/nginx.conf — adds custom rule
    4. systemctl restart nginx
    5. (no commit, no documentation)
    6. Six months later, web-prod-04's disk fails
    7. Replacement instance from ASG comes up; behaves differently
    8. Outage. RCA: 'configuration drift'

    # WRONG — partial snowflake
    Configuration management runs nightly (Chef), but the team uses
    `knife ssh` for one-off "quick fixes". Any host with a quick-fix
    is a snowflake until the chef cookbook catches up — usually never.

    # CORRECT — phoenix workflow
    1. Engineer wants to change nginx config
    2. Modify roles/web/files/nginx.conf in IaC repo
    3. PR, review, merge
    4. CI builds new AMI via Packer + Ansible
    5. Spinnaker / Argo rolls new ASG with new AMI
    6. Old hosts terminated; fleet is identical, change is reviewable + reversible
    7. Drift detection: nightly compare live AMI ID vs expected — alert on mismatch

    # CORRECT — emergency override (rare)
    1. Engineer SSHes to fix critical issue
    2. Within the SAME shift: capture the change as a PR
    3. Within 24h: full fleet rebuild from new image
    4. Otherwise the host is poisoned and must be terminated
  
```

## Label
Snowflake Server

## Why Bad
A snowflake server has three compounding harms. (1) It cannot be reliably replaced — autoscaling, AZ failure, or hardware retirement require a manual rebuild that takes hours/days because the changes are documented (if at all) in tribal knowledge. (2) Its configuration cannot be code-reviewed, audited, or rolled back; security patches and compliance scans show divergent results across the fleet. (3) Capacity events become outages: the surviving servers are not identical, so adding capacity = bringing up a freshly-built host that immediately exhibits 'the new pod runs differently than the old' bugs. The term originated in Martin Fowler's 2012 'SnowflakeServer' bliki entry and was popularized by Kief Morris ('Infrastructure as Code', O'Reilly 2016): the metaphor is that no two snowflakes are alike, and that's bad for production.

## Instead Do
Adopt phoenix servers (Fowler) — every server is built fresh from an image and an immutable, version-controlled spec, then thrown away rather than modified. Combine with three reinforcing practices: (a) Infrastructure as Code (Terraform/Pulumi/CloudFormation) defines the resource shape; (b) configuration management (Ansible/Chef/Puppet) is run only at image-build time, never on running production hosts; (c) chaos-engineering exercises (Chaos Monkey, kube-monkey) routinely terminate hosts to prove they are replaceable. If a manual change to a production host is ever necessary (true emergency), the change is captured as a code commit within the same shift, and the entire fleet is rebuilt from the new image.

## Structure
```
    # WRONG — snowflake birthing process
    1. Ops engineer SSHes to web-prod-04
    2. apt-get install <new package>
    3. vim /etc/nginx/nginx.conf — adds custom rule
    4. systemctl restart nginx
    5. (no commit, no documentation)
    6. Six months later, web-prod-04's disk fails
    7. Replacement instance from ASG comes up; behaves differently
    8. Outage. RCA: 'configuration drift'

    # WRONG — partial snowflake
    Configuration management runs nightly (Chef), but the team uses
    `knife ssh` for one-off "quick fixes". Any host with a quick-fix
    is a snowflake until the chef cookbook catches up — usually never.

    # CORRECT — phoenix workflow
    1. Engineer wants to change nginx config
    2. Modify roles/web/files/nginx.conf in IaC repo
    3. PR, review, merge
    4. CI builds new AMI via Packer + Ansible
    5. Spinnaker / Argo rolls new ASG with new AMI
    6. Old hosts terminated; fleet is identical, change is reviewable + reversible
    7. Drift detection: nightly compare live AMI ID vs expected — alert on mismatch

    # CORRECT — emergency override (rare)
    1. Engineer SSHes to fix critical issue
    2. Within the SAME shift: capture the change as a PR
    3. Within 24h: full fleet rebuild from new image
    4. Otherwise the host is poisoned and must be terminated
  
```

## Derived From
@community/principle-immutable-infrastructure
