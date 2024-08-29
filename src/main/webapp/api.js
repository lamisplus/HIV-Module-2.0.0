export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI0ODU4NDU4fQ.3SafStrEJEmwUgpKUNfU14Y7q_zRr6D7cDNcOeW4ARBHkq_LAAZW3C4K_ED-AbgLfJtHP7YKZLrjDJF4azIRug"  : new URLSearchParams(window.location.search).get("jwt");
