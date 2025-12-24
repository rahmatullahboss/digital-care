import { NextResponse } from "next/server";
import { getD1Database } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, email, companyName, message, package_name, price } = body;

        if (!name || !phone || !package_name || !price) {
            return NextResponse.json(
                { error: "প্রয়োজনীয় তথ্য প্রদান করুন" },
                { status: 400 }
            );
        }

        const db = await getD1Database();

        // Generate explicit ID and timestamps
        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        const status = 'pending';

        await db
            .prepare(
                `INSERT INTO orders (id, package_name, price, name, phone, email, company_name, message, status, created_at) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            )
            .bind(
                id,
                package_name,
                price,
                name,
                phone,
                email || null,
                companyName || null,
                message || null,
                status,
                now
            )
            .run();

        // Send email notification to admin using Resend API directly
        const adminEmail = "rahmatullahzisan@gmail.com";
        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        
        console.log("📧 Attempting to send email notification...");
        console.log("📧 RESEND_API_KEY present:", !!RESEND_API_KEY);
        
        if (RESEND_API_KEY) {
            const emailHtml = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #1e293b; border-radius: 12px;">
                    <div style="background: #14b8a6; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
                        <h1 style="color: white; margin: 0;">🎉 নতুন অর্ডার!</h1>
                    </div>
                    <div style="background: #334155; padding: 20px; border-radius: 8px;">
                        <p style="color: #e2e8f0;"><strong>প্যাকেজ:</strong> ${package_name}</p>
                        <p style="color: #14b8a6; font-size: 20px;"><strong>মূল্য:</strong> ৳${price}</p>
                        <hr style="border-color: #475569;">
                        <p style="color: #e2e8f0;"><strong>নাম:</strong> ${name}</p>
                        <p style="color: #e2e8f0;"><strong>ফোন:</strong> ${phone}</p>
                        ${email ? `<p style="color: #e2e8f0;"><strong>ইমেইল:</strong> ${email}</p>` : ''}
                        ${companyName ? `<p style="color: #e2e8f0;"><strong>প্রতিষ্ঠান:</strong> ${companyName}</p>` : ''}
                        ${message ? `<p style="color: #e2e8f0;"><strong>বার্তা:</strong> ${message}</p>` : ''}
                    </div>
                    <p style="color: #64748b; text-align: center; margin-top: 15px; font-size: 12px;">Order ID: ${id}</p>
                </div>
            `;

            try {
                console.log("📧 Sending email via Resend API...");
                const emailResponse = await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${RESEND_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        from: 'Digital Care <onboarding@resend.dev>',
                        to: [adminEmail],
                        subject: `🎉 নতুন অর্ডার: ${package_name} - ${name}`,
                        html: emailHtml,
                    }),
                });

                const emailData = await emailResponse.json();
                console.log("📧 Resend API response status:", emailResponse.status);
                console.log("📧 Resend API response:", JSON.stringify(emailData));
                
                if (!emailResponse.ok) {
                    console.error("📧 Email sending failed:", emailData);
                }
            } catch (emailError) {
                console.error("📧 Email fetch error:", emailError);
            }
        } else {
            console.error("📧 RESEND_API_KEY is not configured!");
        }

        return NextResponse.json({
            success: true,
            message: "অর্ডার সফলভাবে গ্রহণ করা হয়েছে",
            orderId: id
        });

    } catch (error) {
        console.error("Order submission error:", error);
        return NextResponse.json(
            { error: "অর্ডার সাবমিট করতে সমস্যা হয়েছে" },
            { status: 500 }
        );
    }
}
