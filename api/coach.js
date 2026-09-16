export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: "OPENAI_API_KEY is not configured" });
    return;
  }

  try {
    const { question, profile, sessions } = req.body || {};
    if (!question || typeof question !== "string") {
      res.status(400).json({ error: "Question is required" });
      return;
    }

    const compactSessions = Array.isArray(sessions) ? sessions.slice(-20) : [];

    const instructions = `
Eres un asistente de seguimiento de entrenamiento de fuerza.
Responde siempre en español, con tono claro y breve.
Usa únicamente los datos proporcionados por la app para afirmar tendencias personales.
Distingue entre observaciones de datos y sugerencias.
No diagnostiques lesiones ni enfermedades. Si el usuario reporta dolor, síntomas o una posible lesión, recomienda detener el ejercicio que provoca dolor y consultar a un profesional sanitario cualificado.
No inventes datos faltantes.
Para progresión de carga, considera peso, repeticiones y RIR en conjunto; si no hay suficiente información, dilo.
Prefiere comparaciones entre sesiones del mismo ejercicio.
`;

    const input = `Pregunta del usuario:
${question}

Perfil/configuración:
${JSON.stringify(profile || {}, null, 2)}

Últimas sesiones disponibles:
${JSON.stringify(compactSessions, null, 2)}
`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
        instructions,
        input,
        reasoning: { effort: "low" },
        max_output_tokens: 700
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("OpenAI error", data);
      res.status(502).json({ error: "AI request failed" });
      return;
    }

    const answer =
      data.output_text ||
      (data.output || [])
        .flatMap(item => item.content || [])
        .filter(part => part.type === "output_text")
        .map(part => part.text)
        .join("\n");

    res.status(200).json({ answer: answer || "No pude generar un análisis con estos datos." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
