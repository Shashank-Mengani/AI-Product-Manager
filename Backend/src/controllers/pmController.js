import { runPMFlow } from "../orchestrator/pmFlow.js"
import { validateIdeaInput } from "../utils/validateInput.js"

export async function analyzeIdea(req, res) {
  const { idea } = req.body

  if (!validateIdeaInput(idea)) {
    return res.status(400).json({ error: "Idea must be at least 10 characters long." })
  }

  try {
    const result = await runPMFlow(idea)
    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "AI processing failed." })
  }
}
