export function safeJSONParse(text) {
  try {
    if (!text) return {}

    // remove ```json or ``` blocks
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    return JSON.parse(cleaned)
  } catch (err) {
    return { raw: text, error: "Invalid JSON output from agent" }
  }
}
