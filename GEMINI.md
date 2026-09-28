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
  - Background & Philosophy → Constitutional Evolution → Composition & Allocations → Institutions & Powers → Landmark Articles & Amendments → Working Committees → Landmark Supreme Court Judgments → Exam Traps → Rapid Revision Sheet.
- **History (Ancient / Medieval / Modern / World)**:
  - Historical Context → Primary Causes & Grievances → Major Leaders & Personalities → Chronological Outbreak & Geographic Spread → Treaties, Acts & British Response → Causes of Outcome / Legacy → Quotes & Contemporary Literature → High-Yield One-Liners → Chronology Sequence & Revision Sheet.
- **Science (Biology, Physics, Chemistry)**:
  - Anatomy / Core Structure → Physiological Mechanism / Working Process → Key Equations / Chemical Reactions / Enzymes → Regulation & Factors Affecting → Clinical Disorders / Pathology / Applications → Comparison Tables → Diagnostic Values / Constants → Rapid Recall Formula & Fact Sheet.
- **Economy & Banking**:
  - Conceptual Framework → Monetary / Fiscal Policy Tools → Quantitative vs Qualitative Measures → Impact on Inflation, Growth & Exchange Rates → Transmission Mechanisms & Flowcharts → Comparison Matrices → Key Indices, Formulas & Ratios → High-Yield Facts & Quick Revision Sheet.
- **Geography & Environment**:
  - Origin & Geological Formation → Physical Features & Relief → Drainage Systems / River Basins → Climate, Monsoon & Soil Types → Biomes, Biodiversity & Protected Areas (National Parks) → Resource Distribution & Agriculture → Spatial Mnemonics → Quick Recall Map/Table Revision.
- **Quantitative Aptitude & Reasoning**:
  - Underlying Theorems → Master Formula Cheatsheet → Shortcut Derivations → Core Problem Archetypes (Case 1, 2, 3) → High-Risk Calculation Traps → Solved Model Benchmarks → Rapid Revision Formula Matrix.

---

## 🏆 Universal Quality Pillars (Mandatory in EVERY Note)

Regardless of the topic or subject, every professional note MUST include these pedagogical pillars:

1. **🎯 Hero Intro Callout**:
   - `> 🎯 **Exam-Ready Master Note:** [Target exams: UPSC CSE, State PCS, SSC CGL, etc. and overview of the topic]`
2. **📊 Rich Markdown Comparison Tables**:
   - Every note must have at least 2–4 structured comparison or classification tables with clean alignments (`:---`, `:---:`, `---:`).
3. **🧠 Smart Mnemonics**:
   - `> 🧠 **Mnemonic — [Code]:**` to help aspirants memorize complex lists, sequences, or categories effortlessly. Always format mnemonic items with clean badge-ready lines (e.g. `- **T** → Territories (Schedule 1)`).
4. **⚠️ High-Yield Exam Traps**:
   - `> ⚠️ **Exam Trap:** [Specific nuance where examiners create confusing multiple-choice options or trick questions]`.
5. **💡 Core Concepts & Insights**:
   - `> 💡 **Core Insight:**` or `> 🔑 **Master Concept:**` highlighting deep fundamentals.
6. **💎 High-Yield Fact Sheet / One-Liners**:
   - Dedicated table or list of unique records, constants, firsts, historical trivia, or high-probability exam facts.
7. **🧾 Last-Minute Rapid Revision Section (Final Section)**:
   - `> 🚀 **Sequence to Remember:** [Chain timeline or process flow with clean Unicode arrows →]`.
   - High-Frequency Exam Numbers / Key Values.
   - `> ✅ **Key Distinctions to Never Confuse:** [Side-by-side disambiguation of confusing terms/dates]`.

---

## 🎨 Visual Callout Standards (Markdown Syntax)

- `> 🎯 **Exam-Ready Master Note:**` → Hero intro badge
- `> 🔑 **Master Blueprint:**` → Core structural foundation
- `> 🧠 **Mnemonic — [Code]:**` → Memory retention hooks
- `> ⚠️ **Exam Trap:**` → Negative marking warning & common confusion alerts
- `> 📌 **Why [X]?**` → Deep conceptual reasoning
- `> 🚀 **Sequence to Remember:**` → Chronological or procedural ordering
- `> ✅ **Key Distinctions to Never Confuse:**` → Disambiguation box

---

## ⚡ Arrow Syntax & Escape Protection (Mandatory)
- **NEVER use LaTeX syntax like `$\rightarrow$` or `\rightarrow` in markdown notes or strings.**
- In JavaScript / TypeScript string literals, `\r` evaluates to carriage return (`\r`), converting `$\rightarrow$` into corrupted `$ ightarrow$`.
- **ALWAYS use clean Unicode arrows**:
  - Right arrow: `→` (`\u2192`)
  - Left arrow: `←` (`\u2190`)
  - Both directions / Equivalence: `⟺` (`\u27FA`)
- The parser automatically styles `→` with executive Indigo / Purple badges.

---

## ⚙️ Technical Implementation in Codebase

- Target File: `src/components/views/DigitalNotesView.tsx`
- Store Seed Array: `INITIAL_DIGITAL_NOTES`
- Cache Synchronization: Always update `updatedAt: new Date().toISOString()` so the browser automatically updates local storage cache.
- Card Visuals: Clean Unsplash cover photo representing the subject (without any overlay text on the image).
- Tags: Include relevant topic, exam (`UPSC`, `SSC CGL`, `State PCS`), and subject tags.
