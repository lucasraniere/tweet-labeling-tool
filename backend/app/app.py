import os
import sys
sys.path.append('../')
from lib import db_utils
from flask import Flask


os.chdir(os.path.dirname(os.path.realpath(__file__)))
DATA_PATH = '../../data/'

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello world!'

@app.route('/next', methods=['GET'])
def netx():
    return db_utils.get_next_id()

@app.route('/get_tweet/<int:id_>', methods=['GET'])
def get_tweet(id_):
    return db_utils.get_tweet(id_)


@app.route('/get_annotation/<int:id_>', methods=['GET'])
def get_anotation(id_):
    return db_utils.get_annotation(id_)
