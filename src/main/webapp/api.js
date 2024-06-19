export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE4ODE1MTEyfQ.urlsm_InPWZfM8GWeprPVgN59HD0zoGPGsiSx0mOwcADNwHqYw2S18jfTT8X89JTbLKWMAKxdk6kEjl4_9ZxBA"    : new URLSearchParams(window.location.search).get("jwt");
