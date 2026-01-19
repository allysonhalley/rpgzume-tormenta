import requests
import json
import base64
import sys

BASE_URL = "http://localhost:8081/api"
EMAIL = "test_char_flow@test.com"
PASSWORD = "password123"

def decode_jwt(token):
    try:
        header, payload, signature = token.split('.')
        decoded_payload = base64.urlsafe_b64decode(payload + "==").decode('utf-8')
        return json.loads(decoded_payload)
    except Exception as e:
        print(f"Error decoding JWT: {e}")
        return {}

def test_flow():
    session = requests.Session()

    # 1. Login or Register
    print(f"[-] Attempting login as {EMAIL}...")
    login_resp = session.post(f"{BASE_URL}/auth/login", json={"email": EMAIL, "password": PASSWORD})
    
    if login_resp.status_code == 401:
        print("[-] Login failed, registering...")
        reg_resp = session.post(f"{BASE_URL}/auth/register", json={"username": "TestUser", "email": EMAIL, "password": PASSWORD})
        if reg_resp.status_code != 200:
            print(f"[!] Registration failed: {reg_resp.text}")
            sys.exit(1)
        print("[+] Registered.")
        login_resp = session.post(f"{BASE_URL}/auth/login", json={"email": EMAIL, "password": PASSWORD})

    if login_resp.status_code != 200:
        print(f"[!] Login failed: {login_resp.text}")
        sys.exit(1)
    
    token = login_resp.json().get("accessToken")
    print("[+] Login successful.")

    # 2. Verify Token ID
    decoded = decode_jwt(token)
    user_id = decoded.get("id")
    print(f"[?] Token Claims: {decoded}")
    if not user_id:
        print("[!] CRITICAL: 'id' claim missing from Token!")
        sys.exit(1)
    print(f"[+] Verifed User ID in Token: {user_id}")

    headers = {"Authorization": f"Bearer {token}"}

    # 3. Get Metadata
    print("[-] Fetching Races...")
    races_resp = session.get(f"{BASE_URL}/racial-traits", headers=headers)
    races = races_resp.json()
    if not races:
        print("[!] No races found.")
        sys.exit(1)
    race_id = races[0]['id']
    print(f"[+] Found Race: {races[0]['name']} ({race_id})")

    print("[-] Fetching Classes...")
    classes_resp = session.get(f"{BASE_URL}/class-abilities", headers=headers)
    classes = classes_resp.json()
    if not classes:
        print("[!] No classes found.")
        sys.exit(1)
    class_id = classes[0]['id']
    print(f"[+] Found Class: {classes[0]['name']} ({class_id})")

    # 4. Create Character
    char_payload = {
        "name": "Automated Test Char",
        "raceId": race_id,
        "classId": class_id,
        "userId": user_id,
        "featureIds": [],
        "magicIds": []
    }
    print(f"[-] Creating Character: {char_payload}")
    create_resp = session.post(f"{BASE_URL}/characters", json=char_payload, headers=headers)
    
    if create_resp.status_code not in [200, 201]:
        print(f"[!] Creation failed: {create_resp.status_code} {create_resp.text}")
        sys.exit(1)
    print("[+] Character created.")

    # 5. Verify List
    print("[-] Verifying in List...")
    list_resp = session.get(f"{BASE_URL}/characters/user/{user_id}", headers=headers)
    chars = list_resp.json()
    
    found = False
    for c in chars:
        if c['name'] == "Automated Test Char":
            found = True
            print(f"[+] Found character in list: {c}")
            break
    
    if found:
        print("[SUCCESS] Full Character Flow Verified!")
    else:
        print("[!] Character created but not found in list.")
        sys.exit(1)

if __name__ == "__main__":
    test_flow()
