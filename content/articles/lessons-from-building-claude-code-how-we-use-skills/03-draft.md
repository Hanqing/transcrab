# 构建 Claude Code 的经验教训：我们如何使用 Skills

Skills 已成为 Claude Code 最常用的扩展点之一。它们灵活、易于制作、简单分发。

但这种灵活性也让人们很难知道什么才是最佳实践。什么样的 Skills 值得制作？编写好 Skills 的秘诀是什么？什么时候应该与他人分享？

我们在 Anthropic 广泛使用 Claude Code 的 Skills，目前有数百个正在使用中。这些是我们学到的关于使用 Skills 加速开发的经验。

## 什么是 Skills？

如果你是 Skills 的新手，我建议[阅读我们的文档](https://code.claude.com/docs/en/skills)或观看我们在 [Skilljar 上关于 Agent Skills](https://anthropic.skilljar.com/introduction-to-agent-skills) 的最新课程，这篇文章假设你已经对 Skills 有一定了解。

我们听到的一个常见误解是 Skills "只是 markdown 文件"，但 Skills 最有趣的部分是它们不仅仅是文本文件。它们是包含脚本、资产、数据等的文件夹，Agent 可以发现、探索和操作它们。

在 Claude Code 中，Skills 也有[多种配置选项](https://code.claude.com/docs/en/skills#frontmatter-reference)，包括注册动态钩子。

我们发现 Claude Code 中一些最有趣的 Skills 创造性地使用了这些配置选项和文件夹结构。

## Skills 的类型

在整理了我们所有的 Skills 后，我们注意到它们可以分为几个重复的类别。最好的 Skills 干净地归入一类；比较混乱的则跨越几个类别。这不是确定的列表，但如果你在思考组织内是否缺少什么，这是一个很好的思考方式。

## 1. 库和 API 参考

解释如何正确使用库、CLI 或 SDK 的 Skills。这些可以是内部库或 Claude Code 有时会有困难的常见库。这些 Skills 通常包含参考代码片段文件夹和 Claude 在编写脚本时需要避免的陷阱列表。

示例：

- billing-lib — 你的内部计费库：边缘情况、隐患等
- internal-platform-cli — 你的内部 CLI 包装器的每个子命令及使用示例
- frontend-design — 让 Claude 更懂你的设计系统

## 2. 产品验证

描述如何测试或验证代码是否正常工作的 Skills。这些通常与 Playwright、tmux 等外部工具配对使用。

验证 Skills 对于确保 Claude 的输出正确非常有用。值得让工程师花一周时间专门让你的验证 Skills 达到优秀。

考虑使用一些技术，比如让 Claude 录制其输出的视频，这样你可以准确看到它测试了什么，或者在每一步强制执行状态编程断言。这些通常通过在 Skill 中包含各种脚本来实现。

示例：

- signup-flow-driver — 在无头浏览器中运行注册 → 邮件验证 → 引导，每一步都有状态断言钩子
- checkout-verifier — 用 Stripe 测试卡驱动结账 UI，验证发票实际处于正确状态
- tmux-cli-driver — 用于交互式 CLI 测试，当你需要验证的东西需要 TTY 时

## 3. 数据获取与分析

连接到你的数据和监控堆栈的 Skills。这些 Skills 可能包含带凭证获取数据的库、特定的仪表板 ID 等，以及常见工作流或获取数据方式的说明。

示例：

- funnel-query — "我要连接哪些事件才能看到注册 → 激活 → 付费"，加上实际有规范 user_id 的表
- cohort-compare — 比较两个队列的留存或转化，标记统计显著的差异，链接到细分定义
- grafana — 数据源 UID、集群名称、问题 → 仪表板查找表

## 4. 业务流程和团队自动化

将重复工作流自动化为一个命令的 Skills。这些 Skills 通常是相当简单的指令，但可能与其他 Skills 或 MCP 有更复杂的依赖关系。对于这些 Skills，将先前结果保存在日志文件中可以帮助模型保持一致并回顾工作流的先前执行。

示例：

- standup-post — 汇总你的工单追踪器、GitHub 活动和之前的 Slack → 格式化的站会，只显示变化
- create-<ticket-system>-ticket — 强制执行 schema（有效的枚举值、必填字段）加上创建后工作流（@审核者、在 Slack 中链接）
- weekly-recap — 合并的 PR + 关闭的工单 + 部署 → 格式化的每周总结

## 5. 代码脚手架和模板

为代码库中特定功能生成框架样板文件的 Skills。你可以将这些 Skills 与可组合的脚本结合使用。当你的脚手架有无法纯代码覆盖的自然语言需求时，它们特别有用。

示例：

- new-<framework>-workflow — 用你的注解脚手架新服务/工作流/处理器
- new-migration — 你的迁移文件模板加上常见陷阱
- create-app — 新的内部应用，预接好你的认证、日志和部署配置

## 6. 代码质量和审查

在组织内执行代码质量并帮助审查代码的 Skills。这些可以包括最大健壮性的确定性脚本或工具。你可能希望将这些 Skills 作为钩子的一部分自动运行或在 GitHub Action 中运行。

- adversarial-review — 生成一个全新视角的子 Agent 来批评，实施修复，迭代直到发现降级为挑剔
- code-style — 强制执行代码风格，尤其是 Claude 默认做不好的那些
- testing-practices — 关于如何写测试以及测试什么的说明

## 7. CI/CD 和部署

帮助你获取、推送和部署代码到代码库的 Skills。这些 Skills 可能引用其他 Skills 来收集数据。

示例：

- babysit-pr — 监控 PR → 重试不稳定的 CI → 解决合并冲突 → 启用自动合并
- deploy-<service> — 构建 → 冒烟测试 → 逐步流量推出并比较错误率 → 回滚时自动回滚
- cherry-pick-prod — 隔离 worktree → cherry-pick → 冲突解决 → 带模板的 PR

## 8. 运行手册

接收症状（如 Slack 线程、告警或错误签名），遍历多工具调查，并生成结构化报告的 Skills。

示例：

- <service>-debugging — 将症状映射到工具 → 你的高流量服务的查询模式
- oncall-runner — 获取告警 → 检查常见嫌疑 → 格式化发现
- log-correlator — 给定请求 ID，从可能涉及它的每个系统拉取匹配日志

## 9. 基础设施运维

执行常规维护和操作程序的 Skills——其中一些涉及有益于护栏的保护性破坏性操作。这些让工程师更容易在关键操作中遵循最佳实践。

示例：

- <resource>-orphans — 找到孤立的 pod/卷 → 发布到 Slack → 浸泡期 → 用户确认 → 级联清理
- dependency-management — 你的组织依赖审批工作流
- cost-investigation — "为什么我们的存储/出口账单飙升"，带有特定桶和查询模式

## 制作 Skills 的技巧

一旦决定了要制作 Skill，你应该怎么写？这些是我们发现的一些最佳实践、技巧和诀窍。

我们最近还发布了 [Skill Creator](https://claude.com/blog/improving-skill-creator-test-measure-and-refine-agent-skills)，让在 Claude Code 中创建 Skills 更容易。

## 不要陈述显而易见的事情

Claude Code 对你的代码库了解很多，Claude 也懂很多编程，包括许多默认观点。如果你发布的主要是知识的 Skill，试着聚焦于将 Claude 从其正常思维方式中拉出的信息。

[前端设计 Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) 是一个很好的例子——它是由 Anthropic 的一位工程师通过与客户迭代改进 Claude 的设计品味而构建的，避免了像 Inter 字体和紫色渐变这样的经典模式。

## 建立陷阱部分

任何 Skill 中信号最高的内容是陷阱部分。这些部分应该从 Claude 在使用你的 Skill 时遇到的常见失败点构建而成。理想情况下，你会随着时间的推移更新你的 Skill 来记录这些陷阱。

## 使用文件系统和渐进式披露

就像我们之前说的，Skill 是一个文件夹，而不仅仅是 markdown 文件。你应该将整个文件系统视为一种上下文工程和渐进式披露形式。告诉 Claude 你的 Skill 中有哪些文件，它会在适当的时候读取它们。

渐进式披露最简单的方式是指向其他供 Claude 使用的 markdown 文件。例如，你可能将详细的函数签名和使用示例拆分到 references/api.md 中。

另一个例子：如果你的最终输出是 markdown 文件，你可以在 assets/ 中包含一个模板文件供复制使用。

你可以有参考文件夹、脚本、示例等，这些都可以帮助 Claude 更有效地工作。

## 避免把 Claude 逼上轨道

Claude 通常会尽量遵守你的指令，而且因为 Skills 如此可重用，你需要小心在指令中过于具体。给 Claude 所需的信息，但给它适应情况的灵活性。例如：

## 考虑设置

有些 Skills 可能需要从用户那里设置上下文。例如，如果你制作一个将站会发布到 Slack 的 Skill，你可能想让 Claude 问要发布到哪个 Slack 频道。

一个好的模式是将这些设置信息存储在上述示例中的 skill 目录中的 config.json 文件中。如果没有设置配置，Agent 可以询问用户。

如果你希望 Agent 提出结构化的多项选择题，你可以指示 Claude 使用 AskUserQuestion 工具。

## 描述字段是给模型的

当 Claude Code 启动会话时，它会构建每个可用 Skill 及其描述的列表。这个列表是 Claude 扫描以决定"这个请求有对应的 Skill 吗？"的依据。这意味着描述字段不是摘要——而是关于何时触发这个 PR 的描述。

## 内存和存储数据

一些 Skills 可以通过在内部存储数据来包含某种形式的内存。你可以简单地将数据存储在只追加文本日志文件或 JSON 文件中，也可以像 SQLite 数据库一样复杂。

例如，一个 standup-post Skill 可能保留一个 standups.log，记录它写过的每次站会，这意味着下次你运行时，Claude 读取自己的历史，可以告诉自昨天以来发生了什么变化。

存储在 Skill 目录中的数据可能在升级 Skill 时被删除，所以你应该将它们存储在一个稳定的文件夹中，截至目前我们提供 `${CLAUDE_PLUGIN_DATA}` 作为每个插件的稳定文件夹来存储数据。

## 存储脚本和生成代码

你可以给 Claude 的最强大工具之一是代码。给 Claude 脚本和库，让 Claude 把回合花在学习组合上，决定下一步做什么，而不是重建样板文件。

例如，在你的数据科学 Skill 中，你可能有一个从事件源获取数据的函数库。为了让 Claude 做复杂分析，你可以给它一组辅助函数：

然后 Claude 可以动态生成脚本来组合这些功能，为"周二发生了什么？"这样的提示做更高级的分析。

## 按需钩子

Skills 可以包含仅在调用 Skill 时激活并持续整个会话的钩子。使用这些用于更武断的钩子，你不想一直运行，但有时非常有用。

例如：

- /careful — 通过 Bash 上的 PreToolUse 匹配器阻止 rm -rf、DROP TABLE、force-push、kubectl delete。你只想在知道要碰生产时才启用——一直启用会逼疯你
- /freeze — 阻止不在特定目录中的任何编辑/写入。调试时有
- 用： "我想添加日志但一直不小心'修复'无关的东西"

## 分发 Skills

Skills 最大的好处之一是你可以与团队的其他成员分享。

你可能与他人分享 Skills 有两种方式：

- 将你的 Skills 签入你的仓库（在 ./.claude/skills 下）
- 制作一个插件，让用户在 Claude Code 插件市场上传和安装插件（[在文档中阅读更多](https://code.claude.com/docs/en/plugin-marketplaces)）

对于在相对较少的仓库中工作的小团队，将 Skills 签入仓库效果很好。但每个签入的 Skills 也会给模型的上下文增加一点内容。随着规模扩大，内部插件市场允许你分发 Skills，让你的团队决定安装哪些。

## 管理市场

你如何决定哪些 Skills 进入市场？人们如何提交？

我们没有集中团队来决定；相反，我们尝试自然地找到最有用的 Skills。如果你有一个想让人们试用的 Skills，你可以上传到 GitHub 的沙盒文件夹，并在 Slack 或其他论坛指向它。

一旦一个 Skill 获得吸引力（由 Skill 所有者决定），他们可以提交 PR 将其移入市场。

一个警告，创建坏或有冗余的 Skills 很容易，所以在发布前确保你有某种策划方法很重要。

## 组合 Skills

你可能希望有相互依赖的 Skills。例如，你可能有一个上传文件的上传 Skill 和一个生成 CSV 并上传的 CSV 生成 Skill。这种依赖管理目前还没有内置到市场或 Skills 中，但你可以通过名称引用其他 Skills，如果已安装，模型会调用它们。

## 测量 Skills

为了了解一个 Skill 的表现如何，我们使用一个 PreToolUse 钩子，让我们能够记录公司内的 Skill 使用情况（[示例代码在这里](https://gist.github.com/ThariqS/24defad423d701746e23dc19aace4de5)）。这意味着我们可以找到与我们预期相比受欢迎或触发不足的 Skills。

## 结论

Skills 是 Agent 非常强大、灵活的工具，但还处于早期阶段，我们都在摸索如何最好地使用它们。

把这更多看作是我们看到有效的有用技巧的集合，而不是权威指南。理解 Skills 最好的方式是开始、实验，看什么对你有效。我们的大多数始于几行文字和一个陷阱，并随着 Claude 遇到新的边缘情况而不断改进。

我希望这有帮助，如果你有任何问题请告诉我。
