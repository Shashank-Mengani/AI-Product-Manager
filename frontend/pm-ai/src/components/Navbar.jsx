  
export default function Navbar({ project, setProject }) {
  return (
    <div style={styles.nav}>
      <input
        style={styles.input}
        value={project.name}
        onChange={(e) =>
          setProject((prev) => ({ ...prev, name: e.target.value }))
        }
      />

      <p style={styles.text}>AI Product Manager</p>
    </div>
  )
}

const styles = {
  nav: {
    padding: "15px",
    background: "black",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  input: {
    padding: "8px",
    borderRadius: "8px",
    border: "none",
    width: "250px",
    fontWeight: "bold"
  },
  text: {
    margin: 0,
    fontWeight: "bold"
  }
}


