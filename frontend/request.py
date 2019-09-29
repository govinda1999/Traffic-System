import requests

url = 'http://localhost:5000/api/data/5d90d351f84ca21100af366f'

r = requests.get(
    url, data={'data': [6, 6, 6, 6], 'traffic_id': '5d90d351f84ca21100af366f'})
data = r.json()
print(data)
print(data['data'])
