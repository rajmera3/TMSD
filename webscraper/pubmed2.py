import json
from utils import is_debug, get, urlEncode

def _get_total_count():
	url = "https://med-by-year.appspot.com/showbasecounts"
	data = json.loads(get(url).text)
	total_count = {}
	for year in data['counts']:
		total_count[int(year)] = int(data['counts'][year])
	return total_count


def _get_result_count(query):
	url = "https://med-by-year.appspot.com/search?q=" + urlEncode(query)
	result = get(url)
	import time
	while result is None:
		time.sleep(1)
		result = get(url)
	data = json.loads(result.text)
	result_count = {}
	if 'counts' not in data:
		if 'error' in data:
			if is_debug(): print('Error while getting {} from PubMed: {}'.format(query, data['error']))
		else:
			if is_debug(): print('Error while getting {} from PubMed'.format(query))
		return None
	for year in data['counts']:
		result_count[int(year)] = int(data['counts'][year])
	return result_count


def get_frequency(query, filter_one_percent=True, percentages=False):
	# returns percentage of PubMed citations this result appears
	result_count = _get_result_count(query)
	if result_count is None: return None
	total_count = _get_total_count()
	years = sorted([year for year in result_count])

	max_result = max([x for x in result_count.values()])
	if filter_one_percent:
		i = 0
		while result_count[years[i]] < 0.01 * max_result:
			i += 1
		# filter
		years = years[i:]

	if percentages:
		result_perc = [(year, 100 * result_count[year] / total_count[year]) for year in years]
		# print(result_perc)
		return result_perc
	else:
		result = [(year, result_count[year]) for year in years]
		return result

# get_percentage_frequency('artificial intelligence', filter_one_percent=True)
