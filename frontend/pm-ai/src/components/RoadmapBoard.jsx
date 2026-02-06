
export default function RoadmapBoard({ data }) {
  if (!data?.features) return null

  const features = data.features

  const toText = (data, indent = 0) => {
    const space = " ".repeat(indent)

    if (data === null || data === undefined) return ""

    if (typeof data === "string") return `${space}${data}`
    if (typeof data === "number" || typeof data === "boolean") return `${space}${data}`

    if (Array.isArray(data)) {
      return data
        .map((item) => {
          if (typeof item === "object") {
            return `${space}-\n${toText(item, indent + 2)}`
          }
          return `${space}- ${item}`
        })
        .join("\n")
    }

    if (typeof data === "object") {
      return Object.entries(data)
        .map(([key, value]) => {
          if (typeof value === "object") {
            return `${space}${key}:\n${toText(value, indent + 2)}`
          }
          return `${space}${key}: ${value}`
        })
        .join("\n\n")
    }

    return `${space}${String(data)}`
  }

  return (
    <div style={styles.card}>
      <h2>🗺 Feature Roadmap</h2>

      <pre style={styles.pre}>
        {toText(features)}
      </pre>
    </div>
  )
}

const styles = {
  card: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    marginTop: "20px",
    background: "#fff"
  },
  pre: {
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "10px",
    whiteSpace: "pre-wrap",
    lineHeight: "1.7",
    fontSize: "15px",
    overflowX: "auto"
  }
}
