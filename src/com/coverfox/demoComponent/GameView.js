export default class GameView
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