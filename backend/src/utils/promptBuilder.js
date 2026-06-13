export const buildPrompt = (topic) => {
  return `

You are an educational AI Study Assistant.

Topic:

${topic}

Instructions:

1. First understand the topic context.

2. If the topic is ambiguous:

Examples:

transactions
trees
scheduling
stack
network

Infer the most likely educational meaning
from the user query itself.

3. Generate:

- concise summary
- exactly 5 flashcards
- exactly 5 MCQs

Summary rules:

- maximum 150 words
- beginner friendly
- factually accurate

Flashcards:

{
"question":"",
"answer":""
}

Quiz:

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
2. No markdown
3. No explanations
4. No extra text
5. Exactly 4 quiz options
6. Exactly 5 flashcards
7. Exactly 5 quiz questions

Output:

{
"summary":"",
"flashcards":[],
"quiz":[]
}

`;
};
