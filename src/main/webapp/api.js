export const  token = (new URLSearchParams(window.location.search)).get("jwt")
export const url = '/api/v1/'

// export const url =  'http://localhost:8789/api/v1/';
// export const  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNjkyNjE1MDM5fQ.31Za29T-YZUI1_IV-XtPmSJSIN8TY8EQQxbdxSbaZYN1dUprIzRzF3Yro5CZ35qo1LNNYQnIVPQiuhQ2FD3dUA';