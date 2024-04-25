import { get } from "http";
import AnnotationMenu from "./components/AnnotationMenu";
import TweetDisplayer from "./components/TweetDisplayer";

import React, { useEffect, useState } from 'react';

export default function Home() {
  const [currentId, setCurrentId] = useState<number>(0);
  const [tweetText, setTweetText] = useState<string>("");

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

  const goToId = async (id: number) => {
    if (isNaN(parseInt(id)) || id < 1 || id > 1000) {
      alert("Invalid id!");
    }  else {
      setCurrentId(id);
      getTweet(id).then((tweet) => {
        setTweetText(tweet);
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
    }
  }

  function goToNext() {
    getNextId().then((id) => {
      setCurrentId(id);
      getTweet(id).then((tweet) => {
        setTweetText(tweet);
      });
    });
  }


  useEffect(() => {
    getNextId().then((id) => {
      const id_ = id;
      setCurrentId(id_);
      getTweet(id_).then((tweet) => {
        setTweetText(tweet);
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
        <AnnotationMenu />
      </div>
      <button onClick={() => getTweet(23)}>Get next id</button>
    </div>
  )
}