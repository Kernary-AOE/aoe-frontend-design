# ImmutableInfrastructure [principle] v1.0.0
Servers, containers, and VMs in production must be replaced rather than modified. To change configuration, deploy code, or apply a security patch, build a new artifact (AMI, container image, machine image), boot a new instance from it, shift traffic, then terminate the old instance.
> An immutable artifact (image) is built once and produces identical instances every time. Configuration drift cannot accumulate because the system is never modified after boot. Rolling forward = boot new from new image; rolling back = boot new from previous image. SSH access is for debugging only; any mutation discovered there is a bug to be fixed in the next build, never preserved on the live host.
domain: infrastructure

## Attributed To
Chad Fowler, 'Trash Your Servers and Burn Your Code: Immutable Infrastructure and Disposable Components' (2013); Kief Morris, 'Infrastructure as Code' (O'Reilly 2016, 2nd ed. 2020).

## Applies To
- Production VMs / EC2 instances — built via Packer or EC2 Image Builder
- Container deployments — Docker images, ECS/Kubernetes deployments roll new pods, never `docker exec` to mutate
- Lambda / serverless functions — already immutable by design (deploy = new package)
- Edge nodes (Cloudflare Workers, Fastly Compute@Edge) — versioned deploys, never live-edited
- Network appliances — replace, don't patch (NSX-T, Cloud Router)

## Counter Examples
- SSH-ing into a production server to apply a patch with `apt-get upgrade` — host now differs from its peers; next ASG-replacement instance won't have the patch; drift accumulates silently.
- Cron job `chef-client --once` on running hosts — config-management treadmill; instances reach 'eventual consistency' but never 'identical', and convergence races break deploys.
- Manually editing /etc/nginx/nginx.conf on a load balancer to fix an emergency, planning to commit the change later — change is forgotten; subsequent autoscale event boots a fresh instance without the fix; outage recurs.
