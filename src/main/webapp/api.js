export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
?"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlY2V3c0FDRTUiLCJhdXRoIjoiU3VwZXIgQWRtaW4iLCJuYW1lIjoiRUNFV1MgQUNFNSIsImV4cCI6MTczMzE1NDU4MX0.f2rpTg1eIquX1idhulbwiyTBx-0pchrJoC3T3G2gp4WvCLrBSEnFEMcP_1Wju0DDbXm_q0kD1wxE7guQDzYjHA"  : new URLSearchParams(window.location.search).get("jwt");
