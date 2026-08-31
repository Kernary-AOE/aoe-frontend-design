# Scout SourceAdapter

Scout 是 `adapters/scout-catalog/` 下的可选外部参考目录。18 个 Source
declaration 描述 61,590 条标准化 Reference，但不会把它们变成 Corpus Unit。

Payload 不提交到 Git，也不会在 Query 时下载。Operator 提供 Data root；
`sources.yaml` 记录每个 Source 的 Provenance、License、Field mapping、Count 与
Digest。

Data root 缺失会返回显式 `SCOUT_DATA_ROOT_ABSENT` 和零 Reference；Count 或
Digest drift 也会被报告。Adapter 不会把 Payload 缺失伪装成空成功。

Scout 使用 SourceAdapter，是因为结果需要外部 URL、Thumbnail、Provenance 与
License。Kernary 的 Corpus Candidate Generator 返回 Unit identity 并参与
Projection budget，把 61,590 条外部记录强塞进该 Contract 会抹掉边界。
