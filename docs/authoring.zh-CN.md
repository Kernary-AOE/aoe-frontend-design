# Source Authoring

人或 Agent 修改 `corpus/sources/`，不写入 `corpus/dist/`。

新增 Unit 前，先加载所属 Model Package，选择已声明的 Type、Field 与 Relation。
现有 Source 只能作为写作样例，不能替代 Schema authority。模型没有合适声明时，
通过受评审的 Model Release 修改 `model/`，不要 Patch Kernary Core。

每个可发布 Source 都要遵守 Corpus namespace 与 ID convention，记录要求的
Provenance 与 License metadata，并且只使用已声明 Relation semantics。License
字段缺失不能被推断成可以发布。

可选 `prime-author` 兼容 Skill 可以指导 Agent 执行流程，但不会自动 Publish，
也不能绕过 Model、Corpus、Signature 或 Release gate。

```bash
bun run model:check
bun run corpus:build
bun run corpus:check
bun run corpus:verify
```

Source Authoring 产生候选 Release；Runtime Action 是另一条路径，需要声明的
Provider、Capability、Policy、Preflight、Approval、Idempotency 与 Event evidence。
