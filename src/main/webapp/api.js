export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzIwMjcyODY4fQ.I56N7mHGZShNbrCxa8pPYVqXXerq4JA6M6EW7IIYVF_eEkhGtvSrcPJKPZogy2HELjrEb7qtSOwjNeQqFNzp4w"  : new URLSearchParams(window.location.search).get("jwt");
