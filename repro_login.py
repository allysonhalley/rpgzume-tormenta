import requests

# Test 1: Invalid Login
url_login = "http://localhost:8081/api/auth/login"
headers = {"Content-Type": "application/json"}
data = {
    "email": "nonexistent@example.com",
    "password": "wrongpassword"
}

print("--- Test 1: Invalid Login ---")
try:
    response = requests.post(url_login, headers=headers, json=data)
    print(f"Status Code: {response.status_code}")
except Exception as e:
    print(f"Error: {e}")

# Test 2: Access Protected Resource without Token
url_cards = "http://localhost:8081/api/cards"
print("\n--- Test 2: /api/cards without Token ---")
try:
    response = requests.get(url_cards)
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        print("CRITICAL: Protected resource is ACCESSIBLE without token!")
    else:
        print("Protected resource is secure.")
except Exception as e:
    print(f"Error: {e}")
