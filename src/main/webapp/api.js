
export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzExNjQ5NjAyfQ.FjDIo8pk3ec2nKA6LaiV3uTcewp-AzBnWAl2TXnULTfzkn058O_uBt0SeRYaWOgvFdPmvR6Fv-AgwnXz4cfgZQ"
    : new URLSearchParams(window.location.search).get("jwt");

