from flask import Flask
from flask import request
from flask import json as fjson
from flask_cors import CORS
import json
import sys
import webscraper

app = Flask(__name__)
CORS(app)

@app.route('/add', methods = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'])
def api_addTerms():
    if request.method == 'POST':
        terms = ""

        if request.headers['Content-Type'] == 'application/json':
            # expects json like so: 
            #   { 
            #       "new-terms" : ["laser", "orion"]
            #   }
            # make sure the content-type is application/json
            terms_raw = fjson.dumps(request.get_json())
            terms_dict = json.loads(terms_raw)
            
            terms = [t for t in terms_dict['new-terms']]
        
        print(terms)

        for t in terms:
            print("Adding: ", t)
            webscraper.addWord(t)

        return "Added Terms: " + ', '.join(terms) + "\n"
    else:
        return "Use POST to add new terms thanks! :D\n"

@app.route('/rerun', methods = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'])
def api_removeTerms():
    if request.method == 'POST':
        webscraper.addWordsFromTermsLoaded()

        return "Reran the scraper/Db updated! \n"
    else:
        return "Use POST to rerun the scraper! :D\n"

def errorMessage():
    return 'Invalid Arguments. Must be in form: python3 server.py <local=("y", "n")> <credentials_filepath>' \
           '\nExample: python3 server.py y keys/service_account.json'

if __name__ == '__main__':
    ws = None
    if len(sys.argv) == 1:
        # no optional arguments given
        ws = webscraper.Webscraper()
    elif len(sys.argv) == 2:
        # pass if server is running locally or not
        local_arg = sys.argv[1]
        if local_arg == 'y' or local_arg == 'yes':
            local = True
        elif local_arg == 'n' or local_arg == 'no':
            local = False
        else:
            sys.exit(errorMessage())
        ws = webscraper.Webscraper(local=local)
    elif len(sys.argv) == 3:
        # pass if server is running locally and certificates filepath
        local_arg = sys.argv[1]
        if local_arg == 'y' or local_arg == 'yes':
            local = True
        elif local_arg == 'n' or local_arg == 'no':
            local = False
        else:
            sys.exit(errorMessage())

        credentials_filepath = sys.argv[2]
        ws = webscraper.Webscraper(credentials_filepath=credentials_filepath, local=local)
    else:
        sys.exit(errorMessage())

    app.run()
