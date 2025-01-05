// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const frontendURL = process.env.FRONTEND_URL

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    frontendURL,
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));



// Route handler
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get token from environment variables
    const apiToken = process.env.LANGFLOW_API_TOKEN;
    if (!apiToken) {
      return res.status(500).json({ error: 'API token not configured' });
    }

    // Prepare request payload
    const payload = {
      input_value: message,
      output_type: "chat",
      input_type: "chat",
      tweaks: {
        "ChatInput-UaDME": {},
        "ParseData-BjCdq": {},
        "Prompt-2ts3x": {},
        "SplitText-3UKFb": {},
        "ChatOutput-a72j7": {},
        "AstraDB-t0gqX": {},
        "AstraDB-TIk2V": {},
        "File-csq5z": {},
        "Google Generative AI Embeddings-zMcLg": {},
        "Google Generative AI Embeddings-nody7": {},
        "GoogleGenerativeAIModel-JWGRq": {}
      }
    };

    // Make request to Langflow API
    const response = await axios({
      method: 'POST',
      url: "https://api.langflow.astra.datastax.com/lf/ba9544c6-3c50-4e41-b3cf-7aeb2789beeb/api/v1/run/b71eec81-5b91-43d8-80fd-9630cd313fdc?stream=false",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`
      },
      data: payload
    });

    // Send response back to client
    res.json(response.data);

  } catch (error) {
    console.error('Error processing request:', error);
    
    // Handle different types of errors
    if (error.response) {
      // Langflow API error
      res.status(error.response.status).json({
        error: 'Langflow API error',
        details: error.response.data
      });
    } else if (error.request) {
      // Network error
      res.status(503).json({
        error: 'Network error',
        message: 'Unable to reach Langflow API'
      });
    } else {
      // Other errors
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


