exports.handler = async (event) => {
  try {
    const { message, projectParams = {} } = JSON.parse(event.body || '{}');

    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Groq API key not configured' }),
      };
    }

    const systemPrompt = `You are Dave Ai, a direct and concise expert on metal buildings.

Current known project details: ${JSON.stringify(projectParams)}

Strict rules:
- Answer ONLY the exact question the user asked. Do not volunteer extra information, context, options, or advice.
- Keep answers short: 1-2 sentences maximum in most cases.
- If they did not ask for a recommendation, do not give one.
- Be direct. No unnecessary explanations.`;

    const payload = {
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 250
    };

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      console.error('Groq error:', data);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: data.error?.message || 'Groq API error' }),
      };
    }

    const text = data.choices?.[0]?.message?.content?.trim() || 'Sorry, I had trouble thinking of an answer.';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
