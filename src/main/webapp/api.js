export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE4MzI0Mzg2fQ.JjVCBztrsYlSZGUfGG5B7eZmo7OsSO0THYZykNFGnGXD3Vinrj_DnE7-27Euv1JVQ-hvPaMLPzjYtTyh-ZES0Q"    : new URLSearchParams(window.location.search).get("jwt");
