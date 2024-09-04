export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI1NDkyMjQ0fQ.6hoSwG62Phew8vKzI55ztGfb9tjjFUIwU0Wx3zslPPd41pyFKv6v-zN9gbAEaQVU12Eqga4SNUcFzsSq7DxdbA"  : new URLSearchParams(window.location.search).get("jwt");
