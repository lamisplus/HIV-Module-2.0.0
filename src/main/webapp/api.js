export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE5OTQxNDg3fQ.FaXH3zqjJGoPev8bBSgb_1aFbdVRz4XFarFylgq_QGeAe6VeHP1-Ke4hmIhKJxTjCR2JQTrMrYcN5hR-iCQBaQ"  : new URLSearchParams(window.location.search).get("jwt");
