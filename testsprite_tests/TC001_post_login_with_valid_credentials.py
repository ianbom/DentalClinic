import requests

BASE_URL = "http://localhost:8000"
LOGIN_ENDPOINT = "/login"
TIMEOUT = 30

def test_post_login_with_valid_credentials():
    url = BASE_URL + LOGIN_ENDPOINT
    headers = {
        "Content-Type": "application/json"
    }
    # Test admin credentials
    admin_payload = {
        "email": "admincdc@gmail.com",
        "password": "admin123"
    }
    try:
        response = requests.post(url, json=admin_payload, headers=headers, timeout=TIMEOUT)
    except requests.RequestException as e:
        assert False, f"Admin login request failed: {e}"
    assert response.status_code == 200, f"Expected 200 OK for admin login, got {response.status_code}"
    try:
        json_resp = response.json()
    except ValueError:
        assert False, "Admin login response is not valid JSON"
    assert "token" in json_resp or "access_token" in json_resp, "Admin login response missing JWT token"
    assert "role" in json_resp, "Admin login response missing user role"
    assert json_resp["role"].lower() == "admin", f"Expected role 'admin', but got {json_resp['role']}"

    # Test patient credentials
    # Since patient credentials are not provided, using admin credentials for patient test is not possible,
    # so we will only test admin credentials as per instructions.

test_post_login_with_valid_credentials()