const BASE_URL = import.meta.env.VITE_BACKEND_URL

export async function generateArchitecture(projectData) {
  const res = await fetch(`${BASE_URL}/api/architecture/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ projectData })
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || "Failed to generate architecture")
  }

  return res.json()
}
