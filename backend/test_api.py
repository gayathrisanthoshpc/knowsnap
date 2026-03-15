import requests

# Test GET /items
try:
    response = requests.get('http://localhost:8000/items')
    print("GET /items response:", response.status_code, response.text)
except Exception as e:
    print("Error:", e)
