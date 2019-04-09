import oed as dictionary
import brave_new_words as terms_source
import pubmed as academia
import google_ngram as science_fiction
import database
from utils import is_debug


# fill in missing dates between academia and sf with 0's
def preprocessWordFreq(academiaWordFreq, scienceFictionWordFreq):

    def filter_above_percentage_of_max_value(academiaWordFreq, scienceFictionWordFreq, percentage=1):
        max_value = max(max(x[1] for x in academiaWordFreq), max(x[1] for x in scienceFictionWordFreq))
        percentage = 1
        start_year = -1
        for wordFreq in [academiaWordFreq, scienceFictionWordFreq]:
            for i in range(len(wordFreq)):
                year, freq = wordFreq[i]
                if freq >= max_value * percentage / 100:
                    start_year = max(start_year, year)
                    break
        academiaWordFreq = list(filter(lambda x: x[0] >= start_year, academiaWordFreq))
        scienceFictionWordFreq = list(filter(lambda x: x[0] >= start_year, scienceFictionWordFreq))
        return academiaWordFreq, scienceFictionWordFreq

    def fill_zeros(academiaWordFreq, scienceFictionWordFreq):
        def insort(arr, elem):
            arr.append(elem)

        academiaSet = set([x[0] for x in academiaWordFreq])
        sfSet = set([x[0] for x in scienceFictionWordFreq])
        dates = academiaSet.copy()
        dates.update(sfSet)
        dates = sorted(list(dates))
        for d in dates:
            if d >= 2000:  # Google NGram may not have data up to this point
                break
            if d not in academiaSet:
                academiaWordFreq.append((d, 0))
            if d not in sfSet:
                scienceFictionWordFreq.append((d, 0))

        academiaWordFreq.sort(key=lambda x: x[0])
        scienceFictionWordFreq.sort(key=lambda x: x[0])

    academiaWordFreq, scienceFictionWordFreq = filter_above_percentage_of_max_value(academiaWordFreq, scienceFictionWordFreq, percentage=1)
    fill_zeros(academiaWordFreq, scienceFictionWordFreq)
    return academiaWordFreq, scienceFictionWordFreq

def addWord(word, definition='', percentages=False, start_date=''):
    if '/' in word:
        if is_debug(): print("Query cannot contain '/': {}".format(word))
        return None
    try:
        dictionaryResult = dictionary.searchWord(word)
        if dictionaryResult:
            dictionary_definition, start_date = dictionaryResult
            if not definition: definition = dictionary_definition
        else:
            if is_debug(): print("Could not get dictionary word: " + word)
    except Exception as e:
        if is_debug(): print("Cannot connect to dictionary. Error message: {}".format(e))

    academiaWordFreq = academia.get_frequency(word, percentages=percentages)
    if not academiaWordFreq:
        return None

    scienceFictionWordFreq = science_fiction.get_frequency(word, percentages=percentages)
    if not scienceFictionWordFreq:
        return None

    # fill in missing dates between academia and sf with 0's
    academiaWordFreq, scienceFictionWordFreq = preprocessWordFreq(academiaWordFreq, scienceFictionWordFreq)

    # add to firestore
    database.addDoc(word, academiaWordFreq, scienceFictionWordFreq, description=definition, first_occurance=start_date)

    return {
        "word": word,
        "definition": definition,
        "start date": start_date,
        "academia": academiaWordFreq,
        "science fiction": scienceFictionWordFreq,
    }

# def addSfEncyclopediaThemes():
#     with open('sfEncyclopediaAcademia.txt', 'w') as f:
#         for word in sfencyclopedia.getThemeWords():
#             output = addWord(word)
#             if not output:
#                 print('Error while adding word {}'.format(word))
#                 continue
#             print('Success! Added word: {}'.format(word))
#             f.write(output + '\n')

def addWordsFromTermsLoaded(filename='brave_new_words_output.txt', percentages=False):
    # add words from saved text of brave new words

    with open(filename, 'r') as f:
        lines = [line.strip() for line in f.readlines()]
        # start=False
        for i in range(0, len(lines) // 2):
            word = lines[2*i]
            definition = lines[2*i+1]
            # if not start and word == 'K/S':
            #     start=True
            # elif not start:
            #     continue
            print(word)
            output = addWord(word, definition=definition, percentages=percentages)
            if not output:
                print('Error while adding word {}'.format(word))
                print()
                continue
            print('Success! Added word: {}'.format(word))
            print()

def addWordsFromTermsLive(percentages=False):
    # THIS NEEDS A GEORGIA TECH WIFI TO ACCESS THE OXFORDREFERENCE
    # add words from a live version of brave new words

    termsDefs = terms_source.getWordsAndDefinition() # generator
    for wordDef in termsDefs:
        output = addWord(wordDef['word'], definition=wordDef['definition'], percentages=percentages)
        if not output:
            print('Error while adding word {}'.format(wordDef['word']))
            print()
            continue
        print('Success! Added word: {}'.format(wordDef['word']))
        print()

# addWordsFromTermsLoaded()

# addWord('Artificial Intelligence')
# addWord('Magnetism')
# addWord('Time travel')
# addSfEncyclopediaThemes()

# print(addWord('ai'))
# addWord('Alien')