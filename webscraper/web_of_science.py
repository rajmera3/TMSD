import requests
import urllib
from bs4 import BeautifulSoup

BASE_URL='http://apps.webofknowledge.com/'

def search(query):
    global BASE_URL

    with requests.Session() as session:
        cookies = {
            'dotmatics.elementalKey': 'SLsLWlMhrHnTjDerSrlG',
            '_abck': '2C4C2F2931388C4E7A006682A012C7094056CEAECC150000E4E4615C89F78168~0~DDbqPmJ27PGe/lDla521LcfoN03LrZ2+CVFKB7KpRLk=~-1~-1',
            'bm_sz': '73B23F06995B2B681B29221C1C6C1975~YAAQzc5WQL+BN85oAQAAMEYL4AJubaHcacmSptD/S8ZHejv6hhvwfLGQdE9/KI9G0tpjdZMDmhTkwfKgzxpo1Tu55421Lw6EHKruFtj/M+t9e/p2EIdhZFsvk2rZb3r2biGm35txh17rz3H1uMdILriqi94MSiEx1zTZRJRZL9K0T6EP9Qt3YSe9J6e9BJFYlOifjmOXVg==',
            'SID': '7BVIbyYqXqrsdrX1pYr',
            'CUSTOMER': 'Georgia Tech Library',
            'E_GROUP_NAME': 'Georgia Institute of Technology',
            'ak_bmsc': '8A3D57CC368EEA67D06A25BCCC020AD54056CECD857F0000B850625C0DD6591E~plUddsVElwQme5CgmXaHlB6+Qvq2ohMQXyS9Ck0yDlUgOLzmGrXmvCf8euFT5bREzTKua3+7CSuKmlA+eG4/AmJkyeoJUl6t8Rpj2LTzIJlog17PRdLvlSScoxL+oZWkyr4Lkg2ZJ2vNDxtx19BJz6uM01FUBFICe+i4gXrx01Z4mm5tWiuwrf6c/uq+0evzJ2nAWUFXLQBfHVykebJMKUcyYWtD5DmR4xFG/ceqy3aj7ZGZ26ADn27nNfdPTk9HSm',
            '_sp_ses.630e': '*',
            'JSESSIONID': 'AFBC0D87D4D4EE7FD137F22452E11AB6',
            'bm_sv': '723670841D1B9FDF16B88926FE13F5C5~EhZbF3XJw+sQxRUTbWM2sS6HvbBl9lvLnTqcEz42DfIXLzXpAFpc1YQop4sPgsHZLM9gYQeEwl8Uwh/wdDljHM5gAc/QkpRKmeIVzxz+60eS8oyPL80wtzyhBgLDV7LvH4GhQy3mK+87r7CCJ9qt3np81wTpoKMrLjLrz0lFp/U=',
            '_sp_id.630e': '626f5d0a-8758-4004-9403-6ae49a260bad.1549919463.3.1549948934.1549931947.cb8431a7-e2a5-493f-bfc3-4d07dfb26f57',
        }

        headers = {
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'Origin': 'http://apps.webofknowledge.com',
            'Upgrade-Insecure-Requests': '1',
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Referer': 'http://apps.webofknowledge.com/WOS_GeneralSearch_input.do?product=WOS&search_mode=GeneralSearch&SID=5EOiq7PC63JPl8SbbCb&preferencesSaved=',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9',
        }

        data = [
            ('fieldCount', '1'),
            ('action', 'search'),
            ('product', 'WOS'),
            ('search_mode', 'GeneralSearch'),
            ('SID', '7BVIbyYqXqrsdrX1pYr'),
            ('max_field_count', '25'),
            ('max_field_notice', 'Notice: You cannot add another field.'),
            ('input_invalid_notice', 'Search Error: Please enter a search term.'),
            ('exp_notice',
             'Search Error: Patent search term could be found in more than one family (unique patent number required for Expand option) '),
            ('input_invalid_notice_limits',
             ' <br/>Note: Fields displayed in scrolling boxes must be combined with at least one other search field.'),
            ('sa_params', 'WOS||5EOiq7PC63JPl8SbbCb|http://apps.webofknowledge.com|\''),
            ('formUpdated', 'true'),
            ('value(input1)', query),
            ('value(select1)', 'TS'),
            ('value(hidInput1)', ''),
            ('limitStatus', 'collapsed'),
            ('ss_lemmatization', 'On'),
            ('ss_spellchecking', 'Suggest'),
            ('SinceLastVisit_UTC', ''),
            ('SinceLastVisit_DATE', ''),
            ('period', 'Range Selection'),
            ('range', 'ALL'),
            ('startYear', '1900'),
            ('endYear', '2019'),
            ('editions', 'SCI'),
            ('editions', 'SSCI'),
            ('editions', 'AHCI'),
            ('editions', 'ISTP'),
            ('editions', 'ISSHP'),
            ('editions', 'BSCI'),
            ('editions', 'BHCI'),
            ('editions', 'ESCI'),
            ('editions', 'CCR'),
            ('editions', 'IC'),
            ('update_back2search_link_param', 'yes'),
            ('ssStatus', 'display:none'),
            ('ss_showsuggestions', 'ON'),
            ('ss_numDefaultGeneralSearchFields', '1'),
            ('ss_query_language', ''),
            ('rs_sort_by', 'PY.D;LD.D;SO.A;VL.D;PG.A;AU.A'),
        ]

        intermediateResponse = session.post(BASE_URL+'WOS_GeneralSearch.do', headers=headers, cookies=cookies,
                                 data=data)
        print("1. Received intermediate response")
        if intermediateResponse.history:
            # print(response.history[0].headers['Location'])
            location = intermediateResponse.history[0].headers['Location']
            url = BASE_URL + location
            searchResponse = session.get(url)
            print("2. Received search response")
            startIndex = searchResponse.text.find("qid=")
            qId = searchResponse.text[startIndex+4:searchResponse.text.find("&", startIndex)]
            print('qId =', qId)
            publicationResponse = session.get(BASE_URL+'RAMore.do?product=WOS&search_mode=GeneralSearch&qid={}&ra_mode=more&ra_name=PublicationYear&colName=WOS&viewType=raMore'.format(qId))
            print("3. Received publication response")
            print(publicationResponse.text)
            soup = BeautifulSoup(publicationResponse.text, 'html.parser')
            for td in soup.find_all(class_='refineItem'):
                print(td)

def getWordFrequency(query):
    from selenium import webdriver
    from selenium.webdriver.common.keys import Keys
    from selenium.webdriver.common.by import By
    from selenium.webdriver.chrome.options import Options
    from selenium.webdriver import DesiredCapabilities

    # chrome_options = Options()
    # chrome_options.headless = True
    # chrome_options.add_argument("--headless")
    chrome_options = Options()
    # chrome_options.headless = True
    # chrome_options.add_argument("--window-size=300x400")

    # capabilities = DesiredCapabilities.CHROME.copy()
    # capabilities['acceptSslCerts'] = True
    # capabilities['acceptInsecureCerts'] = True

    browser = webdriver.Chrome(options=chrome_options)#, desired_capabilities=capabilities)
    browser.set_page_load_timeout(15)
    print("trying")
    browser.get('https://apps.webofknowledge.com/')
    print("success")
    searchBox = browser.find_element_by_name('value(input1)')
    searchBox.send_keys(query + Keys.RETURN)

    # publicationButton = browser.find_element_by_id('PublicationYear_tr')
    # # print(publicationButton.get_attribute('class'))
    # publicationButton = publicationButton.find_elements(By.XPATH, '//div')[1]
    # print(publicationButton.find_elements(By.XPATH, '//a')[0].id)
    # # publicationButton.click()
    browser.find_element_by_name('PublicationYear').click()

    wordFreq = []
    for td in browser.find_elements(By.CLASS_NAME, 'refineItem'):
        text = td.get_attribute('innerText')
        year = text.split(' ')[0]
        freq = text.split(' ')[1][1:-1].replace(",", "")
        # print(year, ":", freq)
        wordFreq.append((int(year), int(freq)))
    browser.quit()
    return sorted(wordFreq, key=lambda x: x[0])

getWordFrequency('artificial intelligence')