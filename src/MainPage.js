import React from 'react';
import logo from './logo.svg';
import './App.css';
import Splash from './Splash.js';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
class MainPage extends React.Component {
  constructor(props){
    super(props);
    document.title="Config Mgmt";
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.state = {
      email:"",
      proj:"",
      proj_sel:"",
      ele:"",
      opt:[],
      datas:[],
      b:"",
      pid:"",splashVisible:'none',dmsg:'',dvis:'none',
      lin:[],defid:'',dtitle:'',dsumm:'',ddate:day+"-"+month+"-"+year,dstatus:'',dtype:''
    }
    this.showMsg=this.showMsg.bind(this);
    this.receiveHint=this.receiveHint.bind(this);
    this.showHints=this.showHints.bind(this);
    this.showMsg();
    this.receiveHint();
    this.gethint=this.gethint.bind(this);
    this.changedata=this.changedata.bind(this);
    this.raiseDefect=this.raiseDefect.bind(this); 
   }
  showHints()
  {
    var arr=this.state.opt;
    var val=this.state.proj;
    let datas=this.state.datas;
    this.setState({b:""});
    let b=this.state.b;
    var b1='abc';
    document.getElementById('livesearch').innerHTML="";
    this.setState({datas:[]});
    for(var i=0;i<arr.length;i++)
    {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase())
      {
        this.setState({proj_sel:arr[i]});
        datas.push(<li className='hintlist' id={arr[i]} onClick={(evt)=>this.gethint(evt.target.id)}><strong>{arr[i].substr(0, val.length)}</strong>{arr[i].substr(val.length)}</li>);
        this.setState({datas});
        document.getElementById("livesearch").style.border="1px solid #A5ACB2";
      }
    }
  }
  showMsg()
  {
    try{
        fetch('https://asprod-users-data.herokuapp.com/userinfo', {
         method: 'GET'
         //Request Type 
     })
     .then((response) => response.json())
     //If response is in json then in success
     .then((responseJson) => {
         //Success 
        console.log("ELmnets"+document.getElementsByClassName('infos'));
        let lin=this.state.lin;
        lin.push(document.getElementsByClassName('infos')[0]);
        this.setState({lin}); 
        this.setState({email:responseJson.msg}); 
     })
     //If response is not in json then in error
     .catch((error) => {
         //Error 
         alert(JSON.stringify(error));
         console.error(error);
     });  
   }
   catch(err){alert("check your network connection/wifi");}
}
dologout()
  {
    console.log("We here");  
    try{
        fetch('https://asprod-users-data.herokuapp.com/logout', {
         method: 'GET'
         //Request Type 
     })
     .then((response) => response.json())
     //If response is in json then in success
     .then((responseJson) => {
         //Success 
        alert(responseJson.msg); 
        browserHistory.push('configmgt');
     })
     //If response is not in json then in error
     .catch((error) => {
         //Error 
         alert(JSON.stringify(error));
         console.error(error);
     });  
   }
   catch(err){alert("check your network connection/wifi");}
}
openModal()
{
 document.getElementById("myModal").style.display="block";
 console.log("IN open modal");
}
closeModal()
{
 document.getElementById("myModal").style.display="none";
}
receiveHint()
{
  /*if (this.state.proj.length==0) {
    this.setState({datas:[]});
    document.getElementById("livesearch").style.border="0px";
    return;
  }*/
  try{
    this.setState({datas:["Loading...."]});
    this.setState({splashVisible:'block'}); 
    fetch('https://asprod-users-data.herokuapp.com/searchthing?coll=pids&fname=pname&fvalue=dfdsdw', {
     method: 'GET'
     //Request Type 
 })
 .then((response) => response.json())
 //If response is in json then in success
 .then((responseJson) => {
     //Success 
     this.setState({datas:[]});
     this.setState({splashVisible:'none'});
     //document.getElementById("livesearch").style.border="0px";
     let opt=this.state.opt; 
     for(var i=0;i<responseJson.length;i++)
     {
     //document.getElementById("livesearch").className="projsearch";
     //document.getElementById("livesearch").innerHTML+="<li class='hintlist' onclick='gethint()'>"+responseJson[i].pname+"</li>";
     //this.state.ele=<li className='hintlist' onClick={this.getHint}>responseJson[i].pname</li>
     opt.push(responseJson[i].pname);
     this.setState({opt});
     }
     console.log("THE VALS"+this.state.opt[1]);
     /*datas.push(<li className='hintlist' onClick={evt => this.gethint(evt.target.innerHTML)}>{this.state.opt}</li>);
     this.setState({datas});
     document.getElementById("livesearch").style.border="1px solid #A5ACB2";
     }
     console.log(this.state.opt);
     if(responseJson.msg=="No Suggessions") 
     {
      document.getElementById("livesearch").className="projsearch";
      document.getElementById("livesearch").innerHTML="No Suggestions";
      document.getElementById("livesearch").style.border="1px solid #A5ACB2";
     }*/ 
 })
 //If response is not in json then in error
 .catch((error) => {
     //Error 
     alert(JSON.stringify(error));
     console.error(error);
 });  
}
catch(err){alert("check your network connection/wifi");}  
}
gethint(evt)
{
 console.log(evt);
 this.setState({proj:evt});
 //this.setState({datas:[]});
 document.getElementById("livesearch").innerHTML="";
 document.getElementById("livesearch").style.border="0px";
 this.setState({splashVisible:'block'});
 try{ 
  fetch('https://asprod-users-data.herokuapp.com/giveprojno?coll=pids&fname=pname&fvalue='+evt, {
   method: 'GET'
   //Request Type 
})
.then((response) => response.json())
//If response is in json then in success
.then((responseJson) => {
   //Success 
   this.setState({splashVisible:'none'});
   document.getElementById("load").className="";
   console.log(responseJson.pid);
   this.setState({pid:responseJson.pid}); 
})
//If response is not in json then in error
.catch((error) => {
   //Error 
   alert(JSON.stringify(error));
   console.error(error);
});  
}
catch(err){alert("check your network connection/wifi");}  
}
changedata(evt)
{
  var a=this.state.lin;
  console.log(a);
  try{    
  a[0].style.color='#D3D3D2';
  a[0].style.borderBottom='none';}
  catch(err){}
  this.state.lin.length = 0;
  console.log("Right now"+this.state.lin);
  let lin=this.state.lin;
  lin.push(evt);
  this.setState({lin});
  evt.style.color='#22E2F9';
  evt.style.borderBottom='6px solid #22E2F9';
  evt.style.zIndex='1';
}

raiseDefect()
{
    const requestOptions = {
      method: 'POST',
      headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({dtype:'Defect',dtitle:this.state.dtitle,ddate:this.state.ddate,dstatus:'Open',dsummary:this.state.dsumm,dproject:this.state.proj}),mode: 'cors',
  };
  this.setState({splashVisible:'block'});
     try{
  fetch('https://asprod-users-data.herokuapp.com/adddefect',requestOptions)
.then((response) => response.json())
//If response is in json then in success
.then((responseJson) => {
   //Success 
   this.setState({splashVisible:'none'});
   document.getElementById("myModal").style.display="none";
   console.log(responseJson); 
   this.setState({defid:responseJson.DefId});
   var msg="Item "+this.state.defid+"-: "+this.state.dtitle+" forwarded to concerned team.";
   this.setState({dmsg:msg});this.setState({dvis:'block'});
})
//If response is not in json then in error
.catch((error) => {
   //Error 
   console.error(error);
});  
}
catch(err){alert("check your network connection/wifi");}
}
render()
  {
  return (
<div className="bg-main">
  <div className="hidit" style={{display:this.state.dvis}}>
    {this.state.dmsg}
  </div>
<div id="myModal" className="modal">
<Splash vis={this.state.splashVisible}></Splash>
   <div className="modal-content">
    <span className="close" onClick={this.closeModal}>&times;</span>
    <div className="proj">
      <div className="names">Project</div>
      <input value={this.state.proj} onChange={(evt) => this.setState({proj:evt.target.value})}
       onKeyUp={this.showHints} type="text"></input>   
    </div>
    <div className="projsearch" id="livesearch">{this.state.datas.map((value) => {
             return value })}       
       </div>
    <div className="proj">
      <div className="names">PID</div>
      <input style={{zIndex:1}} value={this.state.pid} disabled></input>
      <span id="load"></span>
    </div>
   <div className="geninfo">
    <li className="infos" style={{color:'#22E2F9',borderBottom:'6px solid #22E2F9'}} onClick={(evt)=>this.changedata(evt.target)}>General Info</li>
    <li className="infos" onClick={(evt)=>this.changedata(evt.target)}>History</li>
    <li className="infos" onClick={(evt)=>this.changedata(evt.target)}>Comments</li>    
   </div>
   <div style={{marginLeft:'4vh'}}>
   <div className="proj">
      <div className="names">ID</div>
      <input style={{zIndex:1}} value={this.state.defid} disabled></input>
    </div>
    <div className="proj">
      <div className="names">Title</div>
      <input value={this.state.dtitle} style={{width:'65%'}} onChange={(evt) => this.setState({dtitle:evt.target.value})}></input>
    </div>
    <div className="proj">
      <div className="names">Type</div>
      <select className='cselect'>
        <option value='enhancement'>Enhancement</option>
        <option value='defect' selected>Defect</option>
      </select>
    </div>
    <div className="proj">
      <div className="names">Date</div>
      <input style={{zIndex:1}} value={this.state.ddate} disabled></input>
    </div>
    <div className="proj">
      <div className="names">Status</div>
      <select className='cselect'>
        <option value='open' selected>Open</option>
        <option value='retest'>Retest</option>
        <option value='rf'>Retest Failed</option>
        <option value='closed'>Closed</option>
      </select>
    </div>
    <div className="proj">
      <div className="names" >Summary</div>
      <textarea wrap='on' value={this.state.dsumm} onChange={(evt) => this.setState({dsumm:evt.target.value})} rows='10' cols='80' style={{marginLeft:'45px',resize:'none',overflow:'auto',border: '1px solid #888' }} ></textarea>
    </div>
    <button style={{marginLeft:'50%',marginTop:'20%'}} onClick={this.raiseDefect}>Raise</button>
   </div>
   </div>
   </div>
   <header>{this.state.email}</header>
   <button onClick={this.dologout}>Logout</button>
   <div className="newbox" id="mod" onClick={this.openModal}><center><b>Defect</b></center></div>      
</div>
  );
  }
}

export default MainPage;
