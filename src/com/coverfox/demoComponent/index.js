import GameModel from './GameModel.js';
import GameView from'./GameView.js';
import GameController from './GameController';
var host = window.document.location.host.replace(/:.*/, '');
var ws = new WebSocket('ws://' + 'localhost' + ':8080');
ws.onmessage = function (event) { //when gettting message from backend

  let modelobj=new GameModel();//
  let viewobj=new GameView();
  //testobj.updateStats("test");
  console.log("got a message from server");
 let controllerobj=new GameController(JSON.parse(event.data),modelobj,viewobj);
  
 
  //updateStats(JSON.parse(event.data));
  
};
ws.onclose=function(event) //when server closes the connection
{
  
    alert("websocket connection closed")

};