const BASE_URL = import.meta.env.VITE_BACKEND_URL

export async function analyzeIdea(idea) {
  const res = await fetch(`${BASE_URL}/api/pm/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idea })
  })

  if (!res.ok) throw new Error("Analyze failed")
  return res.json()
}

export async function pivotIdea(currentPlan) {
  const res = await fetch(`${BASE_URL}/api/pm/pivot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currentPlan })
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || "Pivot failed")
  }

  return res.json()
}

// Streaming api call
export function streamPMFlow(idea, onLog, onResult, onDone, onError) {
  const eventSource = new EventSource(
    `${BASE_URL}/api/stream/pm-stream?idea=${encodeURIComponent(idea)}`
  )

  eventSource.addEventListener("log", (event) => {
    onLog(JSON.parse(event.data))
  })

  eventSource.addEventListener("result", (event) => {
    onResult(JSON.parse(event.data))
  })

  eventSource.addEventListener("final", (event) => {
    onDone(JSON.parse(event.data))
    eventSource.close()
  })

  eventSource.addEventListener("error", (event) => {
    onError(event)
    eventSource.close()
  })

  return eventSource
}




