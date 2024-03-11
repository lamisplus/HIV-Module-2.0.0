export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA5OTI5MzA4fQ.Pdommzp3PVJottuuhhS_mlpQ62k-J8pQAkViK9dr9dr2gGEYp2RoG3a0Xd7oBn-3Ial7f7uwV8DTfZPemuXGUQ"
    : new URLSearchParams(window.location.search).get("jwt");
