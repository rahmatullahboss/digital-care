import { getD1Database } from "@/lib/db";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";



export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, email, message } = body;

        if (!name || !phone || !message) {
            return NextResponse.json(
                { error: "নাম, ফোন এবং বার্তা আবশ্যক" },
                { status: 400 }
            );
        }

        const db = await getD1Database();
        await db
            .prepare(
                "INSERT INTO contacts (name, phone, email, message) VALUES (?, ?, ?, ?)"
            )
            .bind(name, phone, email || null, message)
            .run();

        // Send email notification
        await sendEmail({
            to: "rahmatullahzisan@gmail.com",
            subject: `New Contact Message from ${name}`,
            html: `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email || "N/A"}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        return NextResponse.json({ success: true, message: "বার্তা সফলভাবে পাঠানো হয়েছে" });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "একটি সমস্যা হয়েছে" },
            { status: 500 }
        );
    }
}
