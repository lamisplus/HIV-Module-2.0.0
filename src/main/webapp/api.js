export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzMxNDk1NzY5fQ.L-HpFgnx_khTMKS7T15FwmNiFmveHPYvFVDKsxkWgJLw-h4pp41roMiZGygqRDnopQOZ2wiI5sjw0UvW3Xsu6Q"  : new URLSearchParams(window.location.search).get("jwt");
