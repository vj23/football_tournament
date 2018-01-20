input_arr = [
  
    {
      "teamId": 1610612737,
      "abbreviation": "ATL",
      "teamName": "Atlanta Hawks",
      "simpleName": "Hawks",
      "location": "Atlanta"
    },
    {
      "teamId": 1610612738,
      "abbreviation": "BOS",
      "teamName": "Boston Celtics",
      "simpleName": "Celtics",
      "location": "Boston"
    },
    {
      "teamId": 1610612751,
      "abbreviation": "BKN",
      "teamName": "Brooklyn Nets",
      "simpleName": "Nets",
      "location": "Brooklyn"
    },
    {
      "teamId": 1610612766,
      "abbreviation": "CHA",
      "teamName": "Charlotte Hornets",
      "simpleName": "Hornets",
      "location": "Charlotte"
    },
    {
      "teamId": 1610612741,
      "abbreviation": "CHI",
      "teamName": "Chicago Bulls",
      "simpleName": "Bulls",
      "location": "Chicago"
    },
    {
      "teamId": 1610612739,
      "abbreviation": "CLE",
      "teamName": "Cleveland Cavaliers",
      "simpleName": "Cavaliers",
      "location": "Cleveland"
    },
    {
      "teamId": 1610612742,
      "abbreviation": "DAL",
      "teamName": "Dallas Mavericks",
      "simpleName": "Mavericks",
      "location": "Dallas"
    },
    {
      "teamId": 1610612743,
      "abbreviation": "DEN",
      "teamName": "Denver Nuggets",
      "simpleName": "Nuggets",
      "location": "Denver"
    },
    {
      "teamId": 1610612765,
      "abbreviation": "DET",
      "teamName": "Detroit Pistons",
      "simpleName": "Pistons",
      "location": "Detroit"
    }
  ];
  var input_arr_process = Object.assign([], input_arr);
  var input_arr_start = [];
  team_count = input_arr.length;
  var count = 0;//keeps the count of number of matches
  var schedule = [];//stores the whole schedule
  var matchCounter = 1;//keeps the track of match number
  var roundCounter = 1;//keeps the track of the level
  var dt = new Date().getTime();
  while (true) {
  
    k = team_count / 2;
    count = count + Math.floor(k);
    if (roundCounter > 1) {
      input_arr_process = Object.assign([], input_arr_start);
      input_arr_start = Object.assign([]);
    }
    allot_match(count);
  
    team_count = Math.floor(k) + team_count % 2;
    if (team_count == 1) break;
  }
  function allot_match() { // allot teams to the macth and pushing them in the schedule
    let team1;
    let team2;
    let index;
    let obj;
    dt = dt + .5 * 60000;
    for (let i = matchCounter - 1; i < count; i++) {
      index = Math.floor(Math.random() * input_arr_process.length);
      if (roundCounter > 1) {
        team1 = input_arr_process[index];
      }
      else {
        team1 = input_arr_process[index].simpleName;
      }
  
      remove_element(index);
      index = Math.floor(Math.random() * input_arr_process.length);
      if (roundCounter > 1) {
        team2 = input_arr_process[index];
      }
      else {
        team2 = input_arr_process[index].simpleName;
      }
      remove_element(index); // calling remeove element 
      obj = {
        match: 'match' + (i + 1),
        team1: team1,
        team2: team2,
        round: 'Round' + roundCounter,
        time: dt
      };
      obj['match' + (i + 1) + 'winner'] = null;
      schedule.push(obj);
      input_arr_start.push('match' + (i + 1) + 'winner');
  
    }
  
    try {
  
      if (input_arr_process.length == 1 && roundCounter == 1) {
        input_arr_start.push(input_arr_process[0].simpleName);
      }
      else if (input_arr_process.length == 1) {
        input_arr_start.push(input_arr_process[0])
      }
  
    }
    catch (error) {
  
    }
    roundCounter++;
    matchCounter = count + 1;
  
  
  }
  function remove_element(index) { //renmoves element which is already selected randomly
  
    input_arr_process.splice(index, 1);
  }
  
  setInterval(function () { 
    let dt = new Date().getTime();
    for (let i = 0; i < schedule.length; i++) {
      if (schedule[i].time < dt && schedule[i][schedule[i]["match"] + "winner"] == null) {
        if (schedule[i].team1.includes("winner") || schedule[i].team2.includes("winner")) {
          for (let j = 0; j < i; j++) {
            if (!(schedule[i].team1.includes("winner") || schedule[i].team2.includes("winner")))
              break;
            if (schedule[i].team1 in schedule[j]) {
              schedule[i].team1 = schedule[j][schedule[j]["match"] + "winner"]
            }
            if (schedule[i].team2 in schedule[j]) {
              schedule[i].team2 = schedule[j][schedule[j]["match"] + "winner"]
            }
          }
        }
        schedule[i][schedule[i]["match"] + "winner"] = schedule[i]["team" + Math.floor((Math.random() * 2) + 1)]
        console.log("updating the schedule");
      }
    }
  
  
    for (let i = 0; i < clients.length; i++) {
      clients[i].send(JSON.stringify(schedule), function () { /* ignore errors */ });
    }
  }, 1000)
  
  
//preparing and updating schedule code ends here




// webserver code starts here......................







  var WebSocketServer = require('ws').Server;
  var express = require('express');
  var path = require('path');
  var app = express();
  var server = require('http').createServer();
  
  app.use(express.static(path.join(__dirname, '/public')));
  
  var wss = new WebSocketServer({ server: server });
  var count = 0;
  var clients = [];
  
  wss.on('connection', function (ws) {
    try {
      console.log("pritning...........")
      //console.log(ws)
      var id = count;
      count++;
      clients[id] = ws;
    }
    catch (error) {
      console.log(error)
      
    }
  
    ws.on('error',function(){
      console.log("catching the error on the websocket");
    })
  });
  server.on('request', app);
  server.listen(8080, function () { // server listens on port 8080
    console.log('Listening on http://localhost:8080');
  });
  