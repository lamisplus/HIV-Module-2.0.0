export const  token = (new URLSearchParams(window.location.search)).get("jwt")
export const url = '/api/v1/'
// export const url =  'http://localhost:9090/api/v1/';
// export const  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNjgyMTA1MjY4fQ.WnYBgWnlsTH0_41Pnxxz5Q50Ct0uZyF8-mF0d33qO375EAyA2pEuO6mxgOG0DsT_Gqhr2ie-JI2po1U65WIBig'