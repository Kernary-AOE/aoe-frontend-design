# BlueGreenDeploy [pattern] v1.0.0
Run two identical production environments (blue and green); only one serves live traffic at a time. Deploy new code to the idle environment, run smoke tests, then atomically switch the traffic router to the new environment. Roll back by switching the router back.
domain: infrastructure

## Facts

## Label
Blue/Green Deployment

## Problem
In-place rolling deploys (replacing instances one-by-one in the live fleet) leave the system in a hybrid state during the rollout: half the requests hit old code, half hit new. Database migrations, cache invalidations, and feature-flag interactions become subtle. Rollback requires another rolling deploy of the previous version, multiplying the time-at-risk. The team chooses 'fast deploy' or 'safe rollback' but cannot have both.

## Solution
Maintain two complete environments — call them blue and green — that are identical except for code version. A traffic router (DNS, ALB, service mesh, BGP weight) directs 100% of traffic to one. To deploy: install new code on the idle env, run health checks and smoke tests, then flip the router. The old env stays warm as the rollback target. After a stabilization window (~24h), the old env can be torn down or repurposed as the next deploy target.

## Structure
```
    # Topology — at steady state
    [users] → [router (DNS / ALB / mesh)] ─────► [blue env: current]   (100% traffic)
                                                  [green env: idle]    (warm, previous version)

    # During deploy
    1. Apply Terraform / Helm to green env — new image rolls out
    2. green env runs synthetic checks against itself (no live traffic)
    3. Smoke test fleet against green's internal endpoint
    4. Flip router: blue → green
    5. green now serves 100%; blue is the rollback target

    # Variant: weighted traffic split (canary blue/green)
    Step 4 can be staged: 1% → 10% → 50% → 100% over an hour with auto-rollback on SLO breach.

    # AWS implementation
    - 2 ASGs behind 1 ALB target group, register/deregister
    - OR 2 target groups, ALB listener-rule weight shift (ALB blue/green)
    - OR Route 53 weighted records
    - CodeDeploy AppSpec for ECS / Lambda has native blue/green

    # Kubernetes implementation
    - 2 Deployments (svc-blue, svc-green) + 1 Service that selects via label
    - Argo Rollouts: BlueGreen strategy with `activeService` and `previewService`
      strategy:
        blueGreen:
          activeService:    svc-active
          previewService:   svc-preview
          autoPromotionEnabled: false   # manual promote after smoke tests

    # Database considerations (the hard part)
    - Schema changes must be additive: deploy new schema BEFORE blue/green flip
    - Old code reads new schema OK; new code reads old schema OK during the overlap
    - Drop deprecated columns only after both envs have been on new code for >24h
    - Two-phase migration: Expand → Migrate → Contract
  
```
