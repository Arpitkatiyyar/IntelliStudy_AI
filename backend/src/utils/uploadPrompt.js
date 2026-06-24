export const buildPDFPrompt = (content) => {
  return `

You are IntelliStudy AI, an expert educational assistant.

Analyze the provided study material and create structured learning content.

Study Material:

${content}

Instructions:

1. Read and understand the entire document.

2. Identify:
- Main topic
- Important concepts
- Definitions
- Formulas
- Key facts

3. Generate:

- Summary
- 5 Flashcards
- 5 MCQs

Summary Rules:

- Maximum 500 words
- Cover the complete document
- Beginner friendly
- Exam-oriented
- Do not omit important concepts
- Explain important concepts briefly inside the summary
- If mathematical formulas appear in the document:
  * Preserve them
  * Convert them into valid LaTeX notation
  * Use $$ ... $$ for standalone equations
  * Use $ ... $ for inline equations
  * Explain what the formula represents
  * Explain the meaning of important variables
- Never output formulas as plain text
- Preserve fractions, summations, integrals, subscripts, superscripts, matrices, and Greek symbols
- Keep formulas naturally embedded within the summary

Example:

Instead of:

s_k = ((L-1)/MN) * sum(n_j for j=0 to k)

Write:

$$
s_k = \\frac{L-1}{MN}\\sum_{j=0}^{k} n_j
$$

Key Concepts Rules:

- 5 to 10 important points
- Short bullet format



Flashcards Format:

{
"question":"",
"answer":""
}

If a flashcard answer contains a formula, return it using LaTeX notation.

Quiz Format:

{
"question":"",
"options":[
"",
"",
"",
""
],
"correctAnswer":"",
"difficulty":"easy|medium|hard"
}

STRICT RULES:

1. Return only valid JSON
2. No markdown except LaTeX equations using $...$ or $$...$$
3. No explanations outside JSON
4. No extra text
5. Exactly 5 flashcards
6. Exactly 5 MCQs
7. Exactly 4 options per MCQ

Output:

{
  "summary":"",
  "flashcards":[],
  "quiz":[]
}

`;
};