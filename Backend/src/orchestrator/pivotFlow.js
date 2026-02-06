
import { constraintAgent } from "../agents/constraintAgent.js"
import { runAgent } from "../services/aiCall.js"
import { safeJSONParse } from "../utils/parseAgentOutput.js"

export async function runPivotFlow(currentPlan) {
  const prompt = `
You are a hackathon Product Manager.

Task:
Pivot the MVP to make it more unique, more hackathon-ready, and easier to demo.

Return STRICT JSON only in this format:

{
  "finalMVPFeatures": [
    { "name": "", "description": "", "priority": "High/Medium/Low" }
  ],
  "featuresToRemove": [],
  "whatCanBeMocked": [],
  "demoFlow": []
}

Current MVP:
${JSON.stringify(currentPlan, null, 2)}
`

  const pivotRes = await runAgent(constraintAgent, prompt)

  const pivoted = safeJSONParse(pivotRes)

  // fallback if AI returns plain text
  if (!pivoted) {
    return {
      finalMVPFeatures: [
        { name: "Pivot failed", description: pivotRes, priority: "High" }
      ],
      featuresToRemove: [],
      whatCanBeMocked: [],
      demoFlow: []
    }
  }

  return pivoted
}
