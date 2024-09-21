// pages/api/chat.js
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { prompt } = req.body;

        try {
            const response = await axios.post('http://localhost:3001/chat', { prompt }); // Adjust the URL if needed
            res.status(200).json({ response: response.data });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch response from chatbot' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
