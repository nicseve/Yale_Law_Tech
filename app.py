from flask import Flask, render_template
from lxml import html
import requests
import json
import pandas as pd

app = Flask(__name__)



def getData():
	# gets data from https://api.github.com/events"
	data = requests.get("https://api.github.com/events")

	# converts to json dictionary
	jsonified = data.json()

	push_events_ct = 0
	other_events_ct = 0

	for entry in jsonified:
		if entry.get('type') == 'PushEvent':
			push_events_ct += 1
		else:
			other_events_ct += 1

	return [push_events_ct, other_events_ct]

@app.route("/")
def main():
	return render_template('main.html', values = getData(), labels=["Push Events","Other Events"])

@app.route("/index")
def index():
	return 	"Hello World!"


@app.route('/dataset')    
def another_page():    
    table = pd.DataFrame.from_csv(r"okgo.csv",parse_dates=True, sep = ' ')
    return render_template("dataset.html", data=table.to_html())

if __name__ == "__main__":
	app.run(host='0.0.0.0', port=5000)