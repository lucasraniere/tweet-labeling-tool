import sqlite3, os, json


os.chdir(os.path.dirname(os.path.realpath(__file__)))
db_path = '../../data/tweets.db'

con = sqlite3.connect(db_path)
cur = con.cursor()

annotation_example = {
    'id': 1,
    'highlight': 0,
    'not_good': 1,
    'polarized': 1,
    'tweet_bias': -1,
    'toxic_language': 1,
    'toxic_language_txt': 'This is a toxic tweet',
    'hate_speech': 1,
    'hate_speech_txt': 'This is a hate speech tweet',
    'emotive_language': 1,
    'emotive_language_txt': 'This is an emotive tweet',
    'conspiracy': 0,
    'conspiracy_txt': '',
    'dehumanization': 0,
    'dehumanization_txt': '',
    'crime_imputation': 0,
    'crime_imputation_txt': '',
    'divisive_language': 0,
    'divisive_language_txt': '',
    'other': 0,
    'other_txt': ''
}

def get_tweet(id:int):
    res = cur.execute(f'SELECT * FROM tweets WHERE id = {id}').fetchone()
    return res[1] if res else 'Tweet not found'


def get_annotation(id:int):
    res = cur.execute(f'SELECT * FROM annotations WHERE id = {id}').fetchall()
    if res:
        return json.dumps({
            'id': id,
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
        }, indent=4)
    else:
        return 'Annotation not found'


def annotate(id:int, annotation:dict):
    cur.execute(f'''
        INSERT INTO annotations VALUES ({id}, {annotation["highlight"]}, {annotation["not_good"]}, {annotation["polarized"]}, {annotation["tweet_bias"]}, {annotation["toxic_language"]}, "{annotation["toxic_language_txt"]}", {annotation["hate_speech"]}, "{annotation["hate_speech_txt"]}", {annotation["emotive_language"]}, "{annotation["emotive_language_txt"]}", {annotation["conspiracy"]}, "{annotation["conspiracy_txt"]}", {annotation["dehumanization"]}, "{annotation["dehumanization_txt"]}", {annotation["crime_imputation"]}, "{annotation["crime_imputation_txt"]}", {annotation["divisive_language"]}, "{annotation["divisive_language_txt"]}", {annotation["other"]}, "{annotation["other_txt"]}")
        '''
    )
    con.commit()

def main():
    # annotate(2, annotation_example)
    # print(get_annotation(1001))
    print(get_annotation(2))
    con.close()


if __name__ == "__main__":
    main()