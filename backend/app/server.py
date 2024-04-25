import os
import sys
sys.path.append('../')
from flask import Flask, jsonify, request
from flask_cors import CORS
from lib import db_utils


os.chdir(os.path.dirname(os.path.realpath(__file__)))
DATA_PATH = '../../data/'

app = Flask(__name__)
cors = CORS(app, origins=['http://localhost:3000'], supports_credentials=True)


@app.route('/')
def index():
    return 'Hello world!'


@app.route('/next', methods=['GET'])
def netx():
    return jsonify(db_utils.get_next_id())


@app.route('/get_tweet/<int:id_>', methods=['GET'])
def get_tweet(id_):
    return jsonify(db_utils.get_tweet(id_))


@app.route('/get_annotation/<int:id_>', methods=['GET'])
def get_anotation(id_):
    return jsonify(db_utils.get_annotation(id_))

@app.route('/annotate/<int:id_>', methods=['POST'])
def annotate(id_):
    # title = request.json['header']
    annotation = request.json['annotation']

    print(annotation)

if __name__ == '__main__':
    app.run(debug=True)
