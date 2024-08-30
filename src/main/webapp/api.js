export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI1MDUyNjU2fQ.cX_63l3pL7qDXjK4loTgGRLJ4_heF7D79Ncb0Bg0lJ_xW9TQEnHkdrUnLe-UoHgkuziF3HDrsFkrrv2ND58x0Q"  : new URLSearchParams(window.location.search).get("jwt");
