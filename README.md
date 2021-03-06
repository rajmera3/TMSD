# Customer Delivery Documentation: Time Machine Space Dinosaur
##### Team 8326
Time Machine Space Dinosaur (TMSD) is a tool contracted by Tobias Wilson-Bates, an LMC professor at the Georgia Institute of Technology. Interested in the bidirectional relationship between science fiction and academia, in the past, Professor Bates has asked for multiple projects to help understand when and where one influences the other - for example, science fiction inspiring titans of the industry.  The TMSD website, specifically, helps literary researchers and science fiction enthusiasts understand the relationship, either causal or correlational, between terms appearing in science fiction and in academia. In contrast to existing research aids, TMSD creates a dynamic, templated list of terms with graphs and sources to provide insightful and valid information.


Website built using [Swiftype App Search Demo](https://github.com/swiftype/app-search-demo-react)

Line graph built using [Chartkick](https://github.com/ankane/react-chartkick)

## Release Notes
*Version 0.1.0*

New software features:
* Search functionality for terms
* Visualization for each term via line graph for science fiction and academia
* Definition and first usage date for each term
* Request a new term as user
* Admin page to approve new terms and add to database

Bug fixes: First version so no bug fixes. Major issues that we have come across during development that we have fixed:
* Adding new terms to the database as an admin originally couldn't be done from the remote website as a Georgia Tech wifi was required to access the Pubmed and Oxford English Dictionary databases for the webscraper. Alternative ways of accessing the needed information were found that indirectly used the database, removing the dependency on GT wifi.
* We originally used [SF Encyclopedia](http://www.sf-encyclopedia.com/category/themes/theme) to determine the initial list of terms. However, the amount of terms and issue with getting the correct matching definition proved problematic, and so we switched over to using an online version of Brave New Words instead.

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
    * Automatically installs [npm](https://www.npmjs.com/get-npm)
* [python3](https://www.python.org/downloads/)

Dependent libraries that must be installed: 
* Webscraper Python3 modules:
    * Virtualenv: [``pip3 install virtualenv``](https://virtualenv.pypa.io/en/stable/installation/)
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
2. Go to webscraper directory and install required python3 modules (dependency libraries from above)
    * Mac/Linux
        * Open terminal at root directory
        * ``$ cd webscraper``
        * ``$ pip3 install --user virtualenv``
        * ``$ python3 -m virtualenv venv``
        * ``$ source venv/bin/activate``
        * ``$ pip3 install -r requirements.txt``
    * Windows
        * Open command prompt at root directory
        * ``> cd webscraper``
        * ``> pip3 install --user virtualenv``
        * ``> python3 -m virtualenv venv``
        * ``> .\venv\Scripts\activate``
        * ``> pip3 install -r requirements.txt``

Installation of actual application:
1. Download credentials file (service_account.json) to read/write from database
    * __You must have access to the Firebase console (Sign in with timemachinespacedino@gmail.com account). To request access, contact tgbates@gatech.edu.__
    * Go to [Firebase Admin SDK console](https://console.firebase.google.com/u/0/project/tmsd-577fd/settings/serviceaccounts/adminsdk)
    * Press "Generate new private key"
    * Rename the downloaded file to "service_account.json" and put inside "webscraper/" directory

Run instructions: 
1. Open two terminal/command prompt windows at root directory
2. Run flask app in the first window:
    * Mac/Linux:
        * ``$ cd webscraper``
        * ``$ source venv/bin/activate``
        * ``$ python3 server.py y``
    * Windows:
        * ``> cd webscraper``
        * ``> .\venv\Scripts\activate``
        * ``> python3 server.py y``
3. Run website server in the second window:
    * Mac/Linux:
        * ``$ cd website``
        * ``$ npm start``
    * Window:
        * ``> cd website``
        * ``> npm start``
4. The website should automatically open in your browser. If not, go to http://localhost:3000/

Troubleshooting: 
1. __Q: I am on Windows and I can't run the command "pip3".__
    You may not have installed Python3 correctly on your computer. Make sure to go to [this link](https://www.python.org/downloads/) and install using the recommended settings to download Python3 and pip3 as well as add them to your environmental path. More details can be found [here](https://vgkits.org/blog/pip3-windows-howto/)
2. __Q: I get a "ModuleNotFoundError" when running the flask app using python3.__
    You should have installed all the required modules in the "Build instructions" using a virtual environment. Make sure your terminal or command prompt has (venv) in front of it. If it doesn't, run ``source venv/bin/activate`` on Mac/Linux or ``.\venv\Scripts\activate`` on Windows.
3. __Q: I try to run ``python3 server.py y`` but get this error: FileNotFoundError: [Errno 2] No such file or directory: 'service_account.json'__
    Make sure you downloaded the credentials file, renamed it to "service_account.json", and put it in the correct location (webscraper folder) from the "Installation" section.
4. __Q: How do I download the service_account.json file?__
    You must download the credentials file from the [Firebase Admin SDK console](https://console.firebase.google.com/u/0/project/tmsd-577fd/settings/serviceaccounts/adminsdk). You can only click on this link if you are signing in from a preapproved account. The most convenient account that is already preapproved belongs to timemachinespacedino@gmail.com. When you are asked to sign in, log into this account using the password. The password must be requested from this project's client (tgbates@gatech.edu) as it was only provided to him.
5. __Q: How do I open terminal on Mac/Linux or command prompt on Windows?__
    * Mac: Open Applications folder, open Utilities, and double click on Terminal. Alternatively, press Command+Spacebar to launch Spotlight, type "Terminal", and double click the search result.
    * Linux: Shortcut is Ctrl+Alt+T
    * Windows: Open the Start Menu (Windows 10 and Windows 7) or the Start Screen (Windows 8.1), and press the shortcut for the Command Prompt. Alternatively, pres Win+R keys, type in "cmd", and press Enter or click OK.
6. __Q: How do I go to my root directory on terminal/command prompt?__
    You must navigate to where you downloaded the project i.e. Downloads folder. To do this, use the command ``cd foldername``. To see the current list of files and folders at your location, use ``ls`` on Mac/Linux or ``dir`` on Windows. 
7. __Q: I get the error "$: command not found"__
    In the instructions, do not include ``$ `` for Mac/Linux or ``> `` for Windows when you run the commands. This is simply to differentiate between the two operating systems.

