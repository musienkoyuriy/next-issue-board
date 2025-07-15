import { db } from "@/db"
import { issues } from "@/db/schema";
import { getCurrentUser } from "@/lib/dal";
import { NextRequest, NextResponse } from "next/server"

export const GET = async () => {
    try {
        const allIssues = await db.query.issues.findMany()
        return NextResponse.json(allIssues);
    } catch (e) {
        console.log('error fetching issues', e)
        return NextResponse.json(
            { error: 'nah' },
            { status: 500 }
        );
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const user = await getCurrentUser();
        const data = await req.json();

        if (!data.userId || !data.title) {
            return NextResponse.json({ status: 400, statusText: 'id and title are required' });
        }

        const [newIssue] = await db
            .insert(issues)
            .values(data)
            .returning();

        return NextResponse.json(
            { message: 'issue created', issue: newIssue },
            { status: 201 }
        );
    } catch (e) {
        console.log('error creating n issue', e)
        return NextResponse.json({ status: 500, statusText: 'failed to create an issue' })
    }
}
