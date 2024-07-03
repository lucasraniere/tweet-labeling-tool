import os
import sqlite3
import pandas as pd
import db_utils as db

os.chdir(os.path.dirname(os.path.realpath(__file__)))
DATA_PATH = '../../data/'
DB_PATH = os.path.join(DATA_PATH, 'tweets.db')
TWEETS_PATH = os.path.join(DATA_PATH, 'filtered_n_ordered_tweets.parquet')
ANNOTATIONS_PATH = os.path.join(DATA_PATH, 'annotated_tweets.parquet')

def create_table_tweets():
    '''
    Creates the 'tweets' table in the database
    '''
    with sqlite3.connect(DB_PATH) as con:
        cur = con.cursor()
        cur.execute('''CREATE TABLE IF NOT EXISTS tweets (
            id INTEGER PRIMARY KEY,
            tweet TEXT NOT NULL
        )''')
        con.commit()


def create_table_annotations():
    '''
    Creates the 'annotations' table in the database
    '''
    with sqlite3.connect(DB_PATH) as con:
        cur = con.cursor()
        cur.execute('''CREATE TABLE IF NOT EXISTS annotations (
            id INTEGER PRIMARY KEY,
            highlight INTEGER NOT NULL,
            notGood INTEGER NOT NULL,
            polarizedClassification INTEGER NOT NULL,
            tweetBias INTEGER NOT NULL,
            toxicLanguage INTEGER,
            toxicLanguageText TEXT,
            hateSpeech INTEGER,
            hateSpeechText TEXT,
            emotiveLanguage INTEGER,
            emotiveLanguageText TEXT,
            conspiracyTheory INTEGER,
            conspiracyTheoryText TEXT,
            dehumanization INTEGER,
            dehumanizationText TEXT,
            crimeImputation INTEGER,
            crimeImputationText TEXT,
            divisiveLanguage INTEGER,
            divisiveLanguageText TEXT,
            other INTEGER,
            otherText TEXT,
            strongBias INTEGER,
            strongBiasText TEXT
        )''')
        con.commit()


def populate_tweets():
    tweets = pd.read_parquet(TWEETS_PATH)
    with sqlite3.connect(DB_PATH) as con:
        tweets.to_sql('tweets', con, if_exists='replace', index=False)


def populate_annotations():
    annotations = pd.read_parquet(ANNOTATIONS_PATH)
    for _, row in annotations.iterrows():
        annotation = {
            'highlight': row['highlight'],
            'not_good': row['not_good'],
            'polarized': row['polarized'],
            'tweet_bias': row['tweet_bias'],
            'toxic_language': row['toxic_language'],
            'toxic_language_txt': row['toxic_language_txt'].replace('"','""').replace("'", "''"),
            'hate_speech': row['hate_speech'],
            'hate_speech_txt': row['hate_speech_txt'].replace('"','""').replace("'", "''"),
            'emotive_language': row['emotive_language'],
            'emotive_language_txt': row['emotive_language_txt'].replace('"','""').replace("'", "''"),
            'conspiracy': row['conspiracy'],
            'conspiracy_txt': row['conspiracy_txt'].replace('"','""').replace("'", "''"),
            'dehumanization': row['dehumanization'],
            'dehumanization_txt': row['dehumanization_txt'].replace('"','""').replace("'", "''"),
            'crime_imputation': row['crime_imputation'],
            'crime_imputation_txt': row['crime_imputation_txt'].replace('"','""').replace("'", "''"),
            'divisive_language': row['divisive_language'],
            'divisive_language_txt': row['divisive_language_txt'].replace('"','""').replace("'", "''"),
            'other': row['other'],
            'other_txt': row['other_txt'].replace('"','""').replace("'", "''"),
            'strong_bias': row['strong_bias'],
            'strong_bias_txt': row['strong_bias_txt'].replace('"','""').replace("'", "''")
        }
        db.annotate(row['id'], annotation)


def main():
    create_table_tweets()
    create_table_annotations()
    populate_tweets()
    populate_annotations()
    print('Database populated')


if __name__ == '__main__':
    main()