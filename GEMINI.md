# Standard Operating Procedure: Professional Exam Notes Generation

## 🎯 Core Directive
Whenever the user provides a PDF, topic name, or asks to create/generate notes:
1. **Zero Effort for User**: Never ask the user to type notes manually. Extract and synthesize the core concepts, data, diagrams/tables, and high-yield exam facts directly from the input.
2. **Three-Language Standard**: Always create notes in all 3 language editions:
   - 🇬🇧 **English (`en`)**: Academic, crisp, standard exam terminology.
   - 🇮🇳 **हिंदी (`hi`)**: Authentic Devanagari Hindi terminology with English technical terms in brackets.
   - 🌐 **Bilingual Dual-Coding (`bilingual`)**: Side-by-side English concepts with Hindi explanations for 40% higher cognitive recall.

---

## 🧭 Dynamic, Content-Driven Architecture (Topic-Specific Sections)

> 💡 **CRITICAL RULE**: The sections MUST NOT be rigidly copy-pasted across different subjects. Every PDF is unique! The section headings and logical breakdown must dynamically match the subject, structure, and concepts of the provided PDF.

### Adapting Sections by Subject / Domain:

- **Polity & Governance**:
  - Background & Philosophy $\rightarrow$ Constitutional Evolution $\rightarrow$ Composition & Allocations $\rightarrow$ Institutions & Powers $\rightarrow$ Landmark Articles & Amendments $\rightarrow$ Working Committees $\rightarrow$ Landmark Supreme Court Judgments $\rightarrow$ Exam Traps $\rightarrow$ Rapid Revision Sheet.
- **History (Ancient / Medieval / Modern / World)**:
  - Historical Context $\rightarrow$ Primary Causes & Grievances $\rightarrow$ Major Leaders & Personalities $\rightarrow$ Chronological Outbreak & Geographic Spread $\rightarrow$ Treaties, Acts & British Response $\rightarrow$ Causes of Outcome / Legacy $\rightarrow$ Quotes & Contemporary Literature $\rightarrow$ High-Yield One-Liners $\rightarrow$ Chronology Sequence & Revision Sheet.
- **Science (Biology, Physics, Chemistry)**:
  - Anatomy / Core Structure $\rightarrow$ Physiological Mechanism / Working Process $\rightarrow$ Key Equations / Chemical Reactions / Enzymes $\rightarrow$ Regulation & Factors Affecting $\rightarrow$ Clinical Disorders / Pathology / Applications $\rightarrow$ Comparison Tables $\rightarrow$ Diagnostic Values / Constants $\rightarrow$ Rapid Recall Formula & Fact Sheet.
- **Economy & Banking**:
  - Conceptual Framework $\rightarrow$ Monetary / Fiscal Policy Tools $\rightarrow$ Quantitative vs Qualitative Measures $\rightarrow$ Impact on Inflation, Growth & Exchange Rates $\rightarrow$ Transmission Mechanisms & Flowcharts $\rightarrow$ Comparison Matrices $\rightarrow$ Key Indices, Formulas & Ratios $\rightarrow$ High-Yield Facts & Quick Revision Sheet.
- **Geography & Environment**:
  - Origin & Geological Formation $\rightarrow$ Physical Features & Relief $\rightarrow$ Drainage Systems / River Basins $\rightarrow$ Climate, Monsoon & Soil Types $\rightarrow$ Biomes, Biodiversity & Protected Areas (National Parks) $\rightarrow$ Resource Distribution & Agriculture $\rightarrow$ Spatial Mnemonics $\rightarrow$ Quick Recall Map/Table Revision.
- **Quantitative Aptitude & Reasoning**:
  - Underlying Theorems $\rightarrow$ Master Formula Cheatsheet $\rightarrow$ Shortcut Derivations $\rightarrow$ Core Problem Archetypes (Case 1, 2, 3) $\rightarrow$ High-Risk Calculation Traps $\rightarrow$ Solved Model Benchmarks $\rightarrow$ Rapid Revision Formula Matrix.

---

## 🏆 Universal Quality Pillars (Mandatory in EVERY Note)

Regardless of the topic or subject, every professional note MUST include these pedagogical pillars:

1. **🎯 Hero Intro Callout**:
   - `> 🎯 **Exam-Ready Master Note:** [Target exams: UPSC CSE, State PCS, SSC CGL, etc. and overview of the topic]`
2. **📊 Rich Markdown Comparison Tables**:
   - Every note must have at least 2–4 structured comparison or classification tables with clean alignments (`:---`, `:---:`, `---:`).
3. **🧠 Smart Mnemonics**:
   - `> 🧠 **Mnemonic — [Code]:**` to help aspirants memorize complex lists, sequences, or categories effortlessly.
4. **⚠️ High-Yield Exam Traps**:
   - `> ⚠️ **Exam Trap:** [Specific nuance where examiners create confusing multiple-choice options or trick questions]`.
5. **💡 Core Concepts & Insights**:
   - `> 💡 **Core Insight:**` or `> 🔑 **Master Concept:**` highlighting deep fundamentals.
6. **💎 High-Yield Fact Sheet / One-Liners**:
   - Dedicated table or list of unique records, constants, firsts, historical trivia, or high-probability exam facts.
7. **🧾 Last-Minute Rapid Revision Section (Final Section)**:
   - `> 🚀 **Sequence to Remember:** [Chain timeline or process flow with arrows $\rightarrow$]`.
   - High-Frequency Exam Numbers / Key Values.
   - `> ✅ **Key Distinctions to Never Confuse:** [Side-by-side disambiguation of confusing terms/dates]`.

---

## 🎨 Visual Callout Standards (Markdown Syntax)

- `> 🎯 **Exam-Ready Master Note:**` $\rightarrow$ Hero intro badge
- `> 🔑 **Master Blueprint:**` $\rightarrow$ Core structural foundation
- `> 🧠 **Mnemonic — [Code]:**` $\rightarrow$ Memory retention hooks
- `> ⚠️ **Exam Trap:**` $\rightarrow$ Negative marking warning & common confusion alerts
- `> 📌 **Why [X]?**` $\rightarrow$ Deep conceptual reasoning
- `> 🚀 **Sequence to Remember:**` $\rightarrow$ Chronological or procedural ordering
- `> ✅ **Key Distinctions to Never Confuse:**` $\rightarrow$ Disambiguation box

---

## ⚙️ Technical Implementation in Codebase

- Target File: `src/components/views/DigitalNotesView.tsx`
- Store Seed Array: `INITIAL_DIGITAL_NOTES`
- Cache Synchronization: Always update `updatedAt: new Date().toISOString()` so the browser automatically updates local storage cache.
- Card Visuals: Clean Unsplash cover photo representing the subject (without any overlay text on the image).
- Tags: Include relevant topic, exam (`UPSC`, `SSC CGL`, `State PCS`), and subject tags.
