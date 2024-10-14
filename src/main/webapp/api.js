export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI4OTI3NDA5fQ.jtdOjrl6Dxt0zR0oWUOIW4vjsgXbQlBcgny8DviA8RPHiY2w-_mqmXfP7sDwZcg4jCJcm7EP3WYMiGAP4QApxA"  : new URLSearchParams(window.location.search).get("jwt");
