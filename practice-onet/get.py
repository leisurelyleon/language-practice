import requests

def fetch_onet_data(onet_code);
    onet_url = f"https://services.onetcenter.org/ws/mnm/careers/{onet_code}/summary"
    response = requests.get(onet_url)
    if response.status_code == 200:
        return response.json()
    else:
        return None

if __name__ == "__main__":
    onet_code = "151131.00" # Example O*NET code for "Software Developers, Applications"
    onet_code = fetch_onet_data(onet_code)
    if onet_data:
        print(onet_data)
    else:
        print("Failed to fetch data from O*NET")