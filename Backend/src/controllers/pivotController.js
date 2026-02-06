import { runPivotFlow } from "../orchestrator/pivotFlow.js"

export async function pivotIdea(req, res) {
  const { currentPlan } = req.body

  if (!currentPlan) {
    return res.status(400).json({ error: "currentPlan is required" })
  }

  try {
    const pivotedMVP = await runPivotFlow(currentPlan)
    res.json({ pivotedMVP })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Pivot failed" })
  }
}
