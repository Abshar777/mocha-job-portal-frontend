import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Services } from '../constants/apiServices';
import { TUser } from "@/store/auth/type";


const AuthRoutes = ['/auth/login', '/auth/register', '/auth/otp'];
// const StaticRoutes = ["/home", '/about', "/contact", "/terms", "/privacy", "/faq", "/pricing","/offline","/test","/auth/forgot-password","/auth/conform-password"]
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const accessTokenActions = async (request: NextRequest, token?: string) => {

    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get('token')?.value || token;
    // console.log(accessToken, "🟢 access token")
    const response = await fetch(`${API_URL}${Services.AUTH}/auth/check`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        credentials: 'include'
    });
    const data = await response.json();


    // console.log("🟢 response access token is 200");

    const user = data.data as TUser;

    // If user is not verified, only allow access to verification page
    if (!user.verified && pathname !== '/auth/otp') {
        console.log("🟠 user is not verified, redirecting to otp");
        const newResponse = NextResponse.redirect(new URL('/auth/otp', request.url));
        newResponse.cookies.delete('token');
        newResponse.cookies.delete('__refreshToken');
        return newResponse;
    }

    // if user is verified and Auth route, redirect to home
    if (user.verified && AuthRoutes.includes(pathname)) {
        console.log("🟠 user is verified and Auth route, redirecting to home");
        return NextResponse.redirect(new URL('/', request.url));

    }

    if (!user.role && !pathname.startsWith("/details")) {
        console.log("🟠 user is verified and Auth route,he is not assigned to any role, so redirecting to role");
        return NextResponse.redirect(new URL('/details/', request.url));
    }




    // if user is verified and not Auth route, allow access to protected routes
    console.log("🟠 user is verified, allowing access to protected routes");
    return NextResponse.next();


}
