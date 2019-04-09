import oed
# import sfencyclopedia as terms_source
import brave_new_words as terms_source
import pubmed as academia
import google_ngram as science_fiction
import database
# import web_of_science as academia


# fill in missing dates between academia and sf with 0's
def preprocessWordFreq(academiaWordFreq, scienceFictionWordFreq):
    def insort(arr, elem):
        arr.append(elem)
    academiaSet = set([x[0] for x in academiaWordFreq])
    sfSet = set([x[0] for x in scienceFictionWordFreq])
    dates = academiaSet.copy()
    dates.update(sfSet)
    dates = sorted(list(dates))
    for d in dates:
        if d >= 2000: # Google NGram may not have data up to this point
            break
        if d not in academiaSet:
            academiaWordFreq.append((d, 0))
        if d not in sfSet:
            scienceFictionWordFreq.append((d, 0))

    academiaWordFreq.sort(key = lambda x: x[0])
    scienceFictionWordFreq.sort(key = lambda x: x[0])

def graph(wordFreq):
    import matplotlib.pyplot as plt

    X = [x[0] for x in wordFreq]
    Y = [x[1] for x in wordFreq]
    plt.plot(X, Y)
    plt.show()

def addWord(word, definition=''):
    output = []
    # print(word)
    output.append(word)
    try:
        oedResult = oed.searchWord(word)
        if oedResult:
            oxford_definition, start_date = oedResult
            if not definition: definition = oxford_definition
            # print(definition)
            output.append(definition)
            # print(start_date)
            output.append(start_date)
        else:
            print("Could not get OED word: " + word)
            # definition = None
            # start_date = None
            # output.append('')
            # output.append('')
            # return None
            start_date = ''

    except Exception as e:
        print("Cannot connect to OED. Please make sure you are connected to Georgia Tech's wifi")
        definition = None
        start_date = None
        if len(output) == 1:
            output.append('')
            output.append('')
        return None

    academiaWordFreq = academia.getWordFrequency(word, include_2019=False)
    if not academiaWordFreq:
        return None

    scienceFictionWordFreq = science_fiction.getWordFrequency(word, include_2019=False)
    if not scienceFictionWordFreq:
        return None

    # fill in missing dates between academia and sf with 0's
    preprocessWordFreq(academiaWordFreq, scienceFictionWordFreq)

    output.append(str(academiaWordFreq))
    output.append(str(scienceFictionWordFreq))

    # if not output[1] or not output[3]: return None

    # add to firestore
    database.addDoc(word, academiaWordFreq, scienceFictionWordFreq, description=definition, first_occurance=start_date)

    return '\n'.join(output)

# def addSfEncyclopediaThemes():
#     with open('sfEncyclopediaAcademia.txt', 'w') as f:
#         for word in sfencyclopedia.getThemeWords():
#             output = addWord(word)
#             if not output:
#                 print('Error while adding word {}'.format(word))
#                 continue
#             print('Success! Added word: {}'.format(word))
#             f.write(output + '\n')

def addWordsFromTerms():
    # termsDefs = terms_source.getWords()
    termsDefs = terms_source.getWordsAndDefinition() # generator
    for wordDef in termsDefs:
        output = addWord(wordDef['word'], definition=wordDef['definition'])
        if not output:
            print('Error while adding word {}'.format(wordDef['word']))
            continue
        print('Success! Added word: {}'.format(wordDef['word']))

#addWordsFromTerms()

# addWord('Artificial Intelligence')
# addWord('Magnetism')
# addWord('Time travel')
# addSfEncyclopediaThemes()

# print(addWord('Artificial Intelligence'))
# addWord('Alien')