# ImmutableInfrastructure [principle] v1.0.0
Servers, containers, and VMs in production must be replaced rather than modified. To change configuration, deploy code, or apply a security patch, build a new artifact (AMI, container image, machine image), boot a new instance from it, shift traffic, then terminate the old instance.
> An immutable artifact (image) is built once and produces identical instances every time. Configuration drift cannot accumulate because the system is never modified after boot. Rolling forward = boot new from new image; rolling back = boot new from previous image. SSH access is for debugging only; any mutation discovered there is a bug to be fixed in the next build, never preserved on the live host.
domain: infrastructure
