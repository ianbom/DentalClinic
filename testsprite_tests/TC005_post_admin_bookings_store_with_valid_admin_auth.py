import requests

base_url = "http://localhost:8000"
timeout = 30

def test_post_admin_bookings_store_with_valid_admin_auth():
    login_url = f"{base_url}/login"
    bookings_url = f"{base_url}/admin/bookings/store"
    delete_booking_url_template = f"{base_url}/admin/bookings/{{}}/cancel"

    admin_credentials = {
        "email": "admincdc@gmail.com",
        "password": "admin123"
    }

    # Login as admin to get bearer token
    try:
        login_response = requests.post(
            login_url,
            json={
                "email": admin_credentials["email"],
                "password": admin_credentials["password"]
            },
            timeout=timeout
        )
        assert login_response.status_code == 200, f"Login failed: {login_response.text}"
        login_data = login_response.json()
        token = login_data.get("token")
        assert token, "No token found in login response"
    except Exception as e:
        raise AssertionError(f"Admin login request failed: {e}")

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    payload = {
        "patient": {
            "nik": "3201011234567890",
            "name": "Test Patient",
            "wa": "081234567890"
        },
        "doctor": "dr_smith_id",
        "service": "cleaning",
        "date": "2026-04-01",
        "slot": "09:00-10:00"
    }

    created_booking_id = None
    try:
        response = requests.post(bookings_url, json=payload, headers=headers, timeout=timeout)
        assert response.status_code == 201, f"Expected 201 Created but got {response.status_code}: {response.text}"

        resp_json = response.json()
        created_booking_id = resp_json.get("bookingId")
        booking_code = resp_json.get("booking_code") or resp_json.get("bookingCode")

        assert created_booking_id, "Response missing bookingId"
        assert booking_code, "Response missing booking code"
    finally:
        if created_booking_id:
            cancel_url = delete_booking_url_template.format(created_booking_id)
            try:
                cancel_response = requests.post(
                    cancel_url,
                    json={"reason": "Test cleanup"},
                    headers=headers,
                    timeout=timeout
                )
                if cancel_response.status_code not in [200, 409]:
                    raise AssertionError(f"Failed to cancel booking {created_booking_id}, status {cancel_response.status_code}: {cancel_response.text}")
            except Exception as e:
                print(f"Warning: Exception during cleanup cancel booking: {e}")

test_post_admin_bookings_store_with_valid_admin_auth()
