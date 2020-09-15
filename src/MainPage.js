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
      opt:[],addcoms:[],
      datas:[],
      b:"",
      pid:"",splashVisible:'none',dmsg:'',dvis:'none',mainVis:'block',comsVis:'none',
      switchd:"none",defmod:false,dctmp:'',
      defcoms:[],updsave:true,
      lin:[],defid:'',dtitle:'',dsumm:'',ddate:day+"-"+month+"-"+year,dstatus:'',dtype:'',did:'',dstring:'',dfsvis:'none' 
    }
    this.showDefectModal=this.showDefectModal.bind(this);
    this.showMsg=this.showMsg.bind(this);
    this.openModal=this.openModal.bind(this);
    this.receiveHint=this.receiveHint.bind(this);
    this.showHints=this.showHints.bind(this);
    this.showMsg();
    this.receiveHint();
    this.addcoms=this.addcoms.bind(this);
    this.gethint=this.gethint.bind(this);
    this.changedata=this.changedata.bind(this);
    this.getDefect=this.getDefect.bind(this);
    this.raiseDefect=this.raiseDefect.bind(this); 
    this.updateDefect=this.updateDefect.bind(this);
    this.updateDefectShow=this.updateDefectShow.bind(this);
    this.addtoarr=this.addtoarr.bind(this);
    let defcoms=this.state.defcoms;
    defcoms.push({user:'',date:'',coms:''});
    this.setState({defcoms});
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
  this.setState({dfsvis:'none'});
 document.getElementById("myModal").style.display="block";
 console.log("IN open modal");
 var day = new Date().getDate();
 var month = new Date().getMonth() + 1;
 var year = new Date().getFullYear();
 this.setState({splashVisible:'none'});
 this.setState({proj:''});this.setState({defid:''});
 this.setState({dtitle:''});this.setState({ddate:day+"-"+month+"-"+year});
 this.setState({dsumm:''});
 this.setState({switchd:"none"});
 this.setState({defmod:false});
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
  if(evt.innerHTML == "General Info")
  {
  this.setState({mainVis:'block'});
  this.setState({comsVis:'none'});
  }
  else
  {
  this.setState({mainVis:'none'});
  this.setState({comsVis:'block'});
  }
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
      body: JSON.stringify({dtype:'Defect',dtitle:this.state.dtitle,ddate:this.state.ddate,dstatus:'Open',dsummary:this.state.dsumm,dproject:this.state.proj,dcmnts:[]}),mode: 'cors',
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
updateDefectShow()
{
   this.setState({defmod:false});
   this.setState({updsave:false}); 
}

updateDefect()
{
    const requestOptions = {
      method: 'POST',
      headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({defid:this.state.did,dtype:this.state.dtype,dtitle:this.state.dtitle,ddate:this.state.ddate,dstatus:this.state.dstatus,dsummary:this.state.dsumm,dproject:this.state.proj,dcmnts:this.state.defcoms}),mode: 'cors',
  };
  this.setState({splashVisible:'block'});
     try{
  fetch('https://asprod-users-data.herokuapp.com/updatedefect',requestOptions)
.then((response) => response.json())
//If response is in json then in success
.then((responseJson) => {
   //Success 
   this.setState({splashVisible:'none'});
   document.getElementById("myModal").style.display="none";
   console.log(responseJson); 
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
getDefect()
{
 console.log("I here");
 this.setState({splashVisible:'block'});
 this.setState({dfsvis:'none'});
 try{ 
  fetch('https://asprod-users-data.herokuapp.com/givedefect?coll=defects&fname=defid&fvalue='+this.state.did, {
   method: 'GET'
   //Request Type 
})
.then((response) => response.json())
//If response is in json then in success
.then((responseJson) => {
   //Success
   if(responseJson.defid=="No Data Found")
   {
    console.log(responseJson); 
    this.setState({splashVisible:'none'});
   }
   else
   { 
   this.setState({splashVisible:'none'});
   this.setState({dfsvis:'block'});
   this.setState({proj:responseJson.dproject});this.setState({defid:responseJson.defid});
   this.setState({dtitle:responseJson.dtitle});this.setState({ddate:responseJson.ddate});
   this.setState({dtype:responseJson.dtype});this.setState({dstatus:responseJson.dstatus});
   this.setState({dsumm:responseJson.dsummary});
   this.setState({switchd:"block"});
   this.setState({defmod:true});
   console.log(responseJson);
   //console.log("COMS::"+responseJson.dcmnts[0].user+" , "+responseJson.dcmnts[0].date+" , "+responseJson.dcmnts[0].coms);
   this.setState({dstring:this.state.did+" :-> "+responseJson.dtitle});
   //console.log("COMS::"+responseJson.dcmnts);
   try{this.setState({defcoms:responseJson.dcmnts});}
   catch(err){
    console.log("ERR caught ubunut"); 
    let defcoms=this.state.defcoms;
    defcoms.push({user:'',date:'',coms:''});
    this.setState({defcoms});
   }
   }  
})
//If response is not in json then in error
.catch((error) => {
   //Error 
   //alert("Error caught");
   console.error(error);
});  
}
catch(err){alert("check your network connection/wifi");}  
}
showDefectModal()
{
 this.setState({dfsvis:'none'});
 document.getElementById("myModal").style.display="block";
 console.log(this.state.defmod);
}
addcoms()
{
  let addcoms=this.state.addcoms;
  addcoms.push(<div style={{marginLeft:'25px',marginTop:'10px',resize:'none',overflow:'auto',border: '2px solid #C2C5C5'}}><textarea wrap='on' onChange={(evt) => this.setState({dctmp:evt.target.value})} rows='7' cols='90' style={{resize:'none',overflow:'auto',border: '1px solid #C2C5C5',fontSize:'13px'}}>{this.state.dctmp}</textarea><button className='okbutt' style={{marginLeft:'80%'}} onClick={this.addtoarr}>Post</button><button className='cancelbutt'>Cancel</button></div>);
  this.setState({addcoms});
}
addtoarr()
{
    let defcoms=this.state.defcoms;
    defcoms.push({user:this.state.email,date:this.state.ddate,coms:this.state.dctmp});
    this.setState({defcoms});
}
render()
  {
  return (
<div className="bg-main">
<Splash vis={this.state.splashVisible}></Splash>
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
       onKeyUp={this.showHints} type="text" disabled={this.state.defmod}></input>   
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

   <div style={{marginLeft:'4vh',display:this.state.mainVis}}>
   <div className="proj">
      <div className="names">ID</div>
      <input style={{zIndex:1}} value={this.state.defid} disabled></input>
    </div>
    <div className="proj">
      <div className="names">Title</div>
      <input value={this.state.dtitle} style={{width:'65%'}} onChange={(evt) => this.setState({dtitle:evt.target.value})} disabled={this.state.defmod}></input>
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
      <select className='cselect' value={this.state.dstatus} onChange={(evt) => this.setState({dstatus:evt.target.value})}>
        <option value='open'>Open</option>
        <option value='retest'>Retest</option>
        <option value='rf'>Retest Failed</option>
        <option value='closed'>Closed</option>
      </select>
    </div>
    <div className="proj">
      <div className="names" >Summary</div>
      <textarea wrap='on' disabled={this.state.defmod} value={this.state.dsumm} onChange={(evt) => this.setState({dsumm:evt.target.value})} rows='10' cols='80' style={{marginLeft:'45px',resize:'none',overflow:'auto',border: '1px solid #888' }} ></textarea>
    </div>
    <button style={{marginLeft:'50%',marginTop:'20%'}} disabled={this.state.defmod} onClick={this.raiseDefect}>Raise</button>
    <button style={{display:this.state.switchd,marginLeft:'50%'}} onClick={this.updateDefectShow}>Update</button>
    <button className='okbutt' disabled={this.state.updsave} onClick={this.updateDefect}>Save</button>
   </div>

  <div style={{marginLeft:'4vh',display:this.state.comsVis}}>
  {this.state.defcoms.map((value) => {
  return (<div style={{border:'1px solid blue'}}> 
  <div style={{fontWeight:'bold',color:'blue',}}><a>{value.user}</a> <span style={{marginLeft:'20%',fontSize:'10px',color:'black'}}>{value.date}</span></div>
  <div>
  {value.coms}
  </div>
  <br></br>
  </div>); 
  })} 
<div>{this.state.addcoms.map((value) => {
             return value })}       
</div>
  <button onClick={this.addcoms} autofocus='false' className='modbut'>Comment</button>
  </div>

   </div>
   </div>

   <header>{this.state.email}</header>
   <button onClick={this.dologout}>Logout</button>
   <input value={this.state.did} onChange={(evt) => this.setState({did:evt.target.value})} className='searchbar' placeholder='Defect Id' onKeyUp={this.getDefect} type='text'></input>
   <div className="defsearch" style={{display:this.state.dfsvis}} onClick={this.showDefectModal}>
       {this.state.dstring}
       </div>
   <div className="newbox" id="mod" onClick={this.openModal}><center><b>Defect</b></center></div>      
</div>
  );
  }
}

export default MainPage;
