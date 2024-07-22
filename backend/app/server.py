'''This module contains the server backend for the annotation tool.'''

import os
import sys
from flask import Flask, jsonify, request
from flask_cors import CORS
sys.path.append('../')
from lib import db_utils


os.chdir(os.path.dirname(os.path.realpath(__file__)))
DATA_PATH = '../../data/'

app = Flask(__name__)
cors = CORS(app, origins=['http://localhost:3000'], supports_credentials=True)


@app.route('/')
def index():
    '''Return a friendly 'Hello World' message.'''
    return 'Hello world!'


@app.route('/next', methods=['GET'])
def netx():
    '''Get the next id for the tweet to be annotated.'''
    return jsonify(db_utils.get_next_id())


@app.route('/get_tweet/<int:id_>', methods=['GET'])
def get_tweet(id_):
    '''Get the tweet for the given id.'''
    return jsonify(db_utils.get_tweet(id_))


@app.route('/get_annotation/<int:id_>', methods=['GET'])
def get_anotation(id_):
    '''Get the annotation for the given tweet id.'''
    return jsonify(db_utils.get_annotation(id_))


@app.route('/annotate/<int:id_>', methods=['POST'])
def annotate(id_):
    '''Annotate the tweet for a given id.'''
    annotation = request.json
    db_utils.annotate(id_, {
        "highlight": annotation["highlight"],
        "not_good": annotation["not_good"],
        "polarized": annotation["polarized"],
        "tweet_bias": annotation["tweet_bias"],
        "toxic_language": annotation["toxic_language"],
        "toxic_language_txt": annotation["toxic_language_txt"],
        "hate_speech": annotation["hate_speech"],
        "hate_speech_txt": annotation["hate_speech_txt"],
        "emotive_language": annotation["emotive_language"],
        "emotive_language_txt": annotation["emotive_language_txt"],
        "conspiracy": annotation["conspiracy"],
        "conspiracy_txt": annotation["conspiracy_txt"],
        "dehumanization": annotation["dehumanization"],
        "dehumanization_txt": annotation["dehumanization_txt"],
        "crime_imputation": annotation["crime_imputation"],
        "crime_imputation_txt": annotation["crime_imputation_txt"],
        "divisive_language": annotation["divisive_language"],
        "divisive_language_txt": annotation["divisive_language_txt"],
        "strong_bias": annotation["strong_bias"],
        "strong_bias_txt": annotation["strong_bias_txt"],
        "other": annotation["other"],
        "other_txt": annotation["other_txt"]
    })
    return f"Annotation from tweet {id_} stored"


@app.route('/export_parquet', methods=['GET'])
def export_parquet():
    '''Export the annotations to a parquet file.'''
    db_utils.generate_file()
    return "Parquet file exported"


@app.route('/delete_annotations', methods=['GET'])
def delete_annotations():
    '''Delete all the annotations.'''
    db_utils.delete_annotation_data()
    return "Annotations deleted"


@app.route('/get_startswith/<string:startswith>', methods=['GET'])
def get_startswith(startswith):
    '''Get the tweet ids that start with the given string.'''
    return jsonify(db_utils.get_tweet_startswith(startswith))


if __name__ == '__main__':
    app.run(debug=True)
