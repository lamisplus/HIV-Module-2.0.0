export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI4NjMyMjQ4fQ.GWgVlE3bLTebhiQ0SDjDs_NfcylASm3dSOjDAJoZ0yI9vkDeCqkfaZtPoTJyCNXwdQ-Ak84ciic3ryIa_vycEQ"  : new URLSearchParams(window.location.search).get("jwt");
