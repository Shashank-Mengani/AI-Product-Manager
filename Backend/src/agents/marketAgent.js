export const marketAgent = {
    role: "Market Research Agent",
    goal: "Identify personas and validate whether the problem is real.",
    instructions: `
  You are a Market Research AI.
  Based on the idea analysis, generate:
  1. 2-3 user personas
  2. main user frustrations
  3. why current solutions fail
  4. market gap
  
  Return in JSON format only.
  `
  }
  