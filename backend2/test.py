import requests
import json


email="sukesssss1254a@gmail.com"
url = "http://localhost:10000/payment/"+email
print(url)
data = {
"name":"name",
"amount":10000,
"saving":1000,
"img":"localhost",
"month":4,
"year":2024,
"tag":"tag"
}
json_data = json.dumps(data)
headers = {'Content-Type': 'application/json'}
requests.post(url, data=json_data, headers=headers,verify=False)