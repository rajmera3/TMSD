import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDiY0fyje5FeDMqbsdEhAkHM52GHHPGM4o",
  authDomain: "tmsd-577fd.firebaseapp.com",
  databaseURL: "https://tmsd-577fd.firebaseio.com",
  storageBucket: "tmsd-577fd.appspot.com",
  projectId: "tmsd-577fd"
};
firebase.initializeApp(config);

class DatabaseClient {
  constructor() {
    this.collection = firebase.firestore().collection("data");
  }

  async getQueryMatches(query) {
    var queryMatches = [];

    query = query.toLowerCase();
    // let collection = firebase.firestore().collection("data");

    // search query in related words field
    let querySnapshot = await this.collection
      .where("related_terms", "array-contains", query)
      .get();

    querySnapshot.forEach(docSnapshot => {
      let doc = docSnapshot.data();
      if (doc.name.toLowerCase() == query) {
        // if name matches query, put first
        queryMatches.unshift(doc);
      } else {
        queryMatches.push(doc);
      }
    });

    return queryMatches;
  }

  async getAllTerms() {
    // returns list of strings (each string is a term)
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => doc.id);
  }

  createSnippet(raw, query) {
    var snippet = raw;
    var pattern = new RegExp(query, "gi");
    var matchesArr;
    while ((matchesArr = pattern.exec(raw)) !== null) {
      snippet = snippet.replace(
        matchesArr[0],
        "<em>" + matchesArr[0] + "</em>"
      );
    }
    // var snippet = raw.replace(query, "<em>" + query + "</em>");
    return snippet;
  }

  search(query, page, pageSize) {
    return this.getQueryMatches(query).then(queryMatches => {
      var results = [];
      queryMatches.forEach(result => {
        results.push({
          data: {
            name: {
              raw: result.name,
              snippet: this.createSnippet(result.name, query)
            },
            description: {
              snippet: this.createSnippet(result.description, query)
            }
          }
        });
      });

      let pageState = {
        info: {
          meta: {
            page: {
              current: page,
              size: pageSize,
              total_pages: Math.ceil(queryMatches.length / pageSize),
              total_results: queryMatches.length
            }
          }
        },
        results: results
      };
      return pageState;
    });
  }
}

let createDatabaseClient = () => {
  return new DatabaseClient();
};

export default createDatabaseClient;
