import IdeaForm from "../components/IdeaForm"

export default function Home({ onSubmit }) {
  return (
    <div style={{ padding: "20px" }}>
      <IdeaForm onSubmit={onSubmit} />
    </div>
  )
}
