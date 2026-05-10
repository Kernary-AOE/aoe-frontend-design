# RpcAsRest [anti-pattern] v1.0.0
An API that uses HTTP+JSON but ignores REST semantics: verb-in-URL paths, status codes that don't match operations, GET with side effects, POST for everything. The result is a worst-of-both-worlds API that loses RPC's type safety AND REST's tooling compatibility.
domain: api-design
