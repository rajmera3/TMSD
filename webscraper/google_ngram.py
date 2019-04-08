import requests
from utils import is_debug, get

def get_frequency(query, filter_one_percent=True, percentages=False):
    start_date = 1800
    end_date = 2019
    result = retrieve_absolute_percentage_counts(query, "english fiction", 0, start_date, end_date)
    if result is None:
        if is_debug(): print("Error: Could not get word frequency from Google NGram")
        return None
    counts, counts_percentages = result
    freq = list(zip(range(start_date, end_date), counts_percentages if percentages else counts))

    # delete the beginning dates that start with 0 frequency
    start_from = 0
    while counts[start_from] == 0:
        start_from += 1
    counts = counts[start_from:]
    freq = freq[start_from:]

    # start with first date that has at least 1% of max count
    if filter_one_percent:
        max_result = max(counts)
        i = 0
        while counts[i] < 0.01 * max_result:
            i += 1
        freq = freq[i:]
        counts = counts[i:]

    assert(len(freq) == len(counts))
    return freq

def getTotal(include_2019=True):
    year = 2019 if include_2019 else 2018
    return _load_total_counts("english fiction", year, year)[0]

# taken from http://stanford.edu/~risi/tutorials/absolute_ngram_counts.html
def retrieve_absolute_percentage_counts(token, corpus, smoothing, start_year, end_year):
    '''
    This function retrieves the absolute counts for a given token. 
    It first loads the relative frequencies from the ngram viewer and the absolute counts
    for the corpus from Google's source data.
    Then, it multiplies the absolute number of terms in the corpus for any given year with the 
    relative frequency of the search token.
    '''

    # dictionary maps from corpus name to corpus id
    corpora = {
        'english' : 15,
        'american english': 17,
        'british english': 18,
        'english fiction': 16,

        'chinese': 23,
        'french': 19,
        'german': 20,
        'hebrew': 24,
        'italian': 22,
        'russian': 25,
        'spanish': 21,
    }

    corpus_id = corpora[corpus]

    # Step 1: Load the frequency data from the ngram view

    token = token.replace(' ', '+')
    # construct the url, i.e. place the token and other parameters where they belong
    url = 'https://books.google.com/ngrams/interactive_chart?content={}&year_start={}&year_end={}' \
             '&corpus={}&smoothing={}'.format(token, start_year, end_year, corpus_id, smoothing)

    # Load the data from the page.
    page = get(url).text

    # Find the places in the html where the data starts and ends
    start = page.find('var data = ')
    end = page.find('];\n', start)

    # Extract the data dictionary
    result = page[start+12:end]
    if result == '': return None
    data = eval(result)
    frequencies = data['timeseries']

    # Step 2: load the total number of tokens per year from Google's source data
    total_counts = _load_total_counts(corpus_id, start_year, end_year)

    # Step 3: calculate the absolute number of appearances by multiplying the frequencies with the total
    #         number of tokens
    absolute_counts = [round(frequencies[i] * total_counts[i]) for i in range(len(frequencies))]

    return absolute_counts, [x*100 for x in frequencies]

def _load_total_counts(corpus_id, start_year, end_year):
    '''
    This function loads the total counts for a given corpus from Google's source data.
    '''

    # map from id to url
    id_to_url= {
    15: 'http://storage.googleapis.com/books/ngrams/books/googlebooks-eng-all-totalcounts-20120701.txt',
    17: 'http://storage.googleapis.com/books/ngrams/books/googlebooks-eng-us-all-totalcounts-20120701.txt',
    18: 'http://storage.googleapis.com/books/ngrams/books/googlebooks-eng-gb-all-totalcounts-20120701.txt',
    16: 'http://storage.googleapis.com/books/ngrams/books/googlebooks-eng-fiction-all-totalcounts-20120701.txt',
    23: 'http://storage.googleapis.com/books/ngrams/books/googlebooks-chi-sim-all-totalcounts-20120701.txt',
    19: 'http://storage.googleapis.com/books/ngrams/books/googlebooks-fre-all-totalcounts-20120701.txt',
    20: 'http://storage.googleapis.com/books/ngrams/books/googlebooks-ger-all-totalcounts-20120701.txt',
    24: 'http://storage.googleapis.com/books/ngrams/books/googlebooks-heb-all-totalcounts-20120701.txt',
    22: 'http://storage.googleapis.com/books/ngrams/books/googlebooks-ita-all-totalcounts-20120701.txt',
    25: 'http://storage.googleapis.com/books/ngrams/books/googlebooks-rus-all-totalcounts-20120701.txt',
    21: 'http://storage.googleapis.com/books/ngrams/books/googlebooks-spa-all-totalcounts-20120701.txt'
    }

    response = get(id_to_url[corpus_id]).text
    # response = urllib2.urlopen(urllib2.Request(id_to_url[corpus_id]))

    total_counts = []
    # data = next(csv.reader(response, delimiter="\t"))
    data = response.split("\t")
    for row in data:
        # first and last rows are empty, so a try...except is needed
        try:
            year, word_count, _, _ = row.split(',')
            if int(year) >= start_year and int(year) <= end_year:
                total_counts.append(int(word_count))

        except ValueError:
            pass

    return total_counts

# print(retrieve_absolute_counts("artificial intelligence", "english fiction", 0, 1800, 2019))
