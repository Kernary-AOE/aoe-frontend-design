# EnterpriseScalableNaming [rule] v1.0.0
> Naming conventions for labels, section names, and entity identifiers in enterprise information architectures must be unique and unambiguous when seen from the global (top) level — no two levels of the IA may use the same term for different things.
domain: frontend-design

## Severity
warning

## Applies When
Defining labels, section names, or object identifiers in a multi-organization, multi-product, or multi-tenant IA.

## Verify By
Ask: if a user sees this name at the global level without context, will they know what it refers to? Are there other entities in the IA that share this name? Test with 3 users unfamiliar with the specific product.

## Rationale
Ambiguous names at different IA levels lead to user errors and data misrouting in multi-tenant environments. 'Project' meaning different things at the Organization level vs the Workspace level vs the User level creates compounding confusion at scale.

## Severity
warning

## Applies When
Defining labels, section names, or object identifiers in a multi-organization, multi-product, or multi-tenant IA.

## Verify By
Ask: if a user sees this name at the global level without context, will they know what it refers to? Are there other entities in the IA that share this name? Test with 3 users unfamiliar with the specific product.
