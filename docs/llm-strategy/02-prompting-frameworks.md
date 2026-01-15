# Prompting Frameworks and Strategies

## Overview
This document maps the most effective prompting frameworks to each persona based on their task complexity, reasoning needs, and interaction patterns. The frameworks are selected from current research and best practices in LLM prompt engineering.

---

## Framework Definitions

### 1. Chain-of-Thought (CoT)
**Description:** Encourages step-by-step reasoning before arriving at a conclusion.

**Best For:**
- Complex analytical tasks
- Multi-step problem solving
- Tasks requiring transparent reasoning
- Validation and verification

**Structure:**
```
Let's think through this step by step:
1. [First consideration]
2. [Second consideration]
3. [Conclusion]
```

---

### 2. ReAct (Reasoning + Acting)
**Description:** Combines reasoning traces with task-specific actions in an interleaved manner.

**Best For:**
- Tasks requiring external tool use
- Multi-step workflows with decisions
- Information retrieval and synthesis
- Dynamic problem-solving

**Structure:**
```
Thought: [Reasoning about what to do]
Action: [Specific action to take]
Observation: [Result of action]
[Repeat until complete]
Final Answer: [Conclusion]
```

---

### 3. Role Prompting
**Description:** Assigns a specific role or persona to the LLM to guide behavior and response style.

**Best For:**
- Domain-specific expertise
- Consistent tone and approach
- Professional communication
- Perspective-taking tasks

**Structure:**
```
You are a [role with specific expertise].
Your task is to [specific objective].
[Context and constraints]
```

---

### 4. Few-Shot Prompting
**Description:** Provides examples of input-output pairs to demonstrate the desired behavior.

**Best For:**
- Structured output formats
- Consistent formatting
- Specific writing styles
- Classification tasks

**Structure:**
```
Example 1: [Input] → [Output]
Example 2: [Input] → [Output]
Now: [Actual input] → ?
```

---

### 5. Prompt Chaining
**Description:** Breaks complex tasks into sequential prompts where output of one becomes input to the next.

**Best For:**
- Multi-stage workflows
- Complex report generation
- Sequential analysis tasks
- Quality refinement loops

**Structure:**
```
Prompt 1: Extract information → Output A
Prompt 2: Analyze Output A → Output B
Prompt 3: Synthesize Output B → Final Result
```

---

### 6. Tree of Thoughts (ToT)
**Description:** Explores multiple reasoning paths and evaluates them to find the best solution.

**Best For:**
- Strategic decision-making
- Complex planning tasks
- Multiple solution evaluation
- High-stakes decisions

**Structure:**
```
Generate 3 different approaches:
Approach 1: [...] (Evaluate pros/cons)
Approach 2: [...] (Evaluate pros/cons)
Approach 3: [...] (Evaluate pros/cons)
Best approach: [Selected with justification]
```

---

### 7. Retrieval-Augmented Generation (RAG)
**Description:** Combines retrieved context from knowledge base with generation.

**Best For:**
- Document-based Q&A
- Evidence-based responses
- Factual accuracy requirements
- Citation needs

**Structure:**
```
Context: [Retrieved relevant documents]
Question: [User query]
Based on the context provided, answer with citations.
```

---

### 8. Self-Consistency
**Description:** Generates multiple responses and selects the most consistent answer.

**Best For:**
- Critical accuracy requirements
- Reasoning tasks with single correct answer
- Reducing hallucinations
- High-confidence outputs

**Structure:**
```
Generate N solutions independently
Compare and identify consensus
Return most consistent answer
```

---

## Persona-Framework Mapping

### External Stakeholders

#### 1. Compliance Officer
**Selected Frameworks:** 
- **Primary:** RAG + Role Prompting
- **Secondary:** Chain-of-Thought

**Justification:**
- **Task Complexity:** High - requires domain expertise and regulatory knowledge
- **Reasoning Needs:** Evidence-based responses with citations to regulations
- **Interaction Pattern:** Question-answer with document references

Compliance officers need factually accurate, citation-backed responses. RAG ensures responses are grounded in actual regulatory documents and internal policies. Role prompting ensures responses maintain professional compliance language and perspective.

---

#### 2. Risk Analyst
**Selected Frameworks:**
- **Primary:** ReAct + Chain-of-Thought
- **Secondary:** Tree of Thoughts (for complex scenarios)

**Justification:**
- **Task Complexity:** Very High - requires multi-step analysis and data integration
- **Reasoning Needs:** Systematic evaluation with transparent reasoning
- **Interaction Pattern:** Interactive analysis with iterative refinement

Risk analysts need to explore data, identify patterns, and evaluate multiple scenarios. ReAct allows the AI to reason about which data to examine, retrieve it, and synthesize findings. CoT provides transparent reasoning for risk assessments.

---

#### 3. Industry Consultant
**Selected Frameworks:**
- **Primary:** Role Prompting + RAG
- **Secondary:** Few-Shot Prompting

**Justification:**
- **Task Complexity:** Medium-High - requires industry expertise and customization
- **Reasoning Needs:** Professional, client-ready outputs with evidence
- **Interaction Pattern:** Report generation and advisory responses

Consultants need outputs that reflect industry expertise and can be directly used with clients. Role prompting establishes consultant persona, RAG grounds advice in real frameworks, and few-shot ensures consistent output formatting.

---

#### 4. Auditor
**Selected Frameworks:**
- **Primary:** RAG + Self-Consistency
- **Secondary:** Chain-of-Thought

**Justification:**
- **Task Complexity:** Medium - requires accuracy and evidence
- **Reasoning Needs:** High accuracy, minimal hallucinations, evidence-based
- **Interaction Pattern:** Verification and documentation queries

Auditors require highly accurate, verifiable information. Self-consistency reduces hallucinations, RAG provides evidence, and CoT makes reasoning auditable.

---

#### 5. Executive Sponsor
**Selected Frameworks:**
- **Primary:** Prompt Chaining + Role Prompting
- **Secondary:** Few-Shot Prompting

**Justification:**
- **Task Complexity:** Low-Medium - needs synthesis over details
- **Reasoning Needs:** High-level insights, strategic recommendations
- **Interaction Pattern:** Dashboard summaries and executive briefs

Executives need concise, actionable insights. Prompt chaining allows for: (1) data extraction, (2) analysis, (3) executive summary. Role prompting ensures appropriate tone and level of detail.

---

### Internal Stakeholders

#### 6. Product Manager
**Selected Frameworks:**
- **Primary:** Tree of Thoughts + ReAct
- **Secondary:** Chain-of-Thought

**Justification:**
- **Task Complexity:** High - requires evaluation of tradeoffs
- **Reasoning Needs:** Strategic thinking, multiple option evaluation
- **Interaction Pattern:** Decision support and feature planning

PMs need to evaluate multiple approaches and their implications. ToT helps explore options systematically, ReAct allows testing hypotheses with data, and CoT provides clear reasoning documentation.

---

#### 7. ML/AI Engineer
**Selected Frameworks:**
- **Primary:** ReAct + Prompt Chaining
- **Secondary:** Self-Consistency

**Justification:**
- **Task Complexity:** Very High - technical optimization and debugging
- **Reasoning Needs:** Systematic troubleshooting, performance analysis
- **Interaction Pattern:** Iterative development and testing

Engineers need tools for debugging, optimization, and experimentation. ReAct supports systematic problem-solving, prompt chaining handles multi-step workflows, and self-consistency validates technical solutions.

---

#### 8. DevOps Engineer
**Selected Frameworks:**
- **Primary:** ReAct + Role Prompting
- **Secondary:** Chain-of-Thought

**Justification:**
- **Task Complexity:** High - infrastructure and operational decisions
- **Reasoning Needs:** Systematic troubleshooting, root cause analysis
- **Interaction Pattern:** Monitoring, alerting, and incident response

DevOps engineers need to diagnose issues and take action. ReAct supports investigation-action cycles, role prompting ensures infrastructure expertise perspective, and CoT provides clear incident documentation.

---

#### 9. QA Engineer
**Selected Frameworks:**
- **Primary:** Few-Shot Prompting + Self-Consistency
- **Secondary:** Chain-of-Thought

**Justification:**
- **Task Complexity:** Medium-High - requires consistency and accuracy
- **Reasoning Needs:** Validation, edge case identification, consistency checks
- **Interaction Pattern:** Test generation and validation workflows

QA needs consistent test patterns and high-accuracy validation. Few-shot provides test templates, self-consistency ensures reliable validation, and CoT documents test reasoning.

---

#### 10. Data Engineer
**Selected Frameworks:**
- **Primary:** ReAct + Prompt Chaining
- **Secondary:** Role Prompting

**Justification:**
- **Task Complexity:** High - data pipeline development and optimization
- **Reasoning Needs:** Systematic data processing, quality validation
- **Interaction Pattern:** ETL workflow design and troubleshooting

Data engineers need support for pipeline design and data quality. ReAct helps navigate data exploration and transformation decisions, prompt chaining handles multi-stage ETL workflows.

---

#### 11. Customer Success Manager
**Selected Frameworks:**
- **Primary:** Role Prompting + RAG
- **Secondary:** Few-Shot Prompting

**Justification:**
- **Task Complexity:** Medium - customer-facing support and training
- **Reasoning Needs:** Empathetic, clear explanations with examples
- **Interaction Pattern:** Customer support and training content creation

CSMs need customer-appropriate responses and training materials. Role prompting ensures helpful, empathetic tone, RAG grounds responses in documentation, few-shot ensures consistent formatting.

---

#### 12. Security Engineer
**Selected Frameworks:**
- **Primary:** Chain-of-Thought + ReAct
- **Secondary:** Self-Consistency

**Justification:**
- **Task Complexity:** High - security analysis and threat detection
- **Reasoning Needs:** Systematic threat analysis, evidence-based decisions
- **Interaction Pattern:** Security audits and incident investigation

Security engineers need transparent reasoning for security decisions. CoT provides auditable reasoning, ReAct supports investigation workflows, self-consistency validates security findings.

---

## Framework Selection Matrix

| Persona | Primary Framework | Secondary Framework | Complexity | Key Benefit |
|---------|------------------|---------------------|------------|-------------|
| Compliance Officer | RAG + Role | CoT | High | Evidence-based accuracy |
| Risk Analyst | ReAct + CoT | ToT | Very High | Systematic analysis |
| Industry Consultant | Role + RAG | Few-Shot | Med-High | Professional outputs |
| Auditor | RAG + Self-Consistency | CoT | Medium | High accuracy |
| Executive Sponsor | Prompt Chain + Role | Few-Shot | Low-Med | Strategic synthesis |
| Product Manager | ToT + ReAct | CoT | High | Option evaluation |
| ML/AI Engineer | ReAct + Chain | Self-Consistency | Very High | Technical debugging |
| DevOps Engineer | ReAct + Role | CoT | High | Incident response |
| QA Engineer | Few-Shot + Self-Consistency | CoT | Med-High | Test consistency |
| Data Engineer | ReAct + Chain | Role | High | Pipeline design |
| Customer Success | Role + RAG | Few-Shot | Medium | Customer support |
| Security Engineer | CoT + ReAct | Self-Consistency | High | Threat analysis |

---

## Implementation Guidelines

### 1. Framework Combination Rules
- Combine complementary frameworks (e.g., RAG + Role)
- Avoid combining conflicting frameworks (e.g., Few-Shot + ToT)
- Use prompt chaining to connect different frameworks in sequence

### 2. Adaptation Strategy
- Start with primary framework for each persona
- A/B test variants against baseline
- Gather user feedback on response quality
- Iterate based on success metrics

### 3. Version Control
- Tag each prompt template with framework(s) used
- Document changes to framework selection
- Track performance metrics by framework
- Enable rollback to previous framework versions

### 4. Quality Assurance
- Validate that framework matches task type
- Test edge cases for each framework
- Monitor for framework-specific failure modes
- Establish fallback strategies

---

## Next Steps
See `03-example-prompts.md` for concrete implementations of these frameworks for each persona.
