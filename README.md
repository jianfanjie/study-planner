# 智能学业规划系统

香港国际学校 A-Level / IB 双轨学业规划工具。单页应用，含 5 个模块：

1. **学习路径** — 输入校内成绩（MYP/IGCSE/美制）、IELTS/TOEFL/小托福、MAP RIT 分数，引擎逆推生成个性化三阶段学习路径 + Top 30 概率 + JSON 输出
2. **时间轴** — 三阶段基线规划（地基铺设 → 定线 → 冲刺）
3. **能力雷达** — 五维基线与各阶段目标曲线对比（输入分数后自动替换为个人实测值）
4. **决策矩阵** — A-Level vs IB 分水岭对比 + 预置决策规则
5. **里程碑** — M1–M8 考核点打卡追踪（本机自动保存）

## 启动（Docker Desktop）

```bash
docker compose up -d --build
```

打开浏览器访问 **http://localhost:8080**

停止：`docker compose down`；改端口：编辑 `docker-compose.yml` 中的 `8080`。

## 目录结构

```
├── docker-compose.yml
├── Dockerfile          # nginx:alpine 静态服务
└── web/
    └── index.html      # 全部前端 + 规则引擎（无外部依赖）
```

数据（输入的分数、里程碑打卡）保存在浏览器 localStorage，容器重建不丢失。
