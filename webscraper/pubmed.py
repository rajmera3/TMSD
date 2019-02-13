import requests
import urllib
from bs4 import BeautifulSoup
from datetime import datetime

BASE_URL = 'https://www.ncbi.nlm.nih.gov'

def _urlEncode(s):
	return urllib.parse.quote_plus(s)

def _get(url):
    if url:
        resp = requests.get(url)
        if resp.status_code == 200:
            return resp
    # print("Error while getting '{}': Status Code {}".format(url, resp.status_code))
    return None

def _getSoup(url):
    resp = _get(url)
    if resp:
        soup = BeautifulSoup(resp.content, 'html.parser')
        return soup

def _getBlobId(query):
    resp = _get(_getSearchUrl(query))
    if not resp: return None
    text = resp.text
    if 'retrieved no results' in text:
        return None
    startIndex = text.find('blobid=')
    if startIndex == -1:
        print('Query ({}) cannot be retrieved because it has less than 500 results in Pubmed'.format(query))
        return None
    return text[startIndex + len('blobid='): text.find(':', startIndex)]

def _getSearchUrl(query):
    return BASE_URL + "/pubmed/?term={}".format(_urlEncode(query))

def _getWordFrequencyUrl(query):
    query = query.lower()
    bbid = _getBlobId(query)
    if not bbid: return None
    return BASE_URL + '/pubmed?p$l=Email&Mode=download&dlid=timeline&filename=timeline.csv&bbid={}'.format(bbid)
    # return BASE_URL + '/pubmed?p$l=Email&Mode=download&term={}&dlid=timeline&filename=timeline.csv&bbid=NCID_1_108958957_130.14.18.34_9001_1549998748_1881569056_0MetA0_S_MegaStore_F_1&p$debugoutput=off'.format(query)

def _getSearchDetail(query, startDate=None, endDate=None):
    query = query.lower()
    searchDetail = ""

    # search term
    searchDetailItems = []
    searchDetailItems.append('"{}"[MeSH Terms]'.format(query))
    foo = []
    for word in query.split(' '):
        foo.append('"{}"[All Fields]'.format(word))
    searchDetailItems.append('(' + ' AND '.join(foo) + ')')
    searchDetailItems.append('"{}"[All Fields]'.format(query))
    searchDetail = ' OR '.join(searchDetailItems)

    # time range
    if startDate and endDate:
        searchDetail = '({}) AND ("{}"[PDAT] : "{}"[PDAT])'.format(searchDetail, startDate.strftime('%Y/%m/%d'), endDate.strftime('%Y/%m/%d'))
    #("artificial intelligence"[MeSH Terms] OR ("artificial"[All Fields] AND "intelligence"[All Fields]) OR "artificial intelligence"[All Fields]) AND ("1900/01/01"[PDAT] : "2018/12/31"[PDAT])&cmd=DetailsSearch

    # searchDetail += '&cmd=DetailsSearch'
    return BASE_URL + '/pubmed/?term=' + _urlEncode(searchDetail) + '&cmd=DetailsSearch'

def getWordFrequency(query, include_2019=True):
    resp = _get(_getWordFrequencyUrl(query))
    if resp:
        lines = resp.text.strip().split('\n')[2:]
        lines.reverse()

        wordFrequency = []
        for line in lines:
            # print(line)
            year, freq = line.split(',')
            if not include_2019 and year =='2019': continue
            wordFrequency.append((int(year), int(freq)))
        # print(resp.text)
        return wordFrequency
    print('Could not access {} in Pubmed Database'.format(query))
    return None

# wordFreq = getWordFrequency('artificial intelligence')
# wordFreq = getWordFrequency('adventure')
# print(wordFreq)
# print(wordFreq)
# url = _getSearchUrl('artificial intelligence', datetime(2009, 1, 1), datetime(2009, 12, 31))

