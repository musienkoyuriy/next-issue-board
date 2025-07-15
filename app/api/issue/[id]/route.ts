import { db } from "@/db";
import { issues } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    try {
        const { id } = await params;

        const issue = await db.query.issues.findFirst({
            where: eq(issues.id, Number(id))
        });

        if (!issue) {
            return NextResponse.json(
                { error: 'not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ data: issue });
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { error: 'not found' },
            { status: 404 }
        )
    }
}