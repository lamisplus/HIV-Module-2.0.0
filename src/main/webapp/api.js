export const  token = (new URLSearchParams(window.location.search)).get("jwt")
export const url = '/api/v1/'

// export const url =  'http://localhost:8789/api/v1/';
// export const  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNjkxNDA1MDUyfQ.dL37sFoG0uPMPOdEr9VAjhE78N1KFenBpvtMRMFXZ0OiVe-CCPzOhx_I7hgreICnZhqcUQlpLEsXr7lGu_ug3g';