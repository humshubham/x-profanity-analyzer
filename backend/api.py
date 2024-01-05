import json

from flask import Flask, request
from flask_cors import CORS
from utils import get_profanity_data, get_profile_tweets, get_search_tweets

app = Flask(__name__) #creating the Flask class object 
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

     
@app.route('/') #decorator drfines the   
def home():  
    return "api home";  

@app.route('/profile/<profile>') #decorator drfines the   

def profile(profile): 
    count = request.args.get('count', 1)
    count = int(count)
    count = count if count > 0 else 1
    tweets = get_profile_tweets(profile, count)
    if len(tweets) == 0:
        return json.dumps({'msg': 'no records found'})
    response = get_profanity_data(tweets)
    
    return response

@app.route('/search/') #decorator drfines the   

def search(): 
    keyword = request.args.get('q', '')
    count = request.args.get('count', 1)
    count = int(count)
    count = count if count > 0 else 1
    tweets = get_search_tweets(keyword, count)
    if len(tweets) == 0:
        return json.dumps({'msg': 'no records found'})
    response = get_profanity_data(tweets)
    
    return response


    
if __name__ =='__main__':  
    app.run(debug = True) 