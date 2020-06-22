const express = require('express');
const app = express();

var leftarm = 150;

/*var pose = [{name:nose,x:0,y:0},{name:lefteye,x:0,y:0},{name:righteye,x:0,y:0},
  {name:lefteye,x:0,y:0},{name:righteye,x:0,y:0},{name:leftshoulder,x:0,y:0},
  {name:rightshoulder,x:0,y:0},{name:leftelbow,x:0,y:0},{name:rightbow,x:0,y:0},
  {name:leftwrist,x:0,y:0},{name:rightwrist,x:0,y:0},{name:lefthip,x:0,y:0},
  {name:righthip,x:0,y:0},{name:leftknee,x:0,y:0},{name:rightknee,x:0,y:0},
  {name:leftankle,x:0,y:0},{name:rightankle,x:0,y:0}];
*/
let A = {x:0, y:0}, B = {x:0, y:0}, C = {x:0, y:0};

app.get('/', (req, res) => {
    var num = req.param('num');
    let resultString = "";
    A.x = 0;
    A.y = 0;
    B.x = 0;
    B.y = 1;
    C.x = 1;
    C.y = 0;


if(num.match(/[1-9]/g)){
        resultString = find_angle(A,B,C);
        res.setHeader('Content-Type','application/json');
        if (leftarm == resultString)
            res.send(JSON.stringify({result:"true"}));
        else
            res.send(JSON.stringify({result:"false"}));
    }
    else{
        res.setHeader('Content-Type','application/json');
        res.send(JSON.stringify({result:'400 error'}));
    }
    
});

 
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});


function find_angle(A,B,C) {
    var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
    var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
    var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
    return Math.acos(((Math.pow(AB, 2)) + (Math.pow(AC, 2)) - (Math.pow(BC, 2))) / (2 * AB * AC)) * 180 / Math.PI;
}