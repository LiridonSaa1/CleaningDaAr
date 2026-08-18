// Client-side helper for Brevo Email integration

export interface SendEmailOptions {
  to: string;
  name?: string;
  subject: string;
  htmlContent: string;
  replyTo?: string;
}

/**
 * Sends email securely via backend server endpoint /api/send-email (which holds BREVO_API_KEY)
 */
export async function sendEmailViaBrevo(options: SendEmailOptions): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    const data = await response.json();

    if (!response.ok) {
      console.warn('Brevo Email API Warning:', data.message || response.statusText);
      return { success: false, message: data.message || 'Error sending email' };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error connecting to email API:', error);
    return { success: false, message: error?.message || 'Network error' };
  }
}
