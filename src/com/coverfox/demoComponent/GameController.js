export default class GameController
{
    
    constructor(schedule,modelobj,viewobj){
        this.myModel=modelobj;
        this.myView=viewobj;
      
        this.myView.display(this.myModel.updateStats(schedule));//fetches model and passes it to the view
    }

}