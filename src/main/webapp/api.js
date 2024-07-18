export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzIxMzIxNTc1fQ.EtCv1eNkudTT_D05e4QCL903HeVH-coup0KBl5x-cgxbBff85JuwXiOvgCiB1j6Hmvb1XLj65nGPbHBnUIKm4A"  : new URLSearchParams(window.location.search).get("jwt");
