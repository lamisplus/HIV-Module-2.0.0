export const  token = (new URLSearchParams(window.location.search)).get("jwt")
export const url = '/api/v1/'

// export const url =  'http://localhost:8383/api/v1/';
// export const  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNjgwODc1OTA0fQ.-4c8yKe6EHMJImBtr0OzfMFFfELJ-_A26fmhbzf-_-IlXpUAQP4uwEjF6-b1FJwZvBUNU8ADfQl1CY8lb_vGhQ'