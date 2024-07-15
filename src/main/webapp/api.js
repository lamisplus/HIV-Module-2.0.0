export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8380/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYWIiLCJhdXRoIjoiVXNlcixMYWIuIEFzc2lzdGFudCIsIm5hbWUiOiJTYW11ZWwgUGV0ZXIiLCJleHAiOjE3MjEwNzgwOTZ9.L45RXYmqYgN_kEA2CzxCQEtXkrp-2dUNuva5o61tPKqFYj3c-MAVxajF_ocn6PBB7Iiy8_23VFPaVu8sGFUrsg"
    : new URLSearchParams(window.location.search).get("jwt");
