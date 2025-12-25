import { getD1Database } from "@/lib/db";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, position, cv_link, message } = body;

        if (!name || !phone || !position) {
            return NextResponse.json(
                { error: "Name, phone, and position are required" },
                { status: 400 }
            );
        }

        const db = await getD1Database();
        
        // Use a try-catch for the DB insert in case the table doesn't exist yet (user needs to run migration or create table)
        // But for now we assume the table exists or will exist.
        // We really should ideally check for table existence if we could, but we can't easily.
        // We'll proceed with the insert.
        
        await db
            .prepare(
                `INSERT INTO career_applications (name, email, phone, position, cv_link, message, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`
            )
            .bind(name, email || "", phone, position, cv_link || "", message || "", "pending")
            .run();

        // Send email notification
        await sendEmail({
            to: "rahmatullahzisan@gmail.com",
            subject: `New Job Application: ${position} - ${name}`,
            html: `
                <h2>New Job Application</h2>
                <p><strong>Position:</strong> ${position}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email || "N/A"}</p>
                <p><strong>CV Link:</strong> <a href="${cv_link}">${cv_link || "N/A"}</a></p>
                <p><strong>Message:</strong></p>
                <p>${message || "N/A"}</p>
            `,
        });

        return NextResponse.json({ success: true, message: "Application submitted successfully" });
    } catch (error) {
        console.error("Career application error:", error);
        return NextResponse.json(
            { error: "Failed to process application" },
            { status: 500 }
        );
    }
}
