import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import surveyWidgets from "@@/public/data/about-pages.json";

export async function middleware(request: NextRequest) {
  const host = headers().get("host") || "";
  const url = request.nextUrl.clone();
  const subdomain = host.split(".")[0];
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/context") ||
    url.pathname.startsWith("/hooks") ||
    url.pathname.startsWith("/public") ||
    url.pathname.startsWith("/static") ||
    url.pathname.startsWith("/images") ||
    url.pathname.startsWith("/data") ||
    url.pathname.startsWith("/context") ||
    url.pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (
    subdomain == process.env.SUBDOMAIN_PARENTING ||
    subdomain == process.env.SUBDOMAIN_RELATIONSHIP
  ) {
    if (url.pathname === "/sitemap.xml" || url.pathname === "/robots.txt") {
      return NextResponse.next(); // Allow access without rewriting
    }

    if (subdomain == process.env.SUBDOMAIN_PARENTING) {
      url.pathname = `/parenting${url.pathname === "/" ? "" : url.pathname}`;
    } else if (subdomain == process.env.SUBDOMAIN_RELATIONSHIP) {
      if (url.pathname.endsWith("-blog")) {
        url.pathname = `/relationship/blogs${
          url.pathname === "/" ? "" : url.pathname
        }`;
      } else if (
        surveyWidgets.slice(1).some((page) => page.location === url.pathname)
      ) {
        url.pathname = `/relationship/widgets${
          url.pathname === "/" ? "" : url.pathname
        }`;
      } else {
        url.pathname = `/relationship${
          url.pathname === "/" ? "" : url.pathname
        }`;
      }
    }

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
