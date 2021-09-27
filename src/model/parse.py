import json
import requests
import csv
import pandas as pd
from pandas.io.parsers import read_csv


CSV_URL = "https://gist.githubusercontent.com/keeranbz/a1f4537e3ca4b0d7542be7d4ddb87336/raw/asndata_1_.csv"
#df = pd.read_csv(CSV_URL)
#df.to_csv('ASNDATA.csv')



def fetch_csv_file():
     req_ =  requests.get(CSV_URL)
     url_content = req_.content
     asn_csv_file = open('ASNDATA.csv', 'wb')
     asn_csv_file.write(url_content)
     asn_csv_file.close()	

def read_asndata(csvPath):
    asn_data = {}

    with open(csvPath) as csvfile:
        read_asndata = csv.DictReader(csvfile)

        
        # Converts each row into a dictionary be primary key.
        for rows in read_asndata:
            key = rows['asnum']
            asn_data[key] = rows
    return asn_data

def convert_to_json(jsonPath):

    data = read_asndata('ASNDATA.csv')
    # Opens a json writer and dumps data into json format
    with open(jsonPath, 'w') as jsonfile:
        jsonfile.write(json.dumps(data, indent=4))

# Driver part of code
fetch_csv_file()
convert_to_json('asndata_.json') 

