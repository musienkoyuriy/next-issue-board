import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/api')) {
        const cookieStore = cookies()
        const authToken = (await cookieStore).get('auth_token');

        if (!authToken) {
            return NextResponse.json(
                { success: false, error: 'not authorized' },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*']
};
