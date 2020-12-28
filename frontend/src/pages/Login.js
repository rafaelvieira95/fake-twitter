
import './Login.css';
import TwitterLogo from '../twitter.svg';
import React, {useState} from 'react';

function Login (props){

  const [username, setUsername] = useState('');

  const handleSubmit = function (e){
      e.preventDefault();
      if(username.length === 0) return;
      localStorage.setItem('@GoTwitter:username', username);

      props.history.push('/timeline');
  }

    return (
        <div className="login-wrapper">
            <img src={TwitterLogo} alt="GoTwitter"/>
            <form onSubmit={handleSubmit}>
            <input value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder="nome de usuário"/>
            <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;