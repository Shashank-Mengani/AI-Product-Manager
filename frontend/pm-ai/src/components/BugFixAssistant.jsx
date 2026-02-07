import { useState } from "react"
import { useTambo } from "@tambo-ai/react"

export default function BugFixAssistant() {
  const tambo = useTambo()

  const [errorText, setErrorText] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const extractPlainText = (content) => {
    if (!content) return ""

    if (typeof content === "string") return content

    if (Array.isArray(content)) {
      return content
        .map((item) => {
          if (typeof item === "string") return item
          if (item?.text) return item.text
          if (item?.value) return item.value
          return ""
        })
        .join("")
    }

    if (typeof content === "object") {
      if (content.text) return content.text
      if (content.value) return content.value
    }

    return String(content)
  }

  const handleFix = async () => {
    if (!errorText.trim()) return alert("Paste error first!")

    setLoading(true)
    setResponse("")

    try {
      const prompt = `
You are a senior full-stack developer.

Fix this error:
${errorText}

Return output ONLY in plain-text format.

Format:
Root Cause:
Fix:
Updated Code:
Extra Suggestions:
`

      const result = await tambo.sendThreadMessage(prompt)

      console.log("TAMBO RESULT:", result)

      const finalText =
        extractPlainText(result?.message?.content) ||
        extractPlainText(result?.content) ||
        extractPlainText(result?.text) ||
        "⚠ No response received."

      setResponse(finalText)
    } catch (err) {
      console.error("BugFixAssistant Error:", err)
      setResponse("❌ Error: Request failed. Check API key/projectId.")
    }

    setLoading(false)
  }

  return (
    <div style={styles.card}>
      <h2>Chat with Bug AI Assistant</h2>

      <textarea
        style={styles.textarea}
        placeholder="Paste your console error here..."
        value={errorText}
        onChange={(e) => setErrorText(e.target.value)}
      />

      <button style={styles.btn} onClick={handleFix} disabled={loading}>
        {loading ? "Fixing..." : "Fix This Bug"}
      </button>

      {response && (
        <div style={styles.output}>
          <pre style={styles.pre}>{response}</pre>
        </div>
      )}
    </div>
  )
}

const styles = {
  card: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    background: "#fff"
  },
  textarea: {
    width: "100%",
    height: "140px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "14px",
    marginTop: "10px"
  },
  btn: {
    marginTop: "12px",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "none",
    background: "black",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  },
  output: {
    marginTop: "15px",
    padding: "15px",
    borderRadius: "10px",
    background: "#f9fafb",
    border: "1px solid #eee"
  },
  pre: {
    whiteSpace: "pre-wrap",
    lineHeight: "1.7",
    fontSize: "14px"
  }
}
