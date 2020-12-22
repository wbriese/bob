const hb = require('handlebars');
const fs=require('fs');
const angles=require('angles');
const fetch=require('node-fetch');
//let positions=require('./../data.json');
let positions=require('./../data2.json').items;

function _addDateAndTime (el) {
  //let date=new Date(el.TIMESTAMP); //for data.json
  let date=new Date(el.utcDate);
  el.DATE=date.toLocaleDateString('en-GB');
  el.TIME=date.toLocaleTimeString('en-GB');
}

function _addRelWindHeading (el) {
  let course=parseInt(el.COURSE);
  let windAngle=parseInt(el.WIND_ANGLE);
  let diffAngle=angles.distance(course,windAngle);
  el.relWindHeading=diffAngle<90?diffAngle+"° (Wind ahead)":diffAngle+"° (Wind Astern)";
}

exports.positions = async function (ctx) {

  //console.log('Received get request',ctx.params);
  let shipID=ctx.request.query.shipID;
  const view=fs.readFileSync('reply.html','utf-8');

  await fetch('http://api.routeguard.eu/RouteGuard/v1/ships/'+shipID+'/positions?MinimalData=false&Size=200',{
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSIsImtpZCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSJ9.eyJpc3MiOiJodHRwczovL2FwaS5yb3V0ZWd1YXJkLmV1L2FjY291bnRzL2lkZW50aXR5IiwiYXVkIjoiaHR0cHM6Ly9hcGkucm91dGVndWFyZC5ldS9hY2NvdW50cy9pZGVudGl0eS9yZXNvdXJjZXMiLCJleHAiOjE2MDg0OTY4NDUsIm5iZiI6MTYwODQ5MzI0NSwiY2xpZW50X2lkIjoiYXBpQ2xpZW50MTciLCJzY29wZSI6WyJjbGFpbXMiLCJkZWZhdWx0Iiwib3BlbmlkIiwicmlnaHRzIiwid2ViIl0sInN1YiI6IjE4NzAiLCJhdXRoX3RpbWUiOjE2MDg0OTMyNDUsImlkcCI6Imlkc3J2IiwiVXNlcklkIjoxODcwLCJDdXN0b21lcklkIjo1MTQ0LCJVc2VyTmFtZSI6Il9BUEkgQWNjZXNzIiwiQ29udHJhY3RJZCI6NjE5NCwiQWdyZWVkVG9UZXJtc0FuZENvbmRpdGlvbnMiOmZhbHNlLCJFbWFpbEFkZHJlc3MiOiJKYW4uUGF1bHlAYmJjLWNoYXJ0ZXJpbmcuY29tIiwiRmxlZXRHdWFyZFJvbGVJZCI6MCwiUmVhZEN1c3RvbWVyIjo1MTQ0LCJhbXIiOlsicGFzc3dvcmQiXX0.dSYZ9Hg7TxAFh9CvDz2M5Jl9p5_Yu0XSemtzKyPmR3mFEvnLXPkZAHXIvHhje_MLUii51oVCm4o8WdES4uhGeB1_g4-by-1RlkLKGDNCJG6WptDFQSia5UDRLs1V8Fu1IGklZOyHHi8xKx1T7dWLHYVTt-iwytavWZtmn5Mdl90bmCVsRtldCGFdaytLsNGlek1tho33-wgVXoGLsn1O6ExGGsWqFpaLLG3kBJ_3L1KITzxym-INSrEl8BCIfdkSjzkAdd26grkfDXupNvVhlvIT8WK3xgM1E6RovMLVyXYJeqLYUzg_l-Ey65q1BUzDRMdLNnL_JCmhcBSY-CNuRA',
      'Content-Type': 'application/json'
    }})
    .then(response => response.json())
    .then(data => 
    
    {console.log(data);

      let mDataPoints=[...data.items];
      mDataPoints.forEach(_addDateAndTime); // add properties DATE and TIME from property TIMESTAMP 
      //mDataPoints.forEach(_addRelWindHeading); //add property relWindHeading to show wind direction compared to Heading
      mDataPoints.forEach(el=>el.SPEED_KNOTS=Math.floor(el.calculatedSpeedOverGround*100)/100); //correct Speed from 146 to 14,6kn
      const template=hb.compile(view); 
      ctx.body= template({positions:mDataPoints,shipID});
    });
 
 
};

