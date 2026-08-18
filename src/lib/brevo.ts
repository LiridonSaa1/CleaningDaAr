// Client-side helper for Brevo Email integration

export interface SendEmailOptions {
  to: string;
  name?: string;
  subject: string;
  htmlContent: string;
  replyTo?: string;
}

const BREVO_SENDER_EMAIL = 'duariservice@gmail.com';
const BREVO_SENDER_NAME = 'Dua & Ari Gebäudereinigung';

/**
 * Sends email via backend endpoint /api/send-email or direct Brevo REST API
 */
export async function sendEmailViaBrevo(options: SendEmailOptions): Promise<{ success: boolean; message?: string }> {
  // 1. Try server endpoint first
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && !data.mock) {
        return { success: true };
      }
    }
  } catch (err) {
    console.warn('Server middleware /api/send-email not available, attempting direct Brevo REST call...', err);
  }

  // 2. Direct client-side Brevo REST API fallback call
  try {
    const apiKey = (import.meta.env.VITE_BREVO_API_KEY || import.meta.env.BREVO_API_KEY || '').trim();
    if (!apiKey) {
      console.warn('BREVO_API_KEY missing in environment variables, skipping email dispatch.');
      return { success: false, message: 'Missing Brevo API Key' };
    }

    const payload = {
      sender: { email: BREVO_SENDER_EMAIL, name: BREVO_SENDER_NAME },
      to: [{ email: options.to, name: options.name || options.to }],
      subject: options.subject,
      htmlContent: options.htmlContent,
      ...(options.replyTo ? { replyTo: { email: options.replyTo } } : {})
    };

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      return { success: true };
    } else {
      const errJson = await res.json().catch(() => ({}));
      console.warn('Brevo Direct API response error:', errJson);
      return { success: false, message: errJson?.message || 'Brevo API Error' };
    }
  } catch (error: any) {
    console.error('Error sending email directly via Brevo API:', error);
    return { success: false, message: error?.message || 'Network error' };
  }
}
