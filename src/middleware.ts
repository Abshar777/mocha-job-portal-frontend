import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Services } from './constants/services';
import axios, { AxiosError } from 'axios';
import { accessTokenActions } from './actions/middlewareActions';
import { conformPasswordAccessApi } from "./api/password"

const AuthRoutes = ['/auth/login', '/auth/register', '/auth/otp'];
const StaticRoutes = ["/home", '/about', "/contact", "/terms", "/privacy", "/faq", "/pricing", "/offline", "/test", "/auth/forgot-password"]

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('token')?.value;
  const refreshToken = request.cookies.get('__refreshToken')?.value;
  


  console.log(refreshToken, "🟢 refreshToken", pathname);

  if (StaticRoutes.includes(pathname) || pathname.startsWith("/api")) {
    console.log("🟢 its Static Route");
    return NextResponse.next()
  }

  if (pathname === "/auth/conform-password") {
    const resetToken = request.cookies.get('reset_session')?.value;
    console.log("🟢 its conform password route", resetToken);
    try{
      if(!resetToken){
        return NextResponse.redirect(new URL("/auth/login", request.url))
      }
      const { data } = await conformPasswordAccessApi(resetToken)
      console.log(data, "🟢 data");
      return NextResponse.next()
    } catch (err) {
      console.log((err as Error).message, "🔴 err");
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  if (AuthRoutes.includes(pathname) && !refreshToken) {
    console.log("🟠 its Auth route and no refresh token");
    return NextResponse.next();
  }


  // If no tokens present, redirect to login
  if (!accessToken && !refreshToken) {
    console.log("🟠 no tokens present, redirecting to login");
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    // First try with access token
    if (accessToken) {
      console.log("🟢 its access token", accessToken);
      return await accessTokenActions(request);
    }

    // If access token fails or doesn't exist, try refresh token
    if (refreshToken) {
      const { data } = await axios.post(`${API_URL}${Services.AUTH}/auth/token`, {
        refreshToken
      }, {
        withCredentials: true
      });
      console.log(data, "🟢 response refresh token");
      // Clone the response and set the new access token


      console.log("🟠 new response with new access token");
      if (data.token) {
        return await accessTokenActions(request, data.token);
      }

      console.log("🟠 setting new access token, and clone the responce");
      const newResponse = NextResponse.next();
      newResponse.cookies.set('token', data.token, {
        httpOnly: true,
        maxAge: 15 * 60, // 15 minutes
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === "production",
      });
      console.log("🟠 n");
      return newResponse;
      // why the new response is not working? instead new Responce , it is showing that page 
    }

    // If both tokens fail, redirect to login
    const newResponse = NextResponse.redirect(new URL('/auth/login', request.url));
    newResponse.cookies.delete('token');
    newResponse.cookies.delete('__refreshToken');
    console.log('🔴 Auth Middleware Fails On Both Tokens');
    return newResponse;

  } catch (error) {

    if (!(error as AxiosError).response) {
      return NextResponse.redirect(new URL('/404', request.url));
    }
    const newResponse = NextResponse.redirect(new URL('/auth/login', request.url));
    newResponse.cookies.delete('token');
    newResponse.cookies.delete('__refreshToken');
    console.log('🔴 Auth middleware error:', ((error as AxiosError).response?.data as { message: string }).message);
    return newResponse;




  }




}


// Configure which routes should be handled by this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};