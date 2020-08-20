import React from 'react';
import Splash from './Splash.js';
import './App.css';
import wall1 from './static/images/wall1.jpg';
import wall2 from './static/images/wall2.jpg';
import wall3 from './static/images/wall3.jpg';
import wall4 from './static/images/wall4.jpg';
import wall5 from './static/images/wall5.jpg';
import wall6 from './static/images/wall6.jpg';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
 class App2 extends React.Component {
  constructor(props){
    super(props);
    document.title="Config Mgmt";
    this.state = {
      pos: 0,cpos: 0,
      userid:'',pwd:'',splashVisible:'none',
      vals: [wall1,wall2,wall3,wall4,wall5,wall6],
    }
    this.startTimer = this.startTimer.bind(this);
    this.changePic = this.changePic.bind(this);
    this.sendData = this.sendData.bind(this);
    this.startTimer();
  }
  changePic() {
    if(this.state.pos == 6)
     this.setState({pos:0});
    else
    this.setState({pos:this.state.pos+1});
    this.setState({cpos:this.state.cpos+1});  
  }
  startTimer() {
    setInterval(() => this.changePic(), 10000);
   // setInterval(function(){ this.changePic() }, 2000);
  }
  sendData()
  {
    console.log("CLCIK:"+this.state.userid);
    this.setState({splashVisible:'block'});
    const requestOptions = {
      method: 'POST',
      headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:this.state.userid,pwd:this.state.pwd}),mode: 'cors',
  };
     try{
  fetch('https://asprod-users-data.herokuapp.com/login',requestOptions)
.then((response) => response.json())
//If response is in json then in success
.then((responseJson) => {
   //Success 
   console.log(responseJson);
   this.setState({splashVisible:'none'});
   //alert(JSON.stringify(responseJson));
   if(responseJson.msg.includes("success"))
   {
    browserHistory.push('mainpage')

   }
   else
   { 
     alert("ERROR RESPONSE");
   }
})
//If response is not in json then in error
.catch((error) => {
   //Error 
   alert(error);
   console.error(error);
});  
}
catch(err){alert("check your network connection/wifi");}
  }

  render()
  {
    console.log(this.props.location);
  return (
<div>
    <div className="App">
       <Splash vis={this.state.splashVisible}></Splash>
      <header id="cont" className="App-header">
      <img id="ims" className="imgs" key={this.state.cpos} src={this.state.vals[this.state.pos]}></img>
      </header>    
    </div>
    <div className="App2">
      <header>Sign In Portal</header>
      <div class="login">
        <input value={this.state.userid} onChange={(evt) => this.setState({userid:evt.target.value})} type="text" placeholder="UserName"></input>
        <input value={this.state.pwd} onChange={(evt) => this.setState({pwd:evt.target.value})} type="password" placeholder="password"></input>
        <button onClick={this.sendData}>SignIn</button>
      </div>
    </div>
</div>
  );
  }
}

export default App2;
