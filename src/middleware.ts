export { withAuth } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith("/signin") || req.nextUrl.pathname.startsWith("/signup")

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
      }

      return null
    }
    //isAuth is a boolean that checks if the user is authenticated or not. 
    //isAuthPage checks if the user is on the signin or signup page. 
    //If the user is on the signin or signup page and is authenticated, they will be redirected to the dashboard. 
    //If the user is not authenticated, they will be redirected to the signin page.

    //from variable is the path that the user is trying to access.    
    //req.nextUrl.search is the query parameters of the URL.
    //if req.nextUrl.search exists is because if the user is trying to access the dashboard with a query parameter
    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }
  },
  {
    callbacks: {
      async authorized() {
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"],
}