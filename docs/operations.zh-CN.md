# Build、Publish 与 Smoke

仓库 Script 就是 Release Contract：

```bash
bun run typecheck
bun run test
bun run model:check
bun run corpus:build
bun run corpus:check
bun run corpus:verify
bun run smoke
```

`corpus:build` 绑定 Model、Corpus namespace 与声明的 Release date；
`corpus:verify` 要求 Signature 并重新计算 Snapshot content；`smoke` 让通用与领域
MCP 组合挂载相同 `model.lock`，并执行真实 Selection Query。

发布到 Registry 和激活 Runtime 是两个独立 Mutation。Local build 成功不代表已
发布。应保留上一不可变 Snapshot 以便 Rollback。

当前本地依赖路径是 `../kernary-engine`。Package 与 CI Workflow 使用同一路径，
Fresh clone 不再依赖旧仓库名。
