export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE4ODc2NDUzfQ.4Pb-TgfcjkYD0NzyTrA2CoEq5fUQXFcFVT9-IHqprM8gdf0nDaH1OB2rHanu6G0w8CcIq5KpGOM4jaa1TmeM7g"    : new URLSearchParams(window.location.search).get("jwt");
