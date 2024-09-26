export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI3MzQwNTMwfQ.z95Frziwn-sL-GFKXT3JqDozgqCiNbDqPLWshy5MwClZbNZQb7NM01LlyKfHB9AHVoCFEF-z-EHls2OYyH5puw"  : new URLSearchParams(window.location.search).get("jwt");
