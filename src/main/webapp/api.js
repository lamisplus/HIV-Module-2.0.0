export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzM0NDQ3Nzg4fQ.3NsaunArgrOYFHbiMsVOW4Rll_gXd5XXzHVa5qYY613GVleU6e4I8TK2NeqNPYBMfttRqT8cFqXvgE5TLaKyqA"
    : new URLSearchParams(window.location.search).get("jwt");
