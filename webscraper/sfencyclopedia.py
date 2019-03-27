import requests
import urllib
from bs4 import BeautifulSoup

def getWords():
    themeWords = []

    url = 'http://www.sf-encyclopedia.com/category/themes/theme'
    resp = requests.get(url)
    if resp.status_code == 200:
        soup = BeautifulSoup(resp.content, 'html.parser')
        for li in soup.find_all('li'):
            a = li.find('a')
            if '/entry/' in a['href']:
                themeWords.append(a.text.strip())
    return themeWords

# themeWords = getThemeWords()
# print(themeWords)