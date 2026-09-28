# Standard Operating Procedure: Professional Exam Notes Generation

## 🎯 Core Directive
Whenever the user provides a PDF, topic name, or asks to create/generate notes:
1. **Zero Effort for User**: Never ask the user to type notes manually. Extract the core concepts, historical data, and exam facts directly from the input.
2. **Three-Language Standard**: Always create/generate notes in all 3 language editions:
   - 🇬🇧 **English (`en`)**: Academic, concise, standard English exam terminology.
   - 🇮🇳 **हिंदी (`hi`)**: Authentic Devanagari Hindi terminology with English technical terms in brackets.
   - 🌐 **Bilingual Dual-Coding (`bilingual`)**: Side-by-side English concepts with Hindi explanations for 40% higher cognitive recall.

---

## 📐 The 10-Section Master Note Architecture

Every digital exam note MUST follow this standardized 10-section structure:

1. **🏛️ 1. Conceptual Foundation & Classifications**:
   - Fundamental definitions, origin dates, constitutional/scientific nature.
   - Clean comparison table (e.g., Forms of Government, Classifications, Categories).
2. **⏳ 2. Historical Evolution & Timeline of Demands / Discoveries**:
   - Chronological table of milestones with constitutional/exam significance.
   - Key proposals, external offers, and reactions (with famous historical quotes).
3. **📊 3. Composition, Allocation & Quantitative Breakdown**:
   - Clean breakdown table with category, numbers, and selection methods.
   - **Mnemonic Hook** (e.g., `> 🧠 **Mnemonic — ABCD:** ...`).
   - Before and after comparison (e.g., pre-partition vs post-partition).
4. **⚖️ 4. Institutional Structure / Portfolios / Core Bodies**:
   - Detailed Markdown table with Ministries/Portfolios, Assigned Members, and Affiliations.
   - Nuanced timeline dates (e.g., exact dates of joining/reshuffles).
5. **🎯 5. Crucial Landmark Dates & Milestones**:
   - Chronological milestone list with exact dates and conventions applied (e.g., French convention).
   - Dedicated reasoning callout: `> 📌 **Why [Landmark Date/Concept]?** ...`.
6. **✒️ 6. Core Working Committee / Architect / Readings**:
   - Composition, chairperson, member list with reasons for replacements (resignation/death).
   - **High-Yield Exam Trap**: `> ⚠️ **Exam Trap:** [Specific nuance where examiners create confusing multiple-choice options]`.
   - Table of readings / drafts / stages with dates and key focus.
7. **📂 7. Major & Minor Committees / Classifications**:
   - Table of all Major Committees and their chairpersons.
   - Table of crucial Sub-Committees often asked in prelims.
   - Chairpersons pattern memory trick (e.g., `Nehru -> Union/States; Patel -> Provinces/Rights; Prasad -> Procedure/Flag`).
8. **⚡ 8. Dual Role / Functional Segregation**:
   - Side-by-side comparison table of distinct dual functions and presiding officers.
9. **💎 9. Significant One-Liners, Records & Trivia**:
   - High-yield facts table: total sessions, days, duration, expenditure, symbols/emblems, calligraphers, artists, draftsmen.
   - Dedicated section for prominent women contributors and historic firsts.
   - Signature order and manuscript preservation details (e.g., helium-filled cases).
10. **🧾 10. Last-Minute Rapid Revision Sheet**:
    - `> 🚀 **Sequence to Remember:** [Chain sequence with arrows]`.
    - Key exam numbers list.
    - Essential personalities & associations table.
    - `> ✅ **Three Dates / Concepts to Never Confuse:** [Side-by-side disambiguation]`.

---

## 🎨 Visual Callout Standards (Markdown Syntax)

- `> 🎯 **Exam-Ready Master Note:**` $\rightarrow$ Hero intro badge
- `> 🔑 **Master Blueprint:**` $\rightarrow$ Core structural foundation
- `> 🧠 **Mnemonic — [Code]:**` $\rightarrow$ Memory retention hooks
- `> ⚠️ **Exam Trap:**` $\rightarrow$ Negative marking warning & common confusion alerts
- `> 📌 **Why [X]?**` $\rightarrow$ Deep conceptual reasoning
- `> 🚀 **Sequence to Remember:**` $\rightarrow$ Chronological ordering
- `> ✅ **Three Dates / Concepts to Never Confuse:**` $\rightarrow$ Disambiguation box

---

## ⚙️ Technical Implementation in Codebase

- Target File: `src/components/views/DigitalNotesView.tsx`
- Store Seed Array: `INITIAL_DIGITAL_NOTES`
- Cache Synchronization: Always update `updatedAt: new Date().toISOString()` so the browser automatically updates local storage cache.
- Card Visuals: Clean Unsplash cover photo representing the subject (without any overlay text on the image).
- Tags: Include relevant topic, exam (`UPSC`, `SSC CGL`, `State PCS`), and subject tags.
