export const  token = (new URLSearchParams(window.location.search)).get("jwt")
export const url = '/api/v1/'

// export const url =  'http://localhost:8787/api/v1/';
// export const  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNjg3NDc0NTk4fQ.rLFOGR3BpfLu99lXlUsaeYiBRW8HXr9erBi0dVgJiAvnpuaPgDCpRckibRUvP8seauBPrV64Ex85aq1iFLvQyA';