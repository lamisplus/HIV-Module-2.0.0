export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI0NzY4NjU4fQ.c3hLAbO7vjjuFR9I6AkSVdXt-cqPs9vfODujLYd4ij-HuaUJ_rObxvO46XC54-wBGACVRdu-yHMrjc6TiKVpCw"  : new URLSearchParams(window.location.search).get("jwt");
