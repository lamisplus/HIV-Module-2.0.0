export const  token = (new URLSearchParams(window.location.search)).get("jwt")
export const url = '/api/v1/'

// export const url =  'http://localhost:8383/api/v1/';
// export const  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNjc5Nzg3NDIwfQ.uAhpDKMWFE43qRvnTiNCYkiX3KmWnUVY8kwLKJgZG_I_nHMsXljerZCMJNUg0TlZ3XcURIlzvfkagCYuiPNOcA'