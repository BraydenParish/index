module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  console.log("API Key:", process.env.OPENROUTER_API_KEY); // Log the API key
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
  };
  console.log("Headers being sent:", headers); // Log the headers

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    console.log("Response from OpenRouter:", data); // Log the response
    res.status(response.status).json(data);
  } catch (error) {
    console.error("API Proxy Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
