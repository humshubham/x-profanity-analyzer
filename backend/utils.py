import snscrape.modules.twitter as sntwitter
import pandas as pd
import json 
import string
from types import resolve_bases
from nltk.corpus import stopwords
from nltk import word_tokenize
from nltk.tokenize import RegexpTokenizer
from nltk.stem import WordNetLemmatizer
from nltk.stem.porter import PorterStemmer
import pandas as pd
 

LEMMATIZER = WordNetLemmatizer()
STEMMER = PorterStemmer()
TOKENIZER = RegexpTokenizer(r'\w+')

#read file containing racial slurs
def get_profane(file):
    profane=[]
    f=open(file,'r+')
    profanity = f.readlines()
    for each in profanity:
        profane.append(each.strip())
    return profane


#function to remove punctation marks()e.g ?,!, etc)
def remove_punctuation(text):
    no_punctuation = "".join([c for c in text if c not in string.punctuation])
    return no_punctuation

#function to remove stopwords like is, an, the, etc
def remove_stopwords(text):
    words = [w for w in text if w not in stopwords.words('english')]
    return words

#function for generating root form of the words
def word_lemmatizer(text):
    lem_text = [LEMMATIZER.lemmatize(word) for word in text]
    return lem_text

def word_stemmer(text):
    stem_text = " ".join([STEMMER.stem(i) for i in text])
    return stem_text

#Applying above functions to clean tweets
def clean_tweets(tweetInfo):
    tweetInfo['tweet'] = tweetInfo['tweet'].apply(lambda x: remove_punctuation(x))    
    tweetInfo['tweet'] = tweetInfo['tweet'].apply(lambda x: TOKENIZER.tokenize(x))    
    tweetInfo['tweet'] = tweetInfo['tweet'].apply(lambda x: remove_stopwords(x))    
    tweetInfo['tweet'] = tweetInfo['tweet'].apply(lambda x: word_lemmatizer(x))
    tweetInfo['tweet'] = tweetInfo['tweet'].apply(lambda x: word_stemmer(x))

    return tweetInfo

#calculating degree of profanity in each tweet
def calculate_degree(tweet, profane):
    if len(tweet) == 0:
        return 0
    degree_of_profanity = sum(1 for word in tweet if word in profane) / len(tweet)
    return degree_of_profanity

#generating final results
def calculate_profanity_degree(tweetInfo, cleaned_tweets, profane):
    profanity_df = pd.DataFrame()
    profanity_df['id'] = tweetInfo['date']
    profanity_df['username'] = tweetInfo['username']
    profanity_df['date'] = tweetInfo['date'].dt.strftime("%m/%d/%Y, %H:%M:%S")
    profanity_df['url'] = tweetInfo['url']
    profanity_df['rawTweet'] = tweetInfo['rawTweet']
    profanity_df['tweet'] = cleaned_tweets['tweet'].apply(lambda x: TOKENIZER.tokenize(x))
    profanity_df['likes'] = tweetInfo['likes']
    profanity_df['degree'] = profanity_df['tweet'].apply(lambda x: calculate_degree(x, profane))
    profanity_df.drop(columns=['tweet'], inplace=True)
    return profanity_df




def get_profile_tweets(username, count):
    # Created a list to append all tweet attributes(data)
    attributes_container = []

    # Using TwitterSearchScraper to scrape data and append tweets to list
    for i,tweet in enumerate(sntwitter.TwitterSearchScraper(f'from:{username}').get_items()):
        if i>=count:
            break
        attributes_container.append([tweet.username, tweet.date, tweet.likeCount, tweet.url, tweet.rawContent, tweet.rawContent])
        
    # Creating a dataframe from the tweets list above 
    tweets_df = pd.DataFrame(attributes_container, columns=["username", "date", "likes", "url", "rawTweet", "tweet"])

    return tweets_df.to_dict(orient="records")


def get_search_tweets(search_string, count):
    # Created a list to append all tweet attributes(data)
    attributes_container = []

    # Using TwitterSearchScraper to scrape data and append tweets to list
    for i,tweet in enumerate(sntwitter.TwitterSearchScraper(f'{search_string} since:2023-05-25 until:2023-05-27').get_items()):
        if i>=count:
            break
        attributes_container.append([tweet.username, tweet.date, tweet.likeCount, tweet.url, tweet.rawContent, tweet.rawContent])
        
    # Creating a dataframe from the tweets list above 
    tweets_df = pd.DataFrame(attributes_container, columns=["username", "date", "likes", "url", "rawTweet", "tweet"])

    return tweets_df.to_dict(orient="records")


def get_profanity_data(tweets):
    profane = get_profane('racial_slurs.txt')
    tweetInfo = pd.DataFrame(data=tweets)

    cleaned_tweets = clean_tweets(tweetInfo)

    result = pd.DataFrame()
    result = calculate_profanity_degree(tweetInfo, cleaned_tweets, profane)
    
    return result.to_json(orient='records')