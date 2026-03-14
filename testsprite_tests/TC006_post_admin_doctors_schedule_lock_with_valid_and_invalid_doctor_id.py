import requests
from datetime import datetime, timedelta

BASE_URL = "http://localhost:8000"
ADMIN_USERNAME = "admincdc@gmail.com"
ADMIN_PASSWORD = "admin123"
TIMEOUT = 30

def test_post_admin_doctors_schedule_lock_with_valid_and_invalid_doctor_id():
    # Step 1: Obtain admin token via login
    login_url = f"{BASE_URL}/login"
    login_payload = {
        "email": ADMIN_USERNAME,
        "password": ADMIN_PASSWORD
    }
    try:
        login_resp = requests.post(login_url, json=login_payload, timeout=TIMEOUT)
        assert login_resp.status_code == 200, f"Admin login failed with status {login_resp.status_code}"
        login_json = login_resp.json()
        assert "token" in login_json, "No token returned from login"
        token = login_json["token"]
    except Exception as e:
        raise AssertionError(f"Admin login request failed: {e}")

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    valid_doctor_id = 1

    now = datetime.now()
    start_iso = (now + timedelta(hours=1)).isoformat(timespec='seconds')
    end_iso = (now + timedelta(hours=2)).isoformat(timespec='seconds')
    lock_payload_valid = {
        "doctor_id": valid_doctor_id,
        "start": start_iso,
        "end": end_iso,
        "reason": "UnitTest lock schedule"
    }

    lock_url = f"{BASE_URL}/admin/doctors/schedule/lock"
    try:
        resp_valid = requests.post(lock_url, json=lock_payload_valid, headers=headers, timeout=TIMEOUT)
        assert resp_valid.status_code == 200, f"Expected 200 OK for valid doctor_id, got {resp_valid.status_code}"
        resp_json = resp_valid.json()
        assert "success" in resp_json or "message" in resp_json or resp_json, "No confirmation in response body"
    except Exception as e:
        raise AssertionError(f"POST lock schedule with valid doctor_id failed: {e}")

    invalid_doctor_id = 999999999
    lock_payload_invalid = {
        "doctor_id": invalid_doctor_id,
        "start": start_iso,
        "end": end_iso,
        "reason": "UnitTest invalid doctor_id"
    }
    try:
        resp_invalid = requests.post(lock_url, json=lock_payload_invalid, headers=headers, timeout=TIMEOUT)
        assert resp_invalid.status_code == 404, f"Expected 404 Not Found for invalid doctor_id, got {resp_invalid.status_code}"
    except Exception as e:
        raise AssertionError(f"POST lock schedule with invalid doctor_id failed: {e}")

test_post_admin_doctors_schedule_lock_with_valid_and_invalid_doctor_id()
