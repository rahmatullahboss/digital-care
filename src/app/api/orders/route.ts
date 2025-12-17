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

        await db
            .prepare(
                `INSERT INTO orders (package_name, price, name, phone, email, company_name, message) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`
            )
            .bind(
                package_name,
                price,
                name,
                phone,
                email || null,
                companyName || null,
                message || null
            )
            .run();

        return NextResponse.json({
            success: true,
            message: "অর্ডার সফলভাবে গ্রহণ করা হয়েছে"
        });

    } catch (error) {
        console.error("Order submission error:", error);
        return NextResponse.json(
            { error: "অর্ডার সাবমিট করতে সমস্যা হয়েছে" },
            { status: 500 }
        );
    }
}
