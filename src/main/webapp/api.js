export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8380/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlY2V3c0FDRTUiLCJhdXRoIjoiU3VwZXIgQWRtaW4iLCJuYW1lIjoiRUNFV1MgQUNFNSIsImV4cCI6MTczMzMwMjk5MX0.JxrQlgLCJaaa5Vg2J-HerWVlW7xjkRH-WPk5VpEDW2YzBtL41dxyvf9kcbWZ2nu51bSndMjHX4nr87zIRoH7MQ"
    : new URLSearchParams(window.location.search).get("jwt");
