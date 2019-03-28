import requests
import urllib
from bs4 import BeautifulSoup
import string

# generator
def getWordsAndDefinition():
	# words = []
	base_url = "http://www.oxfordreference.com/view/10.1093/acref/9780195305678.001.0001/acref-9780195305678-e-"

	for i in range(0, 886):
		if i==342: continue # K/S which is invalid due to Firebase setup
		print(i)
		url = base_url + str(i)
		# words.append(_get_word(url))
		word = _get_word(url)
		if word:
			yield word
	# return words

def _get(url):
    if url:
        resp = requests.get(url)
        if resp.status_code == 200:
            return resp
    # print("Error while getting '{}': Status Code {}".format(url, resp.status_code))
    return None

def _get_word(url):
	try:
		resp = _get(url)
		if not resp:
			print("Error while getting term information from: " + url)
			quit()
		soup = BeautifulSoup(resp.content, 'html.parser')
		word = soup.find('span', class_='oxencycl-headword').text

		definition = soup.find('div', class_='div1').find('p').get_text().strip()
		definition = definition.lstrip(string.digits).rstrip(string.digits).strip()

		print("{}: {}".format(word, definition))
		return {
			"word": word,
			"definition": definition
		}
	except Exception as e:
		print("Error while getting word from brave new words: " + url)
		return None


# print(_get_word("http://www.oxfordreference.com/view/10.1093/acref/9780195305678.001.0001/acref-9780195305678-e-1"))