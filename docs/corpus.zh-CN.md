# Corpus 与 Release Policy

`corpus/prime-corpus.yaml` 是 Frontend Design Corpus Package 的 Source
declaration，与生成的 `corpus/dist/corpus.manifest.json` 不同。

Declaration 拥有 Corpus namespace 与 version、兼容 Model range、Source set 与
Provenance、每 Unit License、Citation、Asset、发布策略、默认 Retrieval 与 Eval。

当前可发布 Release 包含 797 个 `.prime` Source。每个 Source 都带显式协议
Metadata，并且 License 被 Corpus Policy 接受。另有 102 个 Unit 保留在
`corpus/quarantine/`，原因是上游条款不允许发布或仍未明确。

Quarantine 不是删除，也不是通过。每个排除 Unit 都保留 Disposition，后续权利
判断仍可审计。

```bash
bun run corpus:build
bun run corpus:check
bun run corpus:verify
```

只有 Compiler、Graph check、Manifest、Lock、Signature 与 Strict Runtime load
全部通过，构建才会原子替换 `corpus/dist/`。禁止修改生成 Projection、Index、
Manifest、Lock 或 Signature。
