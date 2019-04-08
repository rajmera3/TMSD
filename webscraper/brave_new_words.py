from bs4 import BeautifulSoup
import string
from utils import get

# generator
def getWordsAndDefinition():
	base_url = "http://www.oxfordreference.com/view/10.1093/acref/9780195305678.001.0001/acref-9780195305678-e-"

	for i in range(438, 886):
		url = base_url + str(i)
		word_def = _get_word_def(url) # dict of word and definition
		if word_def:
			yield word_def

def _get_word_def(url):
	try:
		resp = get(url)
		if not resp:
			print("Error while getting term information from: " + url)
			quit()
		soup = BeautifulSoup(resp.content, 'html.parser')
		word = soup.find('span', class_='oxencycl-headword').text

		definition = soup.find('div', class_='div1').find('p').get_text().strip()
		definition = definition.lstrip(string.digits).rstrip(string.digits).strip()

		print("{}\n{}".format(word, definition))
		return {
			"word": word,
			"definition": definition
		}
	except Exception as e:
		print("Error while getting word from brave new words: " + url)
		return None


# print(_get_word_def("http://www.oxfordreference.com/view/10.1093/acref/9780195305678.001.0001/acref-9780195305678-e-1"))

# generate text of all brave new words
# with open('brave_new_words_output.txt', 'a') as f:
# 	termsDefs = getWordsAndDefinition()
# 	for wordDef in termsDefs:
# 		f.write(wordDef['word'] + '\n')
# 		f.write(wordDef['definition'] + '\n')