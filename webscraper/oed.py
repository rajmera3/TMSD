import urllib
from utils import get, is_debug

def searchWord(word):
	# credentials
	app_id = 'b0691462'  # 'e8901f8f'
	app_key = 'e924ba24525f6c231fbfeba62ce965ca'  # 'b5b75721b3fa6328753ac38e0ca5ee8a'

	try:
		url = "https://oed-api.oxforddictionaries.com/oed/api/v0.1/words/?lemma={}".format(urllib.parse.quote(word))
		result = get(url, headers={'app_id': app_id, 'app_key': app_key}).json()
		word_result = result["data"][0]
		start_date = word_result["daterange"]["start"]
		definition = word_result["definition"]
		return definition, start_date
	except Exception as e:
		if is_debug(): print("Error searching OED for {}: {}".format(word, e))
		return None

# searchWord('artificial intelligence')
