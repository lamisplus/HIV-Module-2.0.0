
export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzExNTg0OTg1fQ.UZsDFwcULYad1wCq-qKTA-KM9avh0VFGs0nIOUBIlv5-QSL62SKevaB1BgGHC3mIXrvfBMn1s2_T2_Mun3Iphw"
    : new URLSearchParams(window.location.search).get("jwt");

