import { describe, it, expect, vi, beforeAll } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProfessionalNotesEditor } from './ProfessionalNotesEditor';

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  HTMLCanvasElement.prototype.getContext = () => ({
    clearRect: () => {},
    save: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    stroke: () => {},
  }) as any;
});

const sampleLongNotes = `Chalo bachon, Article 14 ke baad ab hum **Article 15 – Prohibition of Discrimination** padhte hain. Ye article Article 14 ka hi "specific" version hai. Article 14 general equality deta hai, aur Article 15 bataata hai ki **kin grounds par bhedbhav nahi ho sakta**.

---

## 1. Article 15 ka basic idea

Article 15 **Part III (Fundamental Rights)** me aata hai aur iske **6 clauses** hain: 15(1) se 15(6). Pehle 3 clauses original Constitution me the, baaki 3 baad ke amendments se aaye.

**Yaad rakho:** Article 15 sirf **citizens** ke liye hai (Article 14 sabhi persons ke liye tha).

---

## 2. Clause-wise detail

### Article 15(1): State bhedbhav nahi karegi

> *"The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them."*

**5 prohibited grounds:** Religion, Race, Caste, Sex, Place of birth.

**Do cheezein dhyan se samjho:**

**(i) "Only" word ka matlab:** Bhedbhav tab galat hai jab wo **sirf in grounds par** ho. Agar koi aur valid reason bhi hai, to alag baat hai.

**Example:** Army me ek post ke liye physical fitness test hota hai. Isme jo log fail hote hain unhe reject kiya jata hai. Ye bhedbhav nahi hai, kyunki reason fitness hai, religion ya caste nahi.

| Clause | Kya kehta hai | Kaun bound hai | Amendment |
|--------|---------------|----------------|-----------|
| **15(1)** | 5 grounds par discrimination mana | Sirf State | Original |
| **15(2)** | Public places/facilities me discrimination mana | State + Private persons | Original |
| **15(3)** | Women aur children ke liye special laws | Exception | Original |
| **15(4)** | SEBCs, SC, ST ki advancement | Exception | 1st Amendment (1951) |
| **15(5)** | Educational institutions me reservation (minority ko chhodkar) | Exception | 93rd Amendment (2005) |
| **15(6)** | EWS ke liye max 10% reservation | Exception | 103rd Amendment (2019) |

---

## 4. Article 14 vs Article 15 (Exam favourite)

| Point | Article 14 | Article 15 |
|-------|------------|------------|
| Kisko milta hai | Any **person** (citizens + foreigners) | Sirf **citizens** |
| Scope | General equality | Specific grounds par discrimination |
| Grounds | Koi fixed ground nahi | Religion, race, caste, sex, place of birth |
| Reasonable classification | Allowed | Sirf exceptions (15(3)–(6)) ke through |
`;

describe('ProfessionalNotesEditor', () => {
  it('renders long notes cleanly without crashing or hanging', () => {
    const handleSave = vi.fn();
    const { container } = render(
      <ProfessionalNotesEditor
        initialContent={sampleLongNotes}
        topicName="Making of Indian Constitution"
        subjectName="General Awareness & GK"
        chapterName="Indian Polity & Constitution"
        onSave={handleSave}
      />
    );

    expect(container).toBeTruthy();
    expect(screen.getByText(/Article 15 ka basic idea/i)).toBeTruthy();
  });
});
