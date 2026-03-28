# 函数调用工具链：从 6.75% 到 100%

> **TL;DR**
> 
> 1. AutoBe — AI 后端自动生成 Agent
>     *   从自然语言对话生成生产级后端
>     *   4 种 AST 类型 + 4 层编译器验证 + 自愈循环
>     *   Schema 规格是新的提示词
> 2. Typia — 将 0% 变成 100% 的基础设施
>     *   单个类型自动化 schema、解析器、验证器和反馈生成器
>     *   宽松 JSON 解析 + 基于 schema 的类型强制 + 精确验证反馈
>     *   与 AutoBe 结合完成工具链工程
> 3. 函数调用的赞美
>     *   类型消除歧义；schema 通过缺失进行约束
>     *   模型中立、机械可验证、确定性收敛
>     *   适用于所有有验证器的工程领域 — 半导体、化工过程、控制系统等
> 4. Qwen — 为什么小模型是最好的 QA 工程师
>     *   小模型更擅长暴露系统漏洞
>     *   研发成本降低、供应商独立性、开放生态系统良性循环
> 5. 6.75% 不是失败 — 它是循环的第一个输入
>     *   `qwen3-coder-next` 首次尝试工具调用得分 6.75%
>     *   AutoBe 的自愈工具链将其变成 100% 编译成功
>     *   如果你能验证，你就能收敛

## 1. 前言

6.75%。

这是当 `qwen3-coder-next` 被要求为购物中心后端生成 API 数据类型时的首次尝试函数调用成功率。100 次尝试中有 93 次产生无效的结构化输出。

这并不令人惊讶。NESTFUL (EMNLP 2025) 测量 GPT-4o 在嵌套工具调用序列上的准确率为 28%。JSONSchemaBench (ICLR 2025) 在 10,000 个真实世界 schema 上测试约束解码框架，发现最难的在 3-41% 覆盖率。BoundaryML 进一步论证，结构化输出会主动降低模型推理能力 — 强制 JSON 格式使模型"更笨"。共识很明确：函数调用对扁平、简单的 schema 有效。对于任何有递归嵌套或深层结构复杂性的东西，别费劲。

但如果你想让 AI 输出确定性 — 解析它、验证它、循环纠正直到收敛 — 结构化输出是唯一选择。自由形式文本无法机械验证。自然语言无法编译。没有结构，就没有反馈循环，就没有保证。所以我们没有放弃函数调用的奢侈。我们必须让它在行业已经放弃的复杂、递归 schema 上工作。

AutoBe 是结果。它是一个开源 AI Agent，接受单个自然语言对话并生成完整后端 — 需求分析、数据库 schema、API 规范、E2E 测试和实现代码。接入那个 6.75% 的模型会怎样？最终编译成功率：**99.8%+**。所有五个 Qwen 模型。

答案不是更好的模型或更聪明的提示。这是一个**工具链** — 约束输出的类型 schema、验证结果的编译器、以及精确指出哪里和为什么出错以便 LLM 可以自我纠正的结构化反馈。包装概率模型的确定性循环。是模型之外的工程，而不是模型之内的工程，改变了结果。

这次演讲剖析了那个工程。

**第 2 章** 审查 AutoBe 的架构：一个 5 阶段流水线，运行通过 4 种 AST 类型和 4 层编译器，有系统纠正 LLM 错误的自愈循环。

**第 3 章** 深入 Typia，那是结构的核心。TypeScript 编译器从源代码分析单个类型，并自动生成 schema、解析器、验证器和反馈生成器 — 完全自动。将 Qwen 3.5 的 0% 变成 100% 的具体机制就在这里。

**第 4 章** 退后一步问一个更大的问题。这个模式在後端之外有效吗？半导体、化工过程、建筑、控制系统 — 任何存在确定性验证器的工程领域。

**第 5 章** 回答为什么这个故事属于 Qwen Meetup。小模型不是弱点。它们是工具链系统最好的 QA 工程师。

## 2. AutoBe — AI 后端自动生成 Agent

### 2.1. AutoBe 做什么

AutoBe 是一个开源 AI Agent，从自然语言生成生产级后端。由 Wrtn Technologies 开发。

"为我构建一个包含产品、购物车、订单和支付的后端。"从这一句话，AutoBe 生成：

- 需求分析 (SRS)
- 数据库 schema (ERD)
- API 规范 (OpenAPI v3.2)
- E2E 测试代码
- 完整实现代码
- 类型安全 SDK

### 2.2. LLM 不写代码

大多数 AI 编码 Agent 告诉 LLM"写这个代码"并直接将返回的文本保存为源文件。AutoBe 不同。

AutoBe 使用**函数调用**。不是生成自由形式文本，LLM 填写预定义结构 — JSON Schema。它是在填表格，而不是在空白页上写东西。一旦 LLM 填好表格，编译器验证并将其转换为实际代码。**LLM 填写结构；编译器写代码。**

这种方法适用于整个 5 阶段瀑布流水线。

| 阶段 | LLM 填写的结构 | 编译器验证 |
|------|---------------|-----------|
| 需求 | AutoBeAnalyze — 结构化 SRS | 结构检查 |
| 数据库 | AutoBeDatabase — DB schema AST | AutoBeDatabase 编译器 |
| API 设计 | AutoBeOpenApi — OpenAPI v3.2 规范 | AutoBeOpenApi 编译器 |
| 测试 | AutoBeTest — 30+ 表达式类型 | AutoBeTest 编译器 |
| 实现 | 模块化代码 (Collector/Transformer/Operation) | TypeScript 编译器 |

每个 AST 严格限制 LLM 可以生成的内容 — AutoBeDatabase 的字段类型只允许 7 个选项（`"boolean" | "int" | "double" | "string" | "uri" | "uuid" | "datetime"`），使得 `"varchar"` 物理上不可能。**Schema 规格是新的提示词** — 明确、模型独立、机械可验证。

但 LLM 填写的结构远非简单。定义 DTO 类型的 `IJsonSchema` 是 10 个变体的递归联合：

```tsx
export type IJsonSchema =
  | IJsonSchema.IConstant
  | IJsonSchema.IBoolean
  | IJsonSchema.IInteger
  | IJsonSchema.INumber
  | IJsonSchema.IString
  | IJsonSchema.IArray      // items: IJsonSchema ← recursive
  | IJsonSchema.IObject     // properties: Record<string, IJsonSchema> ← recursive
  | IJsonSchema.IReference
  | IJsonSchema.IOneOf      // oneOf: IJsonSchema[] ← recursive
  | IJsonSchema.INull;
```

10 个变体，无限递归嵌套。首次尝试成功率：**6.75%**。

测试阶段进一步提升复杂性 — `IExpression` 用 30+ 递归变体捕获 E2E 测试逻辑：

```typescript
export type IExpression =
  | IBooleanLiteral   | INumericLiteral    | IStringLiteral     // literals
  | IArrayLiteralExpression  | IObjectLiteralExpression          // compound literals
  | INullLiteral      | IUndefinedKeyword                       // null/undefined
  | IIdentifier       | IPropertyAccessExpression               // accessors
  | IElementAccessExpression | ITypeOfExpression                 // access/operations
  | IPrefixUnaryExpression   | IPostfixUnaryExpression           // unary operations
  | IBinaryExpression                                            // binary operations
  | IArrowFunction    | ICallExpression    | INewExpression      // functions
  | IArrayFilterExpression   | IArrayForEachExpression           // array operations
  | IArrayMapExpression      | IArrayRepeatExpression            // array operations
  | IPickRandom       | ISampleRandom      | IBooleanRandom     // random generation
  | IIntegerRandom    | INumberRandom      | IStringRandom      // random generation
  | IPatternRandom    | IFormatRandom      | IKeywordRandom     // random generation
  | IEqualPredicate   | INotEqualPredicate                      // assertions
  | IConditionalPredicate    | IErrorPredicate;                  // assertions
```

单次函数调用中的编程语言复杂性。

### 2.3. 自愈循环

当编译失败时，AutoBe 不会停止。它运行一个**自愈循环**：

四个编译器 — Database、OpenAPI、Test、TypeScript — 每个在不同层面验证并返回结构化诊断：每个错误的精确位置、目标和原因。Correct Agent 接收原始输出 + 诊断并进行针对性修复。成功的部分被保留；只有失败被纠正。

在此之上，Typia 的验证反馈（第 3 章）在函数调用层面添加了精确纠正。编译器层面和函数调用层面验证的组合是 99.8%+ 编译率的推动力。

### 2.4. 五个 Qwen 模型，全部 99.8%+

AutoBe 目前针对五个 Qwen 模型进行测试。全部实现成功编译。

| 模型 | 参数 | 编译率 |
|------|------|--------|
| `qwen/qwen3.5-397b-a17b` | 17B / 397B (最大 MoE) | 100% |
| `qwen/qwen3.5-122b-a10b` | 10B / 122B (中等 MoE) | 100% |
| `qwen/qwen3.5-27b` | 27B (中等 Dense) | 100% |
| `qwen/qwen3.5-35b-a3b` | 3B / 35B (小型 MoE) | 99.8% |
| `qwen/qwen3-coder-next` | 3B / 80B (编程专用) | 99.8% |

从 397B 到 35B。相同的 schema，相同的流水线，相同的结果。

## 3. Typia — 将 0% 变成 100% 的基础设施

第 2 章描述了 AutoBe 构建了什么 — 但没有说明它如何在 6.75% 下生存。Schema 生成、损坏 JSON 恢复、类型强制、精确错误反馈 — 每个让函数调用在复杂类型上工作的基础设施，尽管行业共识说它不行。谁来处理这一切？

Typia。在递归联合类型上让函数调用可靠需要深入到运行时库无法触及的深度。运行时反射看不到 TypeScript 类型 — 它们在编译时被删除。Zod 风格的 schema 构建器在递归联合上卡住。唯一路径是在**编译器层面**本身操作 — 直接从源代码分析类型，并从那个单一真相来源生成每个基础设施。

这就是 Typia。一个**编译器库**，直接利用 TypeScript 编译器的类型分析器在编译时自动生成 JSON Schema、验证器、解析器和反馈生成器。定义一个类型，编译器处理剩下的。这是选择在可用的最深层解决问题的结果，因为每个更浅的方法都碰壁了。

让我们详细检查它如何将 `qwen3-coder-next` 的 6.75% 成功率和 `qwen3.5` 的 0% 成功率变成 100%。

### 3.1. 从 TypeScript 类型到函数调用 Schema

函数调用需要 JSON Schema 告诉 LLM"给我这个结构的数据。"通常，开发者定义类型，单独写 schema，并永远保持两者同步。

Typia 自动化这个过程。定义一个 TypeScript 类型，Typia 在**编译时**自动生成验证代码和 JSON Schema — 不是通过运行时反射，而是直接利用 TypeScript 编译器的类型分析器。

先看原理。当你调用 `typia.is<T>()` 时，类型信息在编译时被分析并转换为优化的验证代码：

```tsx
import typia, { tags } from "typia";
 
interface IMember {
  id: string & tags.Format<"uuid">;
  email: string & tags.Format<"email">;
  age: number &
    tags.Type<"uint32"> &
    tags.ExclusiveMinimum<19> &
    tags.Maximum<100>;
}
 
const check: boolean = typia.is<IMember>(input);
```

一行代码 — `typia.is<IMember>(input)` — 在编译时转换为包含 UUID 正则、email 正则、整数检查和范围检查的优化代码。它通过编译器插件克服了 TypeScript 在运行时擦除类型信息的限制。

这个原理直接适用于函数调用。`typia.llm.parameters<T>()` 通过相同的类型分析生成 JSON Schema：

```tsx
import typia, { tags } from "typia";
 
interface IMember {
  /**
   * Member's age.
   *
   * Only adults aged 19 or older can register.
   * This is the platform's legal age restriction.
   */
  age: number & tags.Type<"uint32"> & tags.ExclusiveMinimum<18>;
  email: string & tags.Format<"email">;
  name: string & tags.MinLength<1> & tags.MaxLength<100>;
}
 
const schema = typia.llm.parameters<IMember>();
```

**JSDoc 注释成为 `description` 字段。**LLM 读取这些描述来决定生成什么值。**类型约束成为验证规则。** `ExclusiveMinimum<18>` 成为"> 18"规则，`Format<"email">` 成为 email 格式检查。单个类型定义同时生成 LLM 指导和验证规则。

在类级别，`typia.llm.application<T>()` 可以将整个 API schema 化：

```jsx
import { LlmJson } from "@typia/utils";
import typia from "typia";
 
class ShoppingOrderController {
  /** Creates an order */
  create(input: IShoppingOrderCreate): void;
}
 
const app = typia.llm.application<ShoppingOrderController>();
const func = app.functions[0];
 
// All public methods have built-in parse() and validate()
const data = func.parse(llmOutput);        // broken JSON recovery + type coercion
const result = func.validate(data);        // schema violation detection
if (result.success === false) {
  const feedback = LlmJson.stringify(result); // LLM-readable feedback generation
}
```

**类型就是 schema。** LLM 看到的约束和验证器应用的约束始终相同 — 因为它们来自同一来源。

这是关键点。由 Typia 编译器从源代码类型生成的 schema 为每个后续的运行时函数提供动力。`parse()` 在恢复损坏的 JSON 并强制类型时引用的 schema，`validate()` 在诊断错误时用作比较目标的 schema — 它们都是同一个 schema，在编译时从类型自动生成。因为它是编译器输出，不是手动写的，类型和 schema 永远不能 divergence。

### 3.2. 6.75% 的原因：结构复杂性

第 2 章的 `IJsonSchema` 的 10 个变体和 `IExpression` 的 30+ 个变体。为什么首次尝试成功率如此之低？

递归联合类型导致**组合爆炸**。10 个变体嵌套 3 层创建 1,000 条可能路径。有 30 个变体，那是 27,000 条。LLM 一次选择正确路径的概率在结构上很低。

此外，联合类型中的微妙错误很常见：
- 选择了正确的变体但子字段类型错误
- 在递归深度混淆了变体
- 缺少必填字段
- 将对象序列化为字符串（双字符串化）

这些错误是"结构正确但语义错误"，使得简单的 JSON Schema 验证难以提供准确的反馈。

6.75% 是这个结构复杂性的自然结果。问题不是第一次尝试 — 是**失败后发生什么**。

### 3.3. 宽松 JSON 解析：恢复损坏的 JSON

LLM 是语言模型，不是 JSON 生成器。它们用 Markdown 代码块包装输出，前面加上"我很乐意帮助！"之类的话，括号不闭合，忘记给键加引号，写 `tru` 而不是 `true`。Qwen 3.5 系列更进一步：在每个 `anyOf`（联合类型）字段上，它 **100% 一致地**双字符串化值。不是偶尔 — 每个联合字段，每次尝试，没有例外。

`JSON.parse()` 拒绝所有这些。以下是生产中的一个真实例子 — 单次响应中的七个问题：

```typescript
import { dedent } from "@typia/utils";
import typia, { ILlmApplication, ILlmFunction, tags } from "typia";
 
const app: ILlmApplication = typia.llm.application<OrderService>();
const func: ILlmFunction = app.functions[0];
 
// LLM sometimes returns malformed JSON with wrong types
const llmOutput = dedent`
  > LLM sometimes returns some prefix text with markdown JSON code block.
 
  I'd be happy to help you with your order! 😊
  
  \`\`\`json
  {
    "order": {
      "payment": "{\\"type\\":\\"card\\",\\"cardNumber\\":\\"1234-5678", // unclosed string & bracket
      "product": {
        name: "Laptop", // unquoted key
        price: "1299.99", // wrong type (string instead of number)
        quantity: 2, // trailing comma
      },
      "customer": {
        // incomplete keyword + unclosed brackets
        "name": "John Doe",
        "email": "john@example.com",
        vip: tru
  \`\`\` `;
 
const result = func.parse(llmOutput);
if (result.success) console.log(result);
```

一次 `func.parse()` 调用修复了所有七个问题：

- **Markdown 块和前缀闲聊** → 剥离
- **未闭合的字符串和括号** (`"1234-5678`) → 自动闭合
- **未加引号的键** (`name:`) → 接受
- **尾随逗号** (`quantity: 2,`) → 忽略
- **不完整的关键字** (`tru`) → 补全为 `true`
- **错误类型** (`"1299.99"`) → 强制转换为 `1299.99` (schema 说是 `number`)
- **双字符串化** (`"{\"type\":\"card\"...`) → 递归解析为对象 (schema 说是 `IPayment`)

最后一个是杀手锏。Qwen 3.5 系列在每个 `anyOf` 字段上双字符串化，100% 的时间 — **没有这个，联合类型上 0% 成功率**。不只 Qwen 这样做；Claude 在 `oneOf` 上也做同样的事。`parse()` 消除所有这些。零模型更改，零提示调整。

### 3.4. 验证反馈：精确错误反馈

即使经过解析和强制，值本身也可能错误。负价格、非邮箱字符串、应该是整数的地方出现小数。

Typia 的 `ILlmFunction.validate()` 检测 schema 违规并精确告诉你**哪里和为什么**出错：

```typescript
import { LlmJson } from "@typia/utils";
import typia, { ILlmApplication, ILlmFunction, IValidation, tags } from "typia";
 
const app: ILlmApplication = typia.llm.application<OrderService>();
const func: ILlmFunction = app.functions[0];
 
// LLM generated invalid data
const input = {
  order: {
    payment: { type: "card", cardNumber: 12345678 }, // should be string
    product: {
      name: "Laptop",
      price: -100, // violates Minimum<0>
      quantity: 2.5, // should be uint32
    },
    customer: {
      name: "John Doe",
      email: "invalid-email", // violates Format<"email">
      vip: "yes", // should be boolean
    },
  },
};
 
// Validate and format errors for LLM feedback
const result: IValidation = func.validate(input);
if (result.success === false) {
  const feedback: string = LlmJson.stringify(result);
  console.log(feedback);
}
```

"order 里面的 product 里面的 price 应该 ≥ 0，但你给了 -100。"

`LlmJson.stringify()` 将这些错误渲染为 LLM 原始 JSON 上的 `// ❌` 内联注释：

```
{
  "order": {
    "payment": {
      "type": "card",
      "cardNumber": 12345678 // ❌ [{"path":"$input.order.payment.cardNumber","expected":"string"}]
    },
    "product": {
      "name": "Laptop",
      "price": -100, // ❌ [{"path":"$input.order.product.price","expected":"number & Minimum<0>"}]
      "quantity": 2.5 // ❌ [{"path":"$input.order.product.quantity","expected":"number & Type<\"uint32\">"}]
    },
    "customer": {
      "name": "John Doe",
      "email": "invalid-email", // ❌ [{"path":"$input.order.customer.email","expected":"string & Format<\"email\">"}]
      "vip": "yes" // ❌ [{"path":"$input.order.customer.vip","expected":"boolean"}]
    }
  }
}
```

`cardNumber` 应该是字符串但给了数字。`price` 应该 ≥ 0。`quantity` 应该是正整数。`email` 不是有效邮箱。`vip` 应该是布尔值。5 个错误，每个都有精确路径和预期类型。

LLM 确切地看到自己的 JSON 哪里错了。不需要重写一切，它只需要修复标记的 5 个字段。精确、结构化、立即可操作的反馈。

### 3.5. 完整反馈循环

将一切结合成一个循环：

```jsx
async function callWithFeedback(
  llm: LLM,
  func: ILlmFunction,
  prompt: string,
  maxRetries: number = 10,
): Promise<unknown> {
  let feedback: string | null = null;
 
  for (let i = 0; i < maxRetries; i++) {
    // 1. 从 LLM 请求函数调用（包括之前的反馈）
    const rawOutput = await llm.call(prompt, feedback);
 
    // 2. 宽松 JSON 解析 + 类型强制
    const parsed = func.parse(rawOutput);
    if (!parsed.success) {
      feedback = `JSON parsing failed: ${JSON.stringify(parsed.errors)}`;
      continue;
    }
 
    // 3. Schema 验证
    const validated = func.validate(parsed.data);
    if (!validated.success) {
      // 4. 生成结构化反馈（// ❌ 内联注释）
      feedback = LlmJson.stringify(validated);
      continue;
    }
 
    // 5. 成功
    return validated.data;
  }
  throw new Error("Maximum retry count exceeded");
}
```

`parse()` 恢复损坏的 JSON 并进行初始类型强制。`validate()` 捕获 schema 违规。`LlmJson.stringify()` 以 LLM 可以读取的格式渲染错误。LLM 自我纠正并重试。

这是将 6.75% 变成 100% 的完整循环。

> * 只有 Typia 通过编译器技能集成 parse、coerce 和 validate。
> * 只有 Typia 正确处理联合类型。

### 3.6. 工具链 = AutoBe + Typia

**Typia**（函数调用层面）：

- `typia.llm.application<T>()` — 类型 → schema
- `ILlmFunction.parse()` — 损坏 JSON 恢复 + 类型强制 + 双字符串化展开
- `ILlmFunction.validate()` — schema 违规检测
- `LlmJson.stringify()` — `// ❌` 内联反馈

**AutoBe**（系统层面）：

- 4 种 AST 类型 + 4 层编译器验证
- 自愈循环（诊断 → 纠正 → 重新验证）
- 40+ Agent，批处理，提示缓存

**类型就是 schema、验证器和提示。工具链是围绕它的一切。**

## 4. 函数调用的赞美

"结构化输出创造虚假信心。"这个批评是准确的 — 当你**没有工具链**使用结构化输出时。行业观察到的每个失败都是当你把函数调用当作一个要打开的功能，而不是**围绕它构建的基础设施**时发生的事情。

### 4.1. 自然语言 vs 类型

自然语言进化是为了歧义。隐喻、细微差别、礼貌、幽默 — 都在歧义之上运作。"让它好看点"在人类之间有效。

编程语言被设计来消除歧义。"让它好看点"不能编译。

**当人们用自然语言交流时，误解会产生。当他们用类型交流时，没有。**

通过提示表达约束：

> "age 字段应该是大于 18 的正整数。不要为数字字段使用字符串类型。所有必填字段必须存在……"

"> 18"是 >18 还是 ≥18？你无法知道 LLM 是否遵循了这个规则而不手动检查输出。随着 schema 增长，这些规则无限增加。

通过类型表达约束：

```typescript
interface IMember {
  /** Only adults 19+ can register */
  age: number & Type<"uint32"> & ExclusiveMinimum<18>;
}
```

`ExclusiveMinimum<18>` 是 >18。它是整数。它是必填的。没有歧义，机械可验证。

在需要精确的领域，类型约束提供了自然语言指令无法确定的确定性。

### 4.2. 粉红大象问题

如果你构建过基于提示的 AI Agent，你写过禁止规则：

- "不要创建工具函数"
- "不要使用 `any` 类型"
- "不要创建循环依赖"

"不要想粉红大象。"首先想到的就是粉红大象。当你告诉 LLM"不要做 X"时，X 被置于注意力的中心。为了避免禁止的模式，模型必须首先回忆那个模式，这 paradoxically 增加了它生成的概率。这是 token 预测的本质。

即使知道这个，你也 无法在提示中避免禁止规则。"不要做 X"是自然语言表达约束的唯一方式。

**有了 schema，这个问题消失了。**

不需要说"不要使用 `any` 类型" — 如果 schema 中不存在 `any`，LLM 物理上无法生成它。不需要说"不要创建工具函数" — 如果没有工具函数的槽位，那就结束了。当字段类型限制为 `"boolean" | "int" | "double" | "string" | "uri" | "uuid" | "datetime"` — 7 个选择 — LLM 写 `"varchar"` 没有路径。

不是禁止，而是**缺失**。提示禁止你不想要的。Schema 只允许你想要的。

这是函数调用最深的优势：不是对抗模型的倾向，而是让不想要的输出在结构上不可能。

### 4.3. 模型中立

提示工程本质上是模型依赖的。为 GPT 优化的提示在 Claude 上表现不同，在 Qwen 上又不同。每次用新模型重写提示是常态。

基于函数调用的方法是模型中立的。JSON Schema 无论哪个模型读取都意味相同。验证反馈循环吸收模型之间的性能差异。强模型在 1-2 次尝试中收敛，弱模型需要 3-4 次，但都达到 100%。

AutoBe 运行 Qwen、GLM、DeepSeek 和 OpenAI 模型，用**相同的 schema、相同的流水线**并在所有模型上实现 100% 编译率是这个中立的证明。从未进行过任何模型特定的提示调整。

这改变了模型选择的性质。从"这个模型能做这个任务吗？" — 一个能力问题 — 到"哪个模型最具成本效益？" — 一个**成本优化问题**：`平均重试次数 × 每次尝试的 tokens × 每个 token 的成本`。

### 4.4. 核心：可验证性

一条单一的线贯穿一切。

函数调用的根本优势是它**将 LLM 输出带入软件工程领域**。

自由形式文本输出使正确性成为一个 AI 问题。解析是模糊的。验证是模糊的。纠正是模糊的。

结构化输出使正确性成为一个**工程问题**：

1. **验证是确定性的** — JSON Schema 验证是明确的通过/失败
2. **反馈是精确的** — "字段 X 应该是类型 Y 但你给了 Z"
3. **纠正收敛** — 精确反馈导致模型只修复那部分

模型仍然是概率的。它仍然犯错。但因为**包装模型的结构是确定性的**，过程收敛到 100%。

> **类型 schema + 确定性验证器 + 结构化反馈 = 工具链**

提示工程试图让概率部分可靠。函数调用让确定性部分完美。在需要精确的领域，后者胜出：6.75% → 100%。

### 4.5. 这个模式是通用的

这个模式适用于每个输出机械可验证的领域 — 不仅仅是软件。

| 领域 | 快速 (ms) | 中等 (sec) | 深度 (min+) |
|------|-----------|------------|-------------|
| 软件 | 类型检查 | 编译 | 测试执行 |
| 半导体 | DRC | LVS | SPICE 仿真 |
| 化工过程 | 质量平衡 | 能量平衡 | 过程仿真 |
| 建筑 (BIM) | 尺寸/净空 | 建筑规范、碰撞检测 | 照明/HVAC 仿真 |
| 控制系统 | 传递函数有效性 | 稳定性/裕度分析 | 时域仿真 |

先运行最便宜的验证器，修复错误，移到下一层。每个领域都与 AutoBe 共享相同的结构：递归联合类型、层次分解、数十年优化的确定性验证器。

> **注意**：这些领域示例是 AI 推荐的。我不是领域专家 — 请将具体内容视为参考资料。

```typescript
// DRC (快速) → LVS (中等) → SPICE 仿真 (深度)
 
type IBlock =
  | ILogicBlock        // children: IBlock[]  ← recursive
  | IMemoryBlock       // children: IBlock[]
  | IAnalogBlock       // children: IBlock[]
  | IIOBlock | IClockTree | IInterconnect | IPowerGrid
  | ICPU | IGPU | INPU | IDSP
  | ISecurityBlock | IDebugBlock | IPhyBlock;
 
type IStandardCell =   // hundreds per PDK
  | IAND | IOR | INAND | INOR | IXOR | IXNOR | INOT | IBUF | IMUX | IDEMUX
  | IAOI | IOAI | IHA | IFA | IDFF | IJKFF | ILatch | IScanFF | IRetentionFF
  | IICG | IClkBuf | IClkInv | ITieCell | ITapCell | IFiller | IDecap | IEndcap
  | ILevelShifter | IIsolationCell | IPowerGate | IAntennaCell | ISpareCell | ...;
```

不是巧合 — 层次分解是工程师管理复杂性的方式，它总是产生递归联合类型。与 AutoBe 的 `IJsonSchema` 和 `IExpression` 相同的结构。

这并非在所有地方都有效。创意写作、情商、战略决策 — 没有"好小说"的验证器。没有验证器，就没有反馈循环。这是一个适用于准确性不可谈判且**机械可验证**领域的解决方案。

## 5. Qwen — 小模型和 QA 工程

### 5.1. 为什么是 Qwen？

AutoBe 整个流水线都是函数调用。唯一标准是模型填写复杂 JSON Schema 的准确程度。在**小/中型规模**，Qwen 是处理这种复杂性的唯一开源权重模型 — 即使是 3B 活动参数的 MoE 模型也能处理包含 10+ 递归联合变体的 schema。

### 5.2. 小模型作为研发基础设施

对于客户，模型成本不是问题 — 即使最贵的模型也比雇开发者便宜。对于我们**开发** AutoBe，不同。每次迭代数千次生成-编译-反馈循环。商业模型在这个规模会是财务破产。本地 Qwen 模型使从 6.75% 到 100% 的旅程成为可能。

### 5.3. 小模型是最好的 QA 工程师

大模型"正确猜测" schema 的模糊部分并通过 — 我们的错误隐藏着。小模型暴露一切：

| 模型 | 活动/总参数 | 成功率 | 它发现了什么 |
|------|-------------|--------|--------------|
| `qwen3-30b-a3b` | 3B / 30B | ~10% | 基本 schema 歧义、缺少必填字段 |
| `qwen3-next-80b-a3b` | 3B / 80B | ~20% | 复杂嵌套关系中的微妙类型不匹配 |

10% 成功率是最有价值的结果。每个失败都指向一个系统漏洞，每个修复都加强了**所有模型**的流水线。大模型**较少**犯错，不是**不**犯错。在生产中，"罕见"意味着宕机。

**当即使 3B 活动模型也无法打破你的系统时，没有模型可以。**

## 6. 结论

我们从 6.75% 开始。行业说复杂函数调用不起作用，我们的结果同意。

但没有替代品 — 确定性 AI 输出需要结构化输出 — 所以我们一次一个失败模式构建工具链。因为 JSON 坏了所以宽松解析。因为类型错误所以类型强制。因为值错误所以验证反馈。因为系统需要一致性所以编译器流水线。

AutoBe 在所有五个 Qwen 模型上实现了 99.8%+ 编译率。不是通过更好的提示，而是通过每个出错方式的累积工程。

三件事：约束输出的类型 schema、验证结果的编译器、以及纠正错误的结构化反馈。这三个形成包装概率模型的确定性循环。

这个模式不限于代码生成。相同的结构可以构建在任何存在确定性验证器的工程领域 — 半导体、化工过程、控制系统。

用类型交流就没有误解。用 schema 约束就没有粉红大象。有确定性循环，即使 6.75% 也会变成 100%。

**6.75% 不是失败 — 它是循环的第一个输入。如果你能验证，你就能收敛。**

---

**关于 AutoBe**：AutoBe 是一个开源 AI Agent，由 Wrtn Technologies 开发。它从自然语言生成生产级后端应用。

**关于 Typia**：Typia 是一个编译器库，从 TypeScript 类型自动生成运行时验证器、JSON Schema 和函数调用 Schema。
