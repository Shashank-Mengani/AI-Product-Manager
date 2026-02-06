import { useState } from "react"

export default function IdeaForm({ onSubmit }) {
  const [idea, setIdea] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!idea.trim()) return
    onSubmit(idea)
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Enter Your Hackathon Idea</h2>

      <textarea
        style={styles.textarea}
        placeholder="Example: AI tool that helps hackathon teams build the MVP faster..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />

      <button style={styles.btn}>Generate Product Plan</button>
    </form>
  )
}

const styles = {
  form: {
    width: "100%",
    maxWidth: "700px",
    margin: "30px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px"
  },
  textarea: {
    width: "100%",
    height: "150px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #aaa",
    marginTop: "10px",
    fontSize: "15px"
  },
  btn: {
    marginTop: "15px",
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  }
}
