export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE5ODc2ODg2fQ.CL0KzncNUTJLL4A-EoJ8RrqgBbseaqbNmlVzSP9dsi9sDW-T9L_j06lf1wjtimYL42fWCyGCYiCLJQD32zhkrA"  : new URLSearchParams(window.location.search).get("jwt");
