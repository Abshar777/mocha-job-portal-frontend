import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Services } from './constants/services';
import { SetUser } from './store/auth/authSlice';
import store from './store/store';

// Define public routes that don't require authentication
const publicRoutes = ['/auth/login', '/auth/register', '/auth/otp'];
const API_URL = process.env.BACKEND_URL;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public routes without authentication
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Get tokens from cookies
  const accessToken = request.cookies.get('token')?.value;
  const refreshToken = request.cookies.get('__refreshToken')?.value;

  // If no tokens present, redirect to login
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    // First try with access token
    if (accessToken) {
      const response = await fetch(`${API_URL}${Services.AUTH}/auth/check`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        credentials: 'include'
      });
      console.log(response, "🟢 response acces tiken");

      if (response.ok) {
        const data = await response.json();
        console.log(data.data, "🟢 data");
        store.dispatch(SetUser(data.data))
        // If user is not verified, only allow access to verification page
        if (!data.data.verified && pathname !== '/auth/otp') {
          return NextResponse.redirect(new URL('/auth/otp', request.url));
        }
        
        return NextResponse.next();
      }
    }

    // If access token fails or doesn't exist, try refresh token
    if (refreshToken) {
      const response = await fetch(`${API_URL}/api/auth/token`, {
        method: 'POST',
        headers: {
          'Cookie': `__refreshToken=${refreshToken}`
        },
        credentials: 'include'
      });
      console.log(response, "🟢 response refresh token");


      if (response.ok) {
        const data = await response.json();
        
        // Clone the response and set the new access token
        const newResponse = NextResponse.next();
        newResponse.cookies.set('token', data.token, {
          httpOnly: true,
          maxAge: 15 * 60, // 15 minutes
          path: '/',
        });
        
        return newResponse;
      }
    }

    // If both tokens fail, redirect to login
    return NextResponse.redirect(new URL('/auth/login', request.url));

  } catch (error) {
    console.error('Auth middleware error:', error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
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