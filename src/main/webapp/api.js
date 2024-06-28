export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE5NjEwOTkyfQ.-hM_MuUUHRCcb8dK2dgyBU5WnjRRieKhnLDuBko1ts4V6twL9ijlKw88YDjXkiqqtx6uzQXyIM_Bee-k8szyCw"  : new URLSearchParams(window.location.search).get("jwt");
