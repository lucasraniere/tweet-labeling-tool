'''
Database utility functions

This module contains functions to interact with the tweet and annotation
database.

Those functions include:
    Get the id for the next tweet to be annotated, in crescent order if there
    are any gaps within the ids

    Get the tweet for a given id

    Annotate the tweet for a given id

    Get the annotation for a given tweet id

    Generate a parquet file containing all the annotated tweets and its
    annotations
'''

import os
import sqlite3
import pandas as pd


os.chdir(os.path.dirname(os.path.realpath(__file__)))
DATA_PATH = '../../data/'
DB_PATH = os.path.join(DATA_PATH, 'tweets.db')


def get_next_id():
    '''
    Gets the next id of the tweet to be annotated.
    The next means the next id in the sequence of ids (in crescent order) that
    are not in the 'annotations' table.

    Returns:
        next_id (int): The next id of the tweet to be annotated
    '''
    with sqlite3.connect(DB_PATH) as con:
        cur = con.cursor()
        res = cur.execute('SELECT id FROM annotations ORDER BY id').fetchall()
        sorted_ids = [idx[0] for idx in res]
        next_id = 0
        for idx, bd_id in enumerate(sorted_ids, start=1):
            if bd_id != idx:
                next_id = idx
                break
        return {'id': next_id if next_id > 0 else 1}


def get_tweet(id_: int):
    '''
    Gets the tweet for the given ID

    Parameters:
        id_ (int): The id of the tweet to get

    Returns:
        A string with the tweet that has the given id
    '''
    with sqlite3.connect(DB_PATH) as con:
        cur = con.cursor()
        res = cur.execute(f'SELECT * FROM tweets WHERE id = {id_}').fetchone()
        return {"tweet": res[1]} if res else {"error": "Tweet not found"}


def annotate(id_: int, annotation: dict):
    '''
    Store the annotation of the tweet with the given id

    Parameters:
        id_ (int): The id of the tweet to be annotated
        annotation (dict): A dictionary with the annotation for the tweet
    '''
    with sqlite3.connect(DB_PATH) as con:
        cur = con.cursor()
        cur.execute(f'''
            INSERT INTO annotations VALUES ({id_}, {annotation["highlight"]},
            {annotation["not_good"]}, {annotation["polarized"]},
            {annotation["tweet_bias"]}, {annotation["toxic_language"]},
            "{annotation["toxic_language_txt"]}", {annotation["hate_speech"]},
            "{annotation["hate_speech_txt"]}", {annotation["emotive_language"]},
            "{annotation["emotive_language_txt"]}", {annotation["conspiracy"]},
            "{annotation["conspiracy_txt"]}", {annotation["dehumanization"]},
            "{annotation["dehumanization_txt"]}", {annotation["crime_imputation"]},
            "{annotation["crime_imputation_txt"]}",
            {annotation["divisive_language"]},
            "{annotation["divisive_language_txt"]}", {annotation["other"]},
            "{annotation["other_txt"]}")
            ''')
        con.commit()


def get_annotation(id_: int):
    '''
    Gets the annotation of a tweet

    Parameters:
        id_ (int): The id of the tweet to get the annotation from

    Returns:
        A dictionary with the annotation of the tweet with the given id
    '''
    with sqlite3.connect(DB_PATH) as con:
        cur = con.cursor()
        res = cur.execute(f'SELECT * FROM annotations WHERE id = {id_}').fetchall()
        if res:
            return {
                'id': id_,
                'highlight': res[0][1],
                'not_good': res[0][2],
                'polarized': res[0][3],
                'tweet_bias': res[0][4],
                'toxic_language': res[0][5],
                'toxic_language_txt': res[0][6],
                'hate_speech': res[0][7],
                'hate_speech_txt': res[0][8],
                'emotive_language': res[0][9],
                'emotive_language_txt': res[0][10],
                'conspiracy': res[0][11],
                'conspiracy_txt': res[0][12],
                'dehumanization': res[0][13],
                'dehumanization_txt': res[0][14],
                'crime_imputation': res[0][15],
                'crime_imputation_txt': res[0][16],
                'divisive_language': res[0][17],
                'divisive_language_txt': res[0][18],
                'other': res[0][19],
                'other_txt': res[0][20]
            }
        else:
            return {
                'id': id_,
                'highlight': 0,
                'not_good': 0,
                'polarized': 0,
                'tweet_bias': 99,
                'toxic_language': 0,
                'toxic_language_txt': "",
                'hate_speech': 0,
                'hate_speech_txt': "",
                'emotive_language': 0,
                'emotive_language_txt': "",
                'conspiracy': 0,
                'conspiracy_txt': "",
                'dehumanization': 0,
                'dehumanization_txt': "",
                'crime_imputation': 0,
                'crime_imputation_txt': "",
                'divisive_language': 0,
                'divisive_language_txt': "",
                'other': 0,
                'other_txt': ""
            }


def get_all_tweets():
    '''
    Gets all the tweets from the database

    Returns:
        A pandas DataFrame with all the tweets from the database
    '''
    with sqlite3.connect(DB_PATH) as con:
        cur = con.cursor()
        res = cur.execute('SELECT * FROM tweets').fetchall()
        return pd.DataFrame.from_records([{
            'id': row[0],
            'tweet': row[1]
        } for row in res])


def get_all_annotations():
    '''
    Gets all the annotations from the database

    Returns:
        A pandas DataFrame with all the annotations from the database
    '''
    with sqlite3.connect(DB_PATH) as con:
        cur = con.cursor()
        res = cur.execute('SELECT * FROM annotations').fetchall()
        return pd.DataFrame.from_records([{
            'id': row[0],
            'highlight': row[1],
            'not_good': row[2],
            'polarized': row[3],
            'tweet_bias': row[4],
            'toxic_language': row[5],
            'toxic_language_txt': row[6],
            'hate_speech': row[7],
            'hate_speech_txt': row[8],
            'emotive_language': row[9],
            'emotive_language_txt': row[10],
            'conspiracy': row[11],
            'conspiracy_txt': row[12],
            'dehumanization': row[13],
            'dehumanization_txt': row[14],
            'crime_imputation': row[15],
            'crime_imputation_txt': row[16],
            'divisive_language': row[17],
            'divisive_language_txt': row[18],
            'other': row[19],
            'other_txt': row[20]
        } for row in res])


def generate_file():
    '''
    Genereate a parquet file with all the annotated tweets

    Returns:
        A parquet file containing the pandas DataFrame with all the annotated
        tweets

    Output files:
        A parquet file containing the pandas DataFrame with all the annotated
        tweets
    '''

    db_df = get_all_tweets().merge(get_all_annotations(), how='inner', on='id')
    db_df.to_parquet(DATA_PATH + 'annotated_tweets.parquet', index=False)


def delete_annotation_data():
    '''
    Delete the annotations from the database
    '''
    with sqlite3.connect(DB_PATH) as con:
        cur = con.cursor()
        cur.execute('DELETE FROM annotations')
        con.commit()
