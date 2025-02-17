# Langflow Chat Backend

This repository contains the backend code for a chat application that integrates with Langflow API to process and respond to user messages. The server is built using Node.js with Express, and it supports cross-origin requests for seamless frontend-backend communication.

## Features
- Accepts user messages via a `/api/chat` endpoint.
- Sends messages to the Langflow API for processing.
- Handles API authentication using an environment variable for the token.
- Implements CORS for secure communication with the frontend.
- Provides error handling for API errors, network issues, and internal server errors.

## Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Langflow API token

## Environment Variables
The following environment variables must be set in a `.env` file:

```
PORT=3000 # Or your preferred port
FRONTEND_URL=http://localhost:3000 # Replace with your frontend's URL
LANGFLOW_API_TOKEN=your_langflow_api_token
```

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/langflow-chat-backend.git
   cd langflow-chat-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and set the required environment variables.

## Usage
1. Start the server:
   ```bash
   npm start
   ```
   The server will start on the specified port (default: 3000).

2. Send a POST request to the `/api/chat` endpoint with the following JSON payload:
   ```json
   {
     "message": "Your message here"
   }
   ```

3. The server will forward the message to the Langflow API and return the processed response.

## Error Handling
- **400 Bad Request**: Returned if the `message` field is missing in the request body.
- **500 Internal Server Error**: Returned if the Langflow API token is not configured or an unexpected error occurs.
- **503 Service Unavailable**: Returned if there is a network error while communicating with the Langflow API.

## Dependencies
- `dotenv`: For environment variable management.
- `express`: For building the REST API.
- `cors`: For enabling cross-origin requests.
- `axios`: For making HTTP requests to the Langflow API.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

Feel free to fork, modify, and contribute to this project!

