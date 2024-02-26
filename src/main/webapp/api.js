export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA4OTY1MDA4fQ.-n-Sl3haAPlPP6eQrxvwX6DNONsN25Hrk0iZJkro-uWey-q-kv1cL6fUpzpgJiaHqPXXsHTJCNJrvnD5wgZYjg"
    : new URLSearchParams(window.location.search).get("jwt");
