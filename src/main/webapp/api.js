export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI0MjU2NjQ2fQ.mywbPD2dlyc_c3_5k8xDvTKg7d_vTpTu2GxfQ1G9QOt4257EBt28AniKX-c11mWiAQjvJGNH9RPNeE6QeRtWHg"  : new URLSearchParams(window.location.search).get("jwt");
