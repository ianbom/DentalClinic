import requests
from requests.auth import HTTPBasicAuth

BASE_URL = "http://localhost:8000"
TIMEOUT = 30

def test_post_booking_create_with_valid_auth_and_data():
    # Step 1: Obtain admin token via /login using basic auth credentials
    login_url = f"{BASE_URL}/login"
    login_payload = {
        "email": "admincdc@gmail.com",
        "password": "admin123"
    }
    try:
        login_resp = requests.post(login_url, json=login_payload, timeout=TIMEOUT)
        assert login_resp.status_code == 200, f"Login failed with status: {login_resp.status_code}, response: {login_resp.text}"
        login_data = login_resp.json()
        token = login_data.get("token")
        assert token and isinstance(token, str), "Token missing or invalid in login response"
    except Exception as e:
        raise AssertionError(f"Exception during admin login: {e}")
    
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    
    # Prepare valid booking payload with doctor, service, date, slot, and patient data
    booking_url = f"{BASE_URL}/booking/create"
    # Example realistic payload (adjust as needed for the system)
    booking_payload = {
        "doctor": 1,
        "service": 1,
        "date": "2026-03-25",
        "slot": "10:00-10:30",
        "patient": {
            "nik": "3201234567890123",
            "name": "Budi Santoso",
            "wa": "081234567890"
        }
    }
    
    try:
        resp = requests.post(booking_url, headers=headers, json=booking_payload, timeout=TIMEOUT)
        assert resp.status_code == 201, f"Expected 201 Created, got {resp.status_code}, response: {resp.text}"
        
        resp_json = resp.json()
        assert "booking_code" in resp_json, "Response JSON missing booking_code"
        assert "status" in resp_json, "Response JSON missing status"
        assert resp_json["status"] in ["pending", "confirmed"], f"Booking status unexpected: {resp_json['status']}"
    except Exception as e:
        raise AssertionError(f"Exception during booking creation: {e}")

test_post_booking_create_with_valid_auth_and_data()