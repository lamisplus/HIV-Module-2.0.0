export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzM0NTMxOTYyfQ.aNsbFLdm9WOTjbPfyAbZm7lA-TTg9G8M9PmaSvg5VVpFShKRekiRvr4HfSSxumREU3Fhm5IZXQ6bCfJNAks-fQ"
    : new URLSearchParams(window.location.search).get("jwt");
