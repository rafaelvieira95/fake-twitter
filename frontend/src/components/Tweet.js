
import './Tweet.css';
import like from '../like.svg';
import api from '../services/api';

function Tweet (props){
    const {tweet} = props;

    const handleLike = async function (){
        await api.post(`likes/${tweet._id}`);
    }

    return (
        <li className="tweet">
          <strong>{tweet.author}</strong>
          <p> {tweet.content}</p>
          <button type="button" onClick={handleLike}>
          <img src={like} alt="Like"/> {tweet.likes}
          </button>
        </li>

    );

}

export default Tweet;