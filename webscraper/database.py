from google.cloud import firestore
from flask_heroku import Heroku
import json
import os

class Database():
    def __init__(self, credentials_filepath='service_account.json', local=False):
        # download service account json and put it in credentials_filename
        # if local, running servers locally. Otherwise, hosted on Heroku/Github pages

        if not local:
            key = os.environ['GOOGLE_APPLICATION_CREDENTIALS']
            with open(credentials_filepath, 'w') as f:
                json.dump(json.loads(key, strict=False), f)
        self.db = firestore.Client.from_service_account_json(credentials_filepath)

    def getDocs(self):
        # Then query for documents
        users_ref = self.db.collection(u'data')
        docs = users_ref.get()
        for doc in docs:
            print(doc)
            break

        # for doc in docs:
        #     print(u'{} => {}'.format(doc.id, doc.to_dict()))

    def addDoc(self, name, academia=[], science_fiction=[], description=None, first_occurance=None, related_terms=None):
        def convertData(data):
            converted = {}
            for year,freq in data:
                converted[str(year)] = float(freq)
            return converted

        def createRelatedTerms(query):
            import re
            query = query.lower()
            terms = [query]
            words = list(filter(lambda x: len(x)>0, re.split('[^a-zA-Z]', query)))
            if len(words) > 1:
                for w in words:
                    terms.append(w)
            return terms

        if not description: description = ''
        if not first_occurance: first_occurance = ''
        if not related_terms: related_terms = createRelatedTerms(name)

        # Add a new document
        doc_ref = self.db.collection(u'data').document(name.lower())
        doc_ref.set({
            u'name': name,
            u'description': description,
            u'first_occurance': first_occurance,
            u'related_terms': related_terms,
            u'dates': [
                {
                    u'name': 'Academia',
                    u'data': convertData(academia)
                },
                {
                    u'name': 'Science Fiction',
                    u'data': convertData(science_fiction)
                }
            ]
        })

# Database().getDocs()
