import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

function brevoApiPlugin(): Plugin {
  return {
    name: 'brevo-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/send-email' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });

          req.on('end', async () => {
            try {
              const { to, name, subject, htmlContent, replyTo } = JSON.parse(body || '{}');

              const apiKey = process.env.BREVO_API_KEY || process.env.VITE_BREVO_API_KEY;
              const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.VITE_BREVO_SENDER_EMAIL || 'info@duaari-gebaeudereinigung.de';
              const senderName = process.env.BREVO_SENDER_NAME || process.env.VITE_BREVO_SENDER_NAME || 'Dua & Ari Gebäudereinigung';

              if (!apiKey) {
                console.warn('[Brevo API Middleware] WARNING: BREVO_API_KEY is not set in environment variables. Email logged locally.');
                console.log(`[Brevo API Mock Log] To: ${to}, Subject: "${subject}"`);
                
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ 
                  success: true, 
                  mock: true,
                  message: 'BREVO_API_KEY missing in environment variables. Email logged to dev console.' 
                }));
                return;
              }

              const brevoPayload = {
                sender: { email: senderEmail, name: senderName },
                to: [{ email: to, name: name || to }],
                subject: subject,
                htmlContent: htmlContent,
                ...(replyTo ? { replyTo: { email: replyTo } } : {})
              };

              const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                  'accept': 'application/json',
                  'api-key': apiKey,
                  'content-type': 'application/json'
                },
                body: JSON.stringify(brevoPayload)
              });

              const responseData = await brevoResponse.json();

              if (!brevoResponse.ok) {
                res.statusCode = brevoResponse.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, message: responseData.message || 'Brevo API error' }));
                return;
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, messageId: responseData.messageId }));
            } catch (err: any) {
              console.error('[Brevo API Server Error]', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: err?.message || 'Server error processing email' }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), brevoApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
