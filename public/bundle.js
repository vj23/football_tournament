/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameModel_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__GameView_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__GameController__ = __webpack_require__(1);



var host = window.document.location.host.replace(/:.*/, '');
var ws = new WebSocket('ws://' + 'localhost' + ':8080');
ws.onmessage = function (event) { //when gettting message from backend

  let modelobj=new __WEBPACK_IMPORTED_MODULE_0__GameModel_js__["a" /* default */]();//
  let viewobj=new __WEBPACK_IMPORTED_MODULE_1__GameView_js__["a" /* default */]();
  //testobj.updateStats("test");
  console.log("got a message from server");
 let controllerobj=new __WEBPACK_IMPORTED_MODULE_2__GameController__["a" /* default */](JSON.parse(event.data),modelobj,viewobj);
  
 
  //updateStats(JSON.parse(event.data));
  
};
ws.onclose=function(event) //when server closes the connection
{
  
    alert("websocket connection closed")

};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameController
{
    
    constructor(schedule,modelobj,viewobj){
        this.myModel=modelobj;
        this.myView=viewobj;
      
        this.myView.display(this.myModel.updateStats(schedule));//fetches model and passes it to the view
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameController;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameModel {

    constructor(){
console.log("constructor");
    }
    updateStats(schedule)//returns the schedule 
    {
        console.log(schedule);
        return schedule;
    } 
  
}
/* harmony default export */ __webpack_exports__["a"] = (GameModel);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameView
{
    constructor()
    {
        this.myid=document.getElementById("app");
    }
    display(schedule) // renders the schedule on UI
    {
        var tableHeader = "<table><tr><th>Round</th><th>Match</th><th>TeamA</th><th>TeamB</th><th>Result</th></tr>";
        var tableContent = "";
        // Loop through the JSON and output each row in to a string.
        for(let i = 0; i < schedule.length; i++) {
            console.log(schedule[i])
            tableContent = tableContent + "<tr><td>" + schedule[i].round + "</td><td>" + schedule[i].match + "</td><td>" + schedule[i].team1 + "</td><td>" + schedule[i].team2 + "</td><td>" + schedule[i]["match"+(i+1)+"winner"] + "</tr>";
        }
        var tableFooter = "</table>";
      
        this.myid.innerHTML=tableHeader + tableContent + tableFooter;
    }
    
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameView;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);