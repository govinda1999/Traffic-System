import request

url = 'http://localhost:5000/api/data/'

r = request.get(url)

print(r.json())