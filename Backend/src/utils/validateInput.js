export function validateIdeaInput(idea) {
    if (!idea || typeof idea !== "string") return false
    if (idea.trim().length < 10) return false
    return true
  }
  