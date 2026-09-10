import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Endpoint for sending emails via Brevo
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, name, subject, htmlContent, replyTo } = req.body || {};

    const apiKey = process.env.BREVO_API_KEY || process.env.VITE_BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.VITE_BREVO_SENDER_EMAIL || 'info@duaari-gebaeudereinigung.de';
    const senderName = process.env.BREVO_SENDER_NAME || process.env.VITE_BREVO_SENDER_NAME || 'DuAri Hausmeister';

    if (!apiKey) {
      console.warn('[Brevo Server] BREVO_API_KEY missing in environment variables. Email logged to console.');
      console.log(`[Brevo Log] To: ${to}, Subject: "${subject}"`);
      return res.status(200).json({ 
        success: true, 
        mock: true, 
        message: 'BREVO_API_KEY missing in environment. Email logged to server console.' 
      });
    }

    const brevoPayload = {
      sender: { email: senderEmail, name: senderName },
      to: [{ email: to, name: name || to }],
      subject: subject,
      htmlContent: htmlContent,
      ...(replyTo ? { replyTo: { email: replyTo } } : {})
    };

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(brevoPayload)
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ success: false, message: data.message || 'Brevo API error' });
    }

    return res.status(200).json({ success: true, messageId: data.messageId });
  } catch (err) {
    console.error('[Server Email Error]', err);
    return res.status(500).json({ success: false, message: err?.message || 'Server error' });
  }
});

// API Endpoint for generating feature texts via Gemini
app.post('/api/generate-about-text', async (req, res) => {
  try {
    const { prompt, featureId } = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      console.warn('[Gemini Server] GEMINI_API_KEY missing in environment variables.');
      return res.status(400).json({
        success: false,
        message: 'GEMINI_API_KEY is not set in environment variables. Please add it to your .env file.'
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert copywriter for a premium cleaning company called "DuAri Hausmeister" (offering professional cleaning services).
Generate marketing copy for an advantage/feature card in both German (de) and English (en).
The card category/purpose is: ${featureId || 'cleaning advantage'}.
User prompt/instruction: ${prompt || 'Write a compelling feature description'}.

Return a JSON object with the following fields:
{
  "title_de": "Short catchy title in German (2-4 words)",
  "title_en": "Short catchy title in English (2-4 words)",
  "badge_de": "Short badge text in German (e.g., 'Glanz & Sauberkeit', max 3 words)",
  "badge_en": "Short badge text in English (e.g., 'Shine & Clean', max 3 words)",
  "description_de": "Detailed description in German (1-2 sentences, max 20 words)",
  "description_en": "Detailed description in English (1-2 sentences, max 20 words)"
}`,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const resultText = response.text;
    const data = JSON.parse(resultText);
    return res.status(200).json({ success: true, ...data });
  } catch (err) {
    console.error('[Server Gemini Error]', err);
    return res.status(500).json({ success: false, message: err?.message || 'Server error generating text' });
  }
});

// Serve static frontend dist in production
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
