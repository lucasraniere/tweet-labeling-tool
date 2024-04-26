import { get } from "http";
import AnnotationMenu from "./components/AnnotationMenu";
import TweetDisplayer from "./components/TweetDisplayer";

import React, { useEffect, useState } from 'react';

export default function Home() {
  const [currentId, setCurrentId] = useState<number>(0);
  const [tweetText, setTweetText] = useState<string>("");
  const [polarized, setPolarized] = useState<number>(0);
  const [highlight, setHighlight] = useState<number>(0);
  const [notGood, setNotGood] = useState<number>(0);
  const [tweetBias, setTweetBias] = useState<number>(0);
  const [toxicLanguage, setToxicLanguage] = useState<number>(0);
  const [toxicLanguageTxt, setToxicLanguageTxt] = useState<string>("");
  const [hateSpeech, setHateSpeech] = useState<number>(0);
  const [hateSpeechTxt, setHateSpeechTxt] = useState<string>("");
  const [emotiveLanguage, setEmotiveLanguage] = useState<number>(0);
  const [emotiveLanguageTxt, setEmotiveLanguageTxt] = useState<string>("");
  const [conspiracy, setConspiracy] = useState<number>(0);
  const [conspiracyTxt, setConspiracyTxt] = useState<string>("");
  const [dehumanization, setDehumanization] = useState<number>(0);
  const [dehumanizationTxt, setDehumanizationTxt] = useState<string>("");
  const [crimeImputation, setCrimeImputation] = useState<number>(0);
  const [crimeImputationTxt, setCrimeImputationTxt] = useState<string>("");
  const [divisiveLanguage, setDivisiveLanguage] = useState<number>(0);
  const [divisiveLanguageTxt, setDivisiveLanguageTxt] = useState<string>("");
  const [other, setOther] = useState<number>(0);
  const [otherTxt, setOtherTxt] = useState<string>("");

 // Back end stuff -------------------------------------------------------------
  const getNextId = async () => {
    const response = await fetch('http://localhost:5000/next');
    const data = await response.json();
    return data.id
  }

  const getTweet = async (id: number) => {
    const response = await fetch(`http://localhost:5000/get_tweet/${id}`);
    const data = await response.json();
    return data.tweet;
  }

  const getAnnotation = async (id: number) => {
    const response = await fetch(`http://localhost:5000/get_annotation/${id}`);
    const data = await response.json();
    return data;
  }

  const annotate = async () => { 
    const annotation = getCurrentAnnotation();
    const id_ = annotation.id;
    const response = await fetch(`http://localhost:5000/annotate/${id_}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(annotation)
    }).then((response) => {
      console.log(response.body);
    });
  }

  const annotateAndNext = async () => {
    const annotation = getCurrentAnnotation();
    const id_ = annotation.id;
    const response = await fetch(`http://localhost:5000/annotate/${id_}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(annotation)
    }).then((response) => {
      console.log(response.body);
    });
    setCurrentId(id_ + 1);
    getTweet(id_ + 1).then((tweet) => {
      setTweetText(tweet);
    });
    getAnnotation(id_ + 1).then((annotation) => {
      setAnnotation(annotation);
    });
  }

  // Navigation functions ------------------------------------------------------
  const goToId = async (id: number) => {
    if (isNaN(parseInt(id)) || id < 1 || id > 1000) {
      alert("Invalid id!");
    }  else {
      setCurrentId(parseInt(id));
      getTweet(id).then((tweet) => {
        setTweetText(tweet);
      });
      getAnnotation(parseInt(id)).then((annotation) => {
        setAnnotation(annotation);
      });
    }
  }

  function incrementId() {
    const new_id = currentId + 1;
    if (new_id > 1000) {
      alert("No subsequent tweets!");
    } else {
      setCurrentId(new_id);
      getTweet(new_id).then((tweet) => {
        setTweetText(tweet);
      });
      getAnnotation(new_id).then((annotation) => {
        setAnnotation(annotation);
      });
    }
  }

  function decrementId() {
    const new_id = currentId - 1;
    if (new_id < 1) {
      alert("No previous tweet!");
    } else {
      setCurrentId(new_id);
      getTweet(new_id).then((tweet) => {
        setTweetText(tweet);
      });
      getAnnotation(new_id).then((annotation) => {
        setAnnotation(annotation);
      });
    }
  }

  function goToNext() {
    getNextId().then((id) => {
      setCurrentId(id);
      getTweet(id).then((tweet) => {
        setTweetText(tweet);
      });
      getAnnotation(id).then((annotation) => {
        setAnnotation(annotation);
      });
    });
  }

  // Checkboxes handlers-------- -----------------------------------------------
  const checkPolarizationHandler = () => {
    setPolarized(polarized === 0 ? 1 : 0);
  }

  const checkHighlightHandler = () => {
    setHighlight(highlight === 0 ? 1 : 0);
  }

  const checkNotGoodHandler = () => {
    setNotGood(notGood === 0 ? 1 : 0);
  }

  const tweetBiasHandler = (bias: number) => {
    setTweetBias(bias);
  }

  const checkToxicLanguageHandler = () => {
    setToxicLanguage(toxicLanguage === 0 ? 1 : 0);
  }

  const checkHateSpeechHandler = () => {
    setHateSpeech(hateSpeech === 0 ? 1 : 0);
  }

  const checkEmotiveLanguageHandler = () => {
    setEmotiveLanguage(emotiveLanguage === 0 ? 1 : 0);
  }

  const checkConspiracyHandler = () => {
    setConspiracy(conspiracy === 0 ? 1 : 0);
  }

  const checkDehumanizationHandler = () => {
    setDehumanization(dehumanization === 0 ? 1 : 0);
  }

  const checkCrimeImputationHandler = () => {
    setCrimeImputation(crimeImputation === 0 ? 1 : 0);
  }

  const checkDivisiveLanguageHandler = () => {
    setDivisiveLanguage(divisiveLanguage === 0 ? 1 : 0);
  }

  const checkOtherHandler = () => {
    setOther(other === 0 ? 1 : 0);
  }

  // Get and set current data ----------------------------------------------------------
  function getCurrentAnnotation() {
    return {
      'id': currentId,
      'highlight': highlight,
      'not_good': notGood,
      'polarized': polarized,
      'tweet_bias': tweetBias,
      'toxic_language': toxicLanguage,
      'toxic_language_txt': toxicLanguageTxt,
      'hate_speech': hateSpeech,
      'hate_speech_txt': hateSpeechTxt,
      'emotive_language': emotiveLanguage,
      'emotive_language_txt': emotiveLanguageTxt,
      'conspiracy': conspiracy,
      'conspiracy_txt': conspiracyTxt,
      'dehumanization': dehumanization,
      'dehumanization_txt': dehumanizationTxt,
      'crime_imputation': crimeImputation,
      'crime_imputation_txt': crimeImputationTxt,
      'divisive_language': divisiveLanguage,
      'divisive_language_txt': divisiveLanguageTxt,
      'other': other,
      'other_txt': otherTxt
    };
  }

  const setAnnotation = (annotation: object) => {
    setPolarized(annotation.polarized);
    setHighlight(annotation.highlight);
    setNotGood(annotation.not_good);
    setTweetBias(annotation.tweet_bias);
    setToxicLanguage(annotation.toxic_language);
    setToxicLanguageTxt(annotation.toxic_language_txt);
    setHateSpeech(annotation.hate_speech);
    setHateSpeechTxt(annotation.hate_speech_txt);
    setEmotiveLanguage(annotation.emotive_language);
    setEmotiveLanguageTxt(annotation.emotive_language_txt);
    setConspiracy(annotation.conspiracy);
    setConspiracyTxt(annotation.conspiracy_txt);
    setDehumanization(annotation.dehumanization);
    setDehumanizationTxt(annotation.dehumanization_txt);
    setCrimeImputation(annotation.crime_imputation);
    setCrimeImputationTxt(annotation.crime_imputation_txt);
    setDivisiveLanguage(annotation.divisive_language);
    setDivisiveLanguageTxt(annotation.divisive_language_txt);
    setOther(annotation.other);
    setOtherTxt(annotation.other_txt);
  }

  // Initialization rendering --------------------------------------------------
  useEffect(() => {
    getNextId().then((id) => {
      setCurrentId(id);
      getTweet(id).then((tweet) => {
        setTweetText(tweet);
      });
      getAnnotation(id).then((annotation) => {
        setAnnotation(annotation);
      });
    });
  }, []);


  return (
    <div>
      <div className="text-center p-1">
        <h1>Ferramenta de Rotulagem de Tweets</h1>
      </div>
      <div className="columns-2 gap-4 w-full h-full">
        <TweetDisplayer tweet={tweetText}
          currentId={currentId}
          prevButton={decrementId}
          nextButton={incrementId}
          goToNext={goToNext}
          goToId={goToId}
          />

        <AnnotationMenu
        polarized={polarized}
        highlight={highlight}
        notGood={notGood}
        tweetBias={tweetBias}

        toxicLanguage={toxicLanguage}
        toxicLanguageTxt={toxicLanguageTxt}
        hateSpeech={hateSpeech}
        hateSpeechTxt={hateSpeechTxt}
        emotiveLanguage={emotiveLanguage}
        emotiveLanguageTxt={emotiveLanguageTxt}
        conspiracy={conspiracy}
        conspiracyTxt={conspiracyTxt}
        dehumanization={dehumanization}
        dehumanizationTxt={dehumanizationTxt}
        crimeImputation={crimeImputation}
        crimeImputationTxt={crimeImputationTxt}
        divisiveLanguage={divisiveLanguage}
        divisiveLanguageTxt={divisiveLanguageTxt}
        other={other}
        otherTxt={otherTxt}

        highlightHandler={checkHighlightHandler}
        notGoodHandler={checkNotGoodHandler}
        polarizedHandler={checkPolarizationHandler}
        biasHandler={tweetBiasHandler}

        toxicLanguageCheckHandler={checkToxicLanguageHandler}
        hateSpeechCheckHandler={checkHateSpeechHandler}
        emotiveLanguageCheckHandler={checkEmotiveLanguageHandler}
        conspiracyCheckHandler={checkConspiracyHandler}
        dehumanizationCheckHandler={checkDehumanizationHandler}
        crimeImputationCheckHandler={checkCrimeImputationHandler}
        divisiveLanguageCheckHandler={checkDivisiveLanguageHandler}
        otherCheckHandler={checkOtherHandler}

        toxicLanguageTxtHandler={setToxicLanguageTxt}
        hateSpeechTxtHandler={setHateSpeechTxt}
        emotiveLanguageTxtHandler={setEmotiveLanguageTxt}
        conspiracyTxtHandler={setConspiracyTxt}
        dehumanizationTxtHandler={setDehumanizationTxt}
        crimeImputationTxtHandler={setCrimeImputationTxt}
        divisiveLanguageTxtHandler={setDivisiveLanguageTxt}
        otherTxtHandler={setOtherTxt}

        annotateButton={annotate}
        annotateButtonNext={annotateAndNext}
        />
      </div>
    </div>
  )
}