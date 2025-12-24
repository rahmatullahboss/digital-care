// Email service for Cloudflare Workers using fetch-based approach

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

// Method 1: Using Resend API (recommended for production)
async function sendViaResend({ to, subject, html }: EmailOptions) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return null;

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Digital Care <onboarding@resend.dev>',
                to: [to],
                subject,
                html,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Email sent via Resend:", data);
            return { success: true, messageId: data.id };
        }
        console.error("Resend error:", data);
        return null;
    } catch (error) {
        console.error("Resend fetch error:", error);
        return null;
    }
}

// Method 2: Using Brevo (formerly Sendinblue) - free tier available
async function sendViaBrevo({ to, subject, html }: EmailOptions) {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) return null;

    try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender: { name: 'Digital Care', email: 'noreply@digitalcare.site' },
                to: [{ email: to }],
                subject,
                htmlContent: html,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Email sent via Brevo:", data);
            return { success: true, messageId: data.messageId };
        }
        console.error("Brevo error:", data);
        return null;
    } catch (error) {
        console.error("Brevo fetch error:", error);
        return null;
    }
}

// Method 3: Using webhook to external service (n8n, Make, etc.)
async function sendViaWebhook({ to, subject, html }: EmailOptions) {
    const webhookUrl = process.env.EMAIL_WEBHOOK_URL;
    if (!webhookUrl) return null;

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to, subject, html }),
        });

        if (response.ok) {
            console.log("Email sent via webhook");
            return { success: true };
        }
        return null;
    } catch (error) {
        console.error("Webhook error:", error);
        return null;
    }
}

export async function sendEmail(options: EmailOptions) {
    // Try each method in order until one succeeds
    let result = await sendViaResend(options);
    if (result) return result;

    result = await sendViaBrevo(options);
    if (result) return result;

    result = await sendViaWebhook(options);
    if (result) return result;

    console.error("All email methods failed. Configure RESEND_API_KEY, BREVO_API_KEY, or EMAIL_WEBHOOK_URL");
    return { success: false, error: "No email service configured" };
}
