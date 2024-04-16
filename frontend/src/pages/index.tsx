import AnnotationMenu from "./components/AnnotationMenu";
import TweetDisplayer from "./components/TweetDisplayer";

import React, { useState } from 'react';

async function getNextId() {
  const response = await fetch("/next");
  const id = await response.text();
  console.log(id);
  return id;
}

// const [nextId, setNextId] = useState(getNextId());

let tweetText = "This is a tweet!";
// let tweetText = nextId



export default function Home() {
  return (
    <div>
      <div className="text-center p-1">
        <h1>Ferramenta de Rotulagem de Tweets</h1>
      </div>
      <div className="columns-2 gap-4 w-full h-full">
        <TweetDisplayer tweet={tweetText} />
        <AnnotationMenu />
      </div>
    </div>
  )
}