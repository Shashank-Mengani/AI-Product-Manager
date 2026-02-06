
export const pitchAgent = {
  name: "Pitch Agent",
  systemPrompt: `
You are an expert startup pitch creator for hackathons.

Return ONLY valid JSON.
Do not include markdown, explanation, or extra text.
`,

  prompt: `
You will receive a product plan in JSON.

Generate a hackathon pitch in the exact format below:

{
  "pitch30": {
    "title": "",
    "description": "",
    "keyFeatures": [],
    "callToAction": ""
  },
  "pitch60": {
    "title": "",
    "description": "",
    "keyFeatures": [],
    "impact": "",
    "callToAction": ""
  },
  "problemSolutionImpact": {
    "problem": "",
    "solution": "",
    "impact": ""
  },
  "demoFlow": [
    {
      "step": 1,
      "description": ""
    }
  ]
}

Rules:
- keyFeatures must be array of strings.
- demoFlow must be an array of objects with step(number) and description(string).
- Keep pitch hackathon-friendly and simple.
- Do not add any extra keys.
`
}

  
