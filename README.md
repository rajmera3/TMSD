# Customer Delivery Documentation: Time Machine Space Dinosaur
##### Team 8326
Overview
## Release Notes
*Version 0.1.0*
New software features:
* Search functionality for terms
* Visualization for each term via line graph for science fiction and academia
* Definition and first usage date for each term
* Request a new term as user
* Admin page to approve new terms and add to database

Bug fixes: First version so no bug fixes

Known bugs and defects:
* No partial searching- must include the full word of the term to search for it
* Missing visualization for term’s frequency across genre i.e. how often a term appears in computer science journals
* Must reload admin page to see the new pending requests. Does not dynamically update.

## Install Guide
##### Running via website:
Pre-requisites: Modern browser (Chrome, Firefox, Safari, Edge) or IE9+
Run instructions: Access at https://rajmera3.github.io/TMSD/

##### Running locally:
Pre-requisites:
* Modern browser (Chrome, Firefox, Safari, Edge) or IE9+
* [Node](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/get-npm)
* [python3](https://www.python.org/downloads/)

Dependent libraries that must be installed: 
* Webscraper Python3 modules:
    * Beautiful Soup: [``pip3 install beautifulsoup4``](https://pypi.org/project/beautifulsoup4/)
    * Google Cloud Firestore: [``pip3 install google-cloud-firestore``](https://pypi.org/project/google-cloud-firestore/)
    * Requests: [``pip3 install requests``](http://docs.python-requests.org/en/master/)
    * Urllib: [``pip3 install urllib3``](https://urllib3.readthedocs.io/en/latest/)
    * Flask: [``pip3 install Flask``](https://pypi.org/project/Flask/)
    * Flask-Cors: [``pip3 install Flask-Cors``](https://pypi.org/project/Flask-Cors/)
    * Flask-Heroku: [``pip3 install flask-heroku``](https://pypi.org/project/flask-heroku/)

Download instructions: 
1. Download code from https://github.com/rajmera3/TMSD. To do this, open terminal (Mac/Linux) or Git Bash (Windows) and run the command
``git clone https://github.com/rajmera3/TMSD.git``

Build instructions: 
1. Go to the website directory and install the npm packages:
    * Mac/Linux
        * Open terminal at root directory
        * ``$ cd website``
        * ``$ npm install``
    * Windows
        * Open command prompt at root directory
        * ``> cd website``
        * ``> npm install``

Installation of actual application:
1. Download credentials file (service_account.json) to read/write from database
    * __You must have access to the Firebase console (Sign in with timemachinespacedino@gmail.com account). To request access, contact tgbates@gatech.edu.__
    * Go to [Firebase Admin SDK console](https://console.firebase.google.com/u/0/project/tmsd-577fd/settings/serviceaccounts/adminsdk)
    * Press "Generate new private key"
    * Rename the downloaded file to "service_account.json" and put inside "webscraper/" directory

Run instructions: 
1. Open two terminal/command prompt windows at root directory
2. Run flask app:
    * Mac/Linux:
        * ``$ python3 server.py y``
    * Windows:
        * ``> python3 server.py y``
3. Run website server
    * Mac/Linux:
        * ``$ cd website``
        * ``$ npm start``
    * Window:
        * ``> cd website``
        * ``> npm start``
4. The website should automatically open in your browser. If not, open the link to http://localhost:3000/

Troubleshooting: 
