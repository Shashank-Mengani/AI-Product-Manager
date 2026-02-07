import { groq } from "./tamboClient.js"

let cachedModel = null

async function getGroqModel() {
  if (cachedModel) return cachedModel;

  const models = await groq.models.list();

  const preferredModels = [
    "llama-3.1-8b-instant",
    "llama3-8b-8192"
  ]

  const available = models.data.map((m) => m.id)

  cachedModel = preferredModels.find((m) => available.includes(m))

  if (!cachedModel) cachedModel = available[0]

  console.log("✅ Using Groq Model:", cachedModel)
  return cachedModel
}

export async function runAgent(agent, input) {
  const model = await getGroqModel()

  const response = await groq.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: `
You are acting as: ${agent.role}

Goal: ${agent.goal}

Instructions:
${agent.instructions}

Return valid JSON only. No extra text.
        `
      },
      {
        role: "user",
        content: input
      }
    ],
    temperature: 0.7,
    max_tokens: 800,
  })

  return response.choices[0].message.content
}

