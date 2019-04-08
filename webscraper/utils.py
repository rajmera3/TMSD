import requests
import time
import urllib
from bs4 import BeautifulSoup

# change this to receive more print statements about webscraper status
debug = False

def is_debug():
	return debug

def get(url, retries=10, timedelta=1, **kwargs):
	if url:
		resp = requests.get(url, **kwargs)

		num_retries = 0
		while resp.status_code != 200 and num_retries < retries:
			time.sleep(timedelta)
			resp = requests.get(url)
			num_retries += 1

		if resp.status_code == 200:
			return resp

		if is_debug(): print("Error while getting '{}': Status Code {}".format(url, resp.status_code))
	return None

def getSoup(url):
	resp = get(url)
	if resp:
		soup = BeautifulSoup(resp.content, 'html.parser')
		return soup

def urlEncode(s):
	return urllib.parse.quote_plus(s)