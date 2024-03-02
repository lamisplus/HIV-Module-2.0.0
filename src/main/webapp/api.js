export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA5NDAyNjI2fQ.aE224aCOUzYohmS2VVKDEJ1A7Fws2zd7M5EIPLB0--hQqaz75alFIcOSDAO2D59lxUXZ2t1HF5CskgTwxyymfA"
    : new URLSearchParams(window.location.search).get("jwt");
