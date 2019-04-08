import requests
import json
import urllib

# credentials
app_id = 'b0691462' #'e8901f8f'
app_key = 'e924ba24525f6c231fbfeba62ce965ca' #'b5b75721b3fa6328753ac38e0ca5ee8a'

# language = 'en'
# def _get_word_id(word):
# 	url = 'https://od-api.oxforddictionaries.com:443/api/v1/search/' + language + '?q=' + _urlEncode(word.lower()) + '&prefix=false'
#
# 	r = requests.get(url, headers={'app_id': app_id, 'app_key': app_key})
#
# 	if r.status_code != 200 or len(r.json()["results"]) <= 0:
# 		print("Error searching OED for {} via search".format(word))
# 		return None
#
# 	result = r.json()
# 	word_id = result["results"][0]["id"]
# 	return word_id
#
# def searchWord(word):
# 	# word_id = word
# 	word_id = _get_word_id(word)
# 	if word_id is None: return None
# 	url = 'https://od-api.oxforddictionaries.com:443/api/v1/entries/' + language + '/' + word_id.lower()
#
# 	r = requests.get(url, headers={'app_id': app_id, 'app_key': app_key})
#
# 	if r.status_code != 200 or len(r.json()["results"]) <= 0:
# 		print("Error searching OED for {} via entries".format(word))
# 		return None
#
# 	result = r.json()
# 	print(result)
# 	definition = result["results"][0]["lexicalEntries"][0]["entries"][0]["senses"][0]["definitions"][0]
# 	print(definition)

def searchWord(word):
	try:
		url = "https://oed-api.oxforddictionaries.com/oed/api/v0.1/words/?lemma={}".format(urllib.parse.quote(word))
		r = requests.get(url, headers={'app_id': app_id, 'app_key': app_key})
		if r.status_code != 200:
			print("Error searching OED for {} via words".format(word))
		word_result = r.json()["data"][0]
		start_date = word_result["daterange"]["start"]
		definition = word_result["definition"]
		return definition, start_date
	except Exception as e:
		print("Error searching OED for {}: {}".format(word, e))
		return None

# searchWord('artificial intelligence')
# word = 'artificial intelligence'
# print(urllib.parse.quote(word))