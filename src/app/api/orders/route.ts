import { NextResponse } from "next/server";
import { getD1Database } from "@/lib/db";
import { sendEmail } from "@/lib/email";

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

        // Send email notification to admin (hardcoded email for Cloudflare Workers)
        const adminEmail = "rahmatullahzisan@gmail.com";
        const emailHtml = `
            <div style="font-family: 'Hind Siliguri', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 12px;">
                <div style="background: linear-gradient(135deg, #14b8a6, #06b6d4); padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">🎉 নতুন অর্ডার পেয়েছেন!</h1>
                </div>
                
                <div style="background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155;">
                    <h2 style="color: #14b8a6; margin-top: 0;">📦 প্যাকেজ বিবরণ</h2>
                    <p style="color: #e2e8f0; font-size: 18px; margin: 5px 0;"><strong>প্যাকেজ:</strong> ${package_name}</p>
                    <p style="color: #14b8a6; font-size: 22px; margin: 5px 0;"><strong>মূল্য:</strong> ৳${price}</p>
                </div>
                
                <div style="background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; margin-top: 15px;">
                    <h2 style="color: #14b8a6; margin-top: 0;">👤 গ্রাহকের তথ্য</h2>
                    <p style="color: #e2e8f0;"><strong>নাম:</strong> ${name}</p>
                    <p style="color: #e2e8f0;"><strong>ফোন:</strong> <a href="tel:${phone}" style="color: #14b8a6;">${phone}</a></p>
                    ${email ? `<p style="color: #e2e8f0;"><strong>ইমেইল:</strong> <a href="mailto:${email}" style="color: #14b8a6;">${email}</a></p>` : ''}
                    ${companyName ? `<p style="color: #e2e8f0;"><strong>প্রতিষ্ঠান:</strong> ${companyName}</p>` : ''}
                    ${message ? `<p style="color: #e2e8f0;"><strong>বার্তা:</strong> ${message}</p>` : ''}
                </div>
                
                <div style="text-align: center; margin-top: 20px;">
                    <a href="tel:${phone}" style="display: inline-block; background: linear-gradient(135deg, #14b8a6, #06b6d4); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-right: 10px;">📞 কল করুন</a>
                    <a href="https://wa.me/88${phone.replace(/^0/, '')}" style="display: inline-block; background: #25D366; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">💬 WhatsApp</a>
                </div>
                
                <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #334155;">
                    <p style="color: #64748b; font-size: 12px;">Order ID: ${id}</p>
                    <p style="color: #64748b; font-size: 12px;">সময়: ${new Date(now).toLocaleString('bn-BD', { timeZone: 'Asia/Dhaka' })}</p>
                </div>
            </div>
        `;

        // Send email in background (don't await to avoid blocking response)
        sendEmail({
            to: adminEmail,
            subject: `🎉 নতুন অর্ডার: ${package_name} - ${name}`,
            html: emailHtml,
        }).catch((err) => console.error("Failed to send order notification email:", err));

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
