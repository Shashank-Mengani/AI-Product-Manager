import { runAgent } from "../services/aiCall.js"

export async function generateArchitecture(req, res) {
  try {
    const { projectData } = req.body

    if (!projectData) {
      return res.status(400).json({ error: "projectData is required" })
    }

    // 🔥 Reduce size: keep only important keys
    const slimData = {
      ideaAnalysis: projectData.ideaAnalysis,
      marketAnalysis: projectData.marketAnalysis,
      finalMVP: projectData.finalMVP,
      techStack: projectData.techStack
    }

    const prompt = `
You are a Senior Software Architect.

Generate a hackathon-ready system design document.

Rules:
- Output MUST be plain text (no JSON)
- Include Mermaid diagram inside triple backticks
- Keep it concise but complete

Include:
1) Architecture overview
2) Frontend modules (React)
3) Backend modules (Node/Express)
4) API endpoints
5) MongoDB schema
6) Auth plan
7) Mermaid diagram
8) Demo flow

Project context:
${JSON.stringify(slimData, null, 2)}
`

    const response = await runAgent(
      { model: "llama-3.1-8b-instant" },
      prompt
    )

    res.json({ architecture: response })
  } catch (err) {
    console.error("Architecture generation error:", err)
    res.status(500).json({ error: err.message || "Architecture generation failed" })
  }
}
