import os
import requests

DATA_DIR = "ml_pipeline/data"
URLS = {
    "red": "https://archive.ics.uci.edu/ml/machine-learning-databases/wine-quality/winequality-red.csv",
    "white": "https://archive.ics.uci.edu/ml/machine-learning-databases/wine-quality/winequality-white.csv"
}

def download_file(url, filepath):
    response = requests.get(url)
    if response.status_code == 200:
        with open(filepath, 'wb') as f:
            f.write(response.content)
        print(f"Downloaded {filepath}")
    else:
        print(f"Failed to download {url}")

if __name__ == "__main__":
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
    
    for wine_type, url in URLS.items():
        filepath = os.path.join(DATA_DIR, f"winequality-{wine_type}.csv")
        download_file(url, filepath)
