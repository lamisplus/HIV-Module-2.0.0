export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI5MDE5MTY1fQ.izDRZlRa45Xcq-G6ybIZpESkqm5Lu7lkE8scQkTaLl4WF-t0HXtN5lfxvFeuUMGL0QEM33CB_A6HG2aCwYyC3g"  : new URLSearchParams(window.location.search).get("jwt");
