export const  token = (new URLSearchParams(window.location.search)).get("jwt")
export const url = '/api/v1/'

// export const url =  'http://localhost:9090/api/v1/';
// export const  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNjgxODU3MjU0fQ.3ZTp72m25iBAugrXo53kYtcHUb1HoYJwYjf-w_owNDBGlFF-kOFDgbOqr9f6Lqb4jK29rPsRm06NCxaMK77mQQ'