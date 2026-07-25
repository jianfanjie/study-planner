# 回归测试

依赖 gstack browse CLI（无头 Chromium）。前置：`docker compose up -d`（localhost:8080）。

```bash
B="$HOME/.claude/skills/gstack/browse/dist/browse"
cat tests/regression.chain.json | "$B" chain
"$B" stop   # 测完务必关闭守护进程
```

断言覆盖：
- T1 雅思输入防呆提示（>9 报警）
- T2 年级联动（探索期锁 G8/G9、G11/12 MAP→SAT/ACT、意向路线锁死）
- T3 港三所 Cut-off 梯度（未过线观望区 <52%、过线 ≥60%）
- T4 IB 满分踏穿门槛线文案
- T5 美区 Profile Matrix 适配（领导力高亮 + Holistic 总评）
- T6 成长曲线存档与显示
- T7 数据版本标注 + PDF 英文摘要

预期：每行输出全部为 true / 符合区间，console 无错误。
