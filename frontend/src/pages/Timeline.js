import './Timeline.css';
import TwitterLogo from '../twitter.svg';
import React, {useEffect, useState} from 'react';
import Tweet from '../components/Tweet';

import api from '../services/api';
import socket from "socket.io-client";

export default function Timeline(){

    const [newTweet, setNewTweet] = useState('');
    const [tweets, setTweets] = useState([]);

    const handleNewTweet =  async function(e){

        if(e.keyCode !== 13) return;
        const content = newTweet;
        const author = localStorage.getItem('@GoTwitter:username');
        await api.post('tweets', {content , author});
        setNewTweet('');
    }

     useEffect(  async () => {

          const timeline = await api.get('tweets');
          setTweets(timeline.data);

         return () => {
             const io = socket('http://localhost:3001');
             io.on('tweet', data => {
                 setTweets({tweets: [data, ...tweets]});
             });
             io.on('like', (data) => { console.log(data); });
         }

     },[tweets]);


    return(
        <div className="timeline-wrapper">
            <img src={TwitterLogo} height={24} alt="GoTwitter"/>
            <form>
                <textarea value={newTweet} onChange={(e) => {setNewTweet(e.target.value)}}
                onKeyDown={handleNewTweet}
                          placeholder="O que está acontecendo?">
                </textarea>
            </form>
            <ul className="tweet-list">
            { tweets.map((tweet) => <Tweet key={tweet._id} tweet = {tweet} />) }
            </ul>

        </div>
    );
}

