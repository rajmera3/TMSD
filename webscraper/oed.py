'''
Gets definition and start date from word via Oxford English Dictionary
'''
import requests
import urllib
from bs4 import BeautifulSoup

# Must have access to OED, either via eduroam or vpn through Gatech caampus wifi

def _get(url):
	resp = requests.get("http://www.oed.com" + url)
	if resp.status_code == 200:
		soup = BeautifulSoup(resp.content, 'html.parser')
		return soup
	print("Error while getting '{}': Status Code {}".format(url, resp.status_code))
	return None


def _urlEncode(s):
	return urllib.parse.quote_plus(s)

def _getWordSoup(word):
	# aka search term
	soup = _get("/search?q=" + _urlEncode(word))
	if soup.title.string == "Quick search results : Oxford English Dictionary":
		# get first result
		first_result_url = soup.find(id="resultItem1").find(class_="word").a.get("href")
		return _get(first_result_url)
	elif soup.title.string == "No Search Results : Oxford English Dictionary":
		return None
	else:
		# redirected directly to word
		return soup

def _getDefinition(soup):
	definition = soup.find(class_="senseWrap").div.h3
	if definition.span: definition.span.extract()
	return definition.text.strip()

def _getStartDate(soup):
	return soup.find(class_="senseWrap").div.find(class_="quotationDate").text.split("—")[0].replace("a", "Ante ").replace("c", "Circa ")

def searchWord(word):
	word = word.lower()
	soup = _getWordSoup(word)
	if not soup:
		# print('Could not find word ({}) in OED'.format(word))
		return None
	definition = _getDefinition(soup)
	start_date = _getStartDate(soup)
	return definition, start_date

def useApi(word):
	BASE_URL = 'https://od-api.oxforddictionaries.com/api/v1'
	import json
	app_id = 'e8901f8f'
	app_key = 'b5b75721b3fa6328753ac38e0ca5ee8a'
	language = 'en'
	word_id = 'Ace'

	url = BASE_URL + "/entries/" + language + '/' + word_id.lower()
	resp = _get(url)


# soup = _getWordSoup("intelligence")
# soup = _getWordSoup("artificial intelligence")
# if soup: print(soup.title.string)
# print(_getDefinition(soup))
# print(_getStartDate(soup))