import requests

BASE_URL = "http://localhost:8000"
TIMEOUT = 30

def test_post_register_with_new_patient_data():
    url = f"{BASE_URL}/register"
    headers = {
        "Content-Type": "application/json"
    }
    # Unique NIK to avoid conflict, generate a pseudo-random NIK
    import random
    nik_number = f"3201{random.randint(1000000000, 9999999999)}"[:16]
    payload = {
        "nik": nik_number,
        "name": "Test Patient",
        "wa": "081234567890"
    }

    response = None
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=TIMEOUT)
        assert response.status_code == 201, f"Expected status code 201 but got {response.status_code}"
        response_json = response.json()
        assert "id" in response_json, "Response JSON does not contain patient ID"
        assert isinstance(response_json["id"], (int, str)), "Patient ID should be int or str"
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

test_post_register_with_new_patient_data()