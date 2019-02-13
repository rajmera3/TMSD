import oed
import sfencyclopedia
import pubmed as academia
# import web_of_science as academia

def graph(wordFreq):
    import matplotlib.pyplot as plt

    X = [x[0] for x in wordFreq]
    Y = [x[1] for x in wordFreq]
    plt.plot(X, Y)
    plt.show()

def addWord(word):
    output = []
    # print(word)
    output.append(word)
    try:
        oedResult = oed.searchWord(word)
        if oedResult:
            definition, start_date = oedResult
            # print(definition)
            output.append(definition)
            # print(start_date)
            output.append(start_date)
        else:
            definition = None
            start_date = None
            output.append('')
            output.append('')
    except Exception as e:
        print("Cannot connect to OED. Please make sure you are connected to Georgia Tech's wifi")

    academiaWordFreq = academia.getWordFrequency(word, include_2019=False)
    if academiaWordFreq:
        # print(academiaWordFreq)
        output.append(str(academiaWordFreq))
        # graph(academiaWordFreq)
    else:
        output.append('')

    if not output[1] and not output[3]: return None
    return '\n'.join(output)

# addWord('Artificial Intelligence')
# addWord('Magnetism')
# addWord('Deep Learning')
# addWord('Time travel')

with open('sfEncyclopediaAcademia.txt', 'w') as f:
    for word in sfencyclopedia.getThemeWords():
        output = addWord(word)
        if not output:
            print('Error while adding word {}'.format(word))
            continue
        print('Success! Added word: {}'.format(word))
        f.write(output + '\n')
