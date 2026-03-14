import requests

BASE_URL = "http://localhost:8000"
AUTH_USERNAME = "admincdc@gmail.com"
AUTH_PASSWORD = "admin123"
TIMEOUT = 30

def test_get_check_booking_with_valid_and_invalid_codes():
    try:
        # Step 1: Authenticate as admin to create a booking (to get a valid booking code)
        login_resp = requests.post(
            f"{BASE_URL}/login",
            json={"email": AUTH_USERNAME, "password": AUTH_PASSWORD},
            timeout=TIMEOUT
        )
        assert login_resp.status_code == 200, f"Login failed with status {login_resp.status_code}"
        token = login_resp.json().get("token")
        assert token, "Login response missing token"

        headers_auth = {"Authorization": f"Bearer {token}"}

        # Step 2: Create a walk-in booking via admin to have a valid booking code
        # Flatten patient data as per PRD
        booking_payload = {
            "nik": "1234567890123456",
            "name": "Test Patient",
            "wa": "081234567890",
            "doctor": 1,  # assuming doctor with ID 1 exists for test
            "service": "general_checkup",
            "date": "2026-04-10",
            "slot": "09:00-10:00"
        }
        create_booking_resp = requests.post(
            f"{BASE_URL}/admin/bookings/store",
            headers=headers_auth,
            json=booking_payload,
            timeout=TIMEOUT
        )
        assert create_booking_resp.status_code == 201, f"Booking creation failed with status {create_booking_resp.status_code}"
        booking_data = create_booking_resp.json()
        booking_code = booking_data.get("code") or booking_data.get("booking_code")
        booking_id = booking_data.get("bookingId") or booking_data.get("booking_id")
        assert booking_code, "Booking creation response missing booking code"
        assert booking_id, "Booking creation response missing booking id"

        # Step 3: Test GET /check-booking with valid booking code - expect 200 with booking details
        valid_resp = requests.get(f"{BASE_URL}/check-booking", params={"code": booking_code}, timeout=TIMEOUT)
        assert valid_resp.status_code == 200, f"GET /check-booking with valid code failed with status {valid_resp.status_code}"
        valid_json = valid_resp.json()
        assert "status" in valid_json, "Booking details missing 'status'"
        assert "tanggal" in valid_json, "Booking details missing 'tanggal'"
        assert "jam" in valid_json, "Booking details missing 'jam'"
        assert "dokter" in valid_json, "Booking details missing 'dokter'"
        assert "pasien" in valid_json, "Booking details missing 'pasien'"

        # Step 4: Test GET /check-booking with invalid booking code - expect 404 Not Found
        invalid_code = "INVALID12345CODE"
        invalid_resp = requests.get(f"{BASE_URL}/check-booking", params={"code": invalid_code}, timeout=TIMEOUT)
        assert invalid_resp.status_code == 404, f"GET /check-booking with invalid code did not return 404 but {invalid_resp.status_code}"

    finally:
        # Cleanup: delete the created booking to avoid test pollution
        if 'token' in locals() and 'booking_id' in locals():
            headers_auth = {"Authorization": f"Bearer {token}"}
            # Assuming DELETE /admin/bookings/{booking_id} is supported to delete bookings
            # PRD does not specify delete endpoint; if not available, we skip deletion
            delete_resp = requests.delete(f"{BASE_URL}/admin/bookings/{booking_id}", headers=headers_auth, timeout=TIMEOUT)
            if delete_resp.status_code not in [200, 204, 404]:
                raise Exception(f"Failed to delete booking {booking_id} after test, status code: {delete_resp.status_code}")

test_get_check_booking_with_valid_and_invalid_codes()
