import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

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
    const senderName = process.env.BREVO_SENDER_NAME || process.env.VITE_BREVO_SENDER_NAME || 'Dua & Ari Gebäudereinigung';

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

// Serve static frontend dist in production
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
