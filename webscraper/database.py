from google.cloud import firestore

# download service account json and put it in directory "keys"
db = firestore.Client.from_service_account_json('keys/service_account.json')

def getDocs():
    # Then query for documents
    users_ref = db.collection(u'data')
    docs = users_ref.get()
    for doc in docs:
        print(doc)
        break

    # for doc in docs:
    #     print(u'{} => {}'.format(doc.id, doc.to_dict()))

def addDoc(name, academia=[], science_fiction=[], description=None, first_occurance=None, related_terms=None):
    def convertData(data):
        converted = {}
        for year,freq in data:
            converted[str(year)] = int(freq)
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
    doc_ref = db.collection(u'data').document(name.lower())
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

# getDocs()
