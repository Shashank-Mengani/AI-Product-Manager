import { runPMFlowStream } from "../orchestrator/pmFlowStream.js"

export async function streamPMFlow(req, res) {
  const idea = req.query.idea

  if (!idea || idea.trim().length < 10) {
    return res.status(400).json({ error: "Idea must be at least 10 characters" })
  }

  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("Connection", "keep-alive")
  res.setHeader("Access-Control-Allow-Origin", "*")

  res.flushHeaders()

  const sendEvent = (event, data) => {
    res.write(`event: ${event}\n`)
    res.write(`data: ${JSON.stringify(data)}\n\n`)
    res.flush?.()
  }

  try {
    await runPMFlowStream(idea, sendEvent)

    // IMPORTANT: frontend expects "final"
    sendEvent("final", { message: "Flow completed" })
    res.end()
  } catch (err) {
    console.error("Streaming Error:", err)

    sendEvent("error", {
      message: "Streaming failed",
      error: err.message
    })

    res.end()
  }
}
