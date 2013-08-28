var http = require('http')
var port = process.env.PORT || 1337;
var request = require('request');
var Firebase = require('firebase');

var myRootRef = new Firebase('https://wind.firebaseIO.com/poole');
var currentTimeStamp = new Date().getTime();
var pause = false;



//thanks to http://www.tnetweather.com/wd-parser.php?site=http%3A%2F%2Fwww.pooleharbourweather.com%2Fweather&submit=Submit

function scrapeLive()
{
   var rand = Math.floor(Math.random()*100000000).toString();
   //var weatherRef = myRootRef.child("weather");
   //var historyRef = myRootRef.child("log").push();
   request('http://www.pooleharbourweather.com/weather/clientraw.txt?' + rand, function (error, response, body) {
     if (!error && response.statusCode == 200) {
      var weatherRef = myRootRef.child("weather");
      var arr = body.split(" ");
      var hourRef = weatherRef.child(arr[29]);      
      var timestamp = new Date();
      // hack daylight savings azure - 1
      timestamp.setHours(parseInt(arr[29])-2);
      timestamp.setMinutes(parseInt(arr[30]));
      timestamp.setSeconds(parseInt(arr[31]));
      console.log(timestamp);
      var data = {
                   's' : arr[1], //avspeed
                   //'MaxGust' : arr[71],
                   'g' : arr[2], //gusts
                   'd' : arr[3]//, //WindDir
                  // 't' : timestamp.getTime()
                  };

 
       hourRef.child(timestamp.getTime()).set(data);
     // historyRef.set(data);
     
    }
  });
}

function logger()
{
  if (!pause)
  {
   var rand = Math.floor(Math.random()*100000000).toString();
   //var weatherRef = myRootRef.child("weather");
   //var historyRef = myRootRef.child("log").push();
   request('http://www.pooleharbourweather.com/weather/clientraw.txt?' + rand, function (error, response, body) {
     if (!error && response.statusCode == 200) {
      var hourRef = myRootRef.child("log");
      var currentRef = myRootRef.child("live");//.push();
      var arr = body.split(" ");
     // var hourRef = weatherRef.child("log");      
      var timestamp = new Date();
      timestamp.setHours(parseInt(arr[29])-1);
      console.log(parseInt(arr[29]));
      timestamp.setMinutes(parseInt(arr[30]));
      timestamp.setSeconds(parseInt(arr[31]));
      if (timestamp.getTime()-currentTimeStamp>1000)
      {
        console.log(timestamp.getTime()-currentTimeStamp);
       console.log(currentTimeStamp);
      currentTimeStamp = timestamp.getTime();
      
      var data = {
                   's' : arr[1], //avspeed
                   //'MaxGust' : arr[71],
                   //'g' : arr[2], //gusts
                   'd' : arr[3], //WindDir
                   't' : timestamp.getTime()
                  };

       currentRef.set(data); 
       hourRef.child(timestamp.getTime()).setWithPriority(data,timestamp.getTime());
     }
     else
     {
      console.log ('last update:' + currentTimeStamp);
       //trimlog(timestamp.getTime());
     }
     //  hourRef.set(data);
     // historyRef.set(data);
     
    }
  });
}
}


function trimlog(timestamp)
{
console.log('t : ' + (timestamp-30000));
    var logref = myRootRef.child("log");//.push();
    var q = logref.startAt(timestamp-30000).limit(10);
    // q.off('child_added');

    q.on('child_added', function(childSnapshot) { 
        console.log(childSnapshot.getPriority());
       

       // myRootRef.child("log").child(childSnapshot.name()).remove();
    });

}

function getZeroPref(i)
{
  return (i.length>1) ? i : '0'+ i;
}


function scrapeHistory()
{
   var rand = Math.floor(Math.random()*100000000).toString();
   var arr,arr2 = [];

var history = myRootRef.child("history");
   request('http://www.pooleharbourweather.com/weather/Clientrawextra.txt?' + rand, function (error, response, body) {
     if (!error && response.statusCode == 200) {
      arr = body.split(" ");
     


           //  request('http://www.pooleharbourweather.com/weather/clientraw.txt?' + rand, function (error, response, body) {
           // if (!error && response.statusCode == 200) {
           //  arr2 = body.split(" ");
            
               history.child("24").update({'AvgSpeed' : arr[565], 'WindDir' : arr[593], 'TimeStamp' : arr[581]});
               history.child("23").update({'AvgSpeed' : arr[564], 'WindDir' : arr[592], 'TimeStamp' : arr[580]});
                history.child("22").update({'AvgSpeed' : arr[563], 'WindDir' : arr[591], 'TimeStamp' : arr[579]});
               history.child("21").update({'AvgSpeed' : arr[562], 'WindDir' : arr[590], 'TimeStamp' : arr[578]});
                history.child("20").update({'AvgSpeed' : arr[20], 'WindDir' : arr[555], 'TimeStamp' : arr[478]});
                history.child("19").update({'AvgSpeed' : arr[19], 'WindDir' : arr[554], 'TimeStamp' : arr[477]});
                history.child("18").update({'AvgSpeed' : arr[18], 'WindDir' : arr[553], 'TimeStamp' : arr[476]});
                history.child("17").update({'AvgSpeed' : arr[17], 'WindDir' : arr[552], 'TimeStamp' : arr[475]});
                history.child("16").update({'AvgSpeed' : arr[16], 'WindDir' : arr[551], 'TimeStamp' : arr[474]});
              // history.child("15").update({'AvgSpeed' : arr2[65], 'WindDir' : arr[550], 'TimeStamp' : arr[473]});
              //  history.child("14").update({'AvgSpeed' : arr2[64], 'WindDir' : arr[549], 'TimeStamp' : arr[472]});
              //  history.child("13").update({'AvgSpeed' : arr2[53], 'WindDir' : arr[548], 'TimeStamp' : arr[471]});
              //  history.child("12").update({'AvgSpeed' : arr2[62], 'WindDir' : arr[547], 'TimeStamp' : arr[470]});



 console.log(arr[32]);

     //       }
     // });
   }});

}


var latest = 0;
var logref = myRootRef.child("log");
 logref.on('child_added', function(c) { 
    latest = c.name();
   // console.log(latest);
/* logref.once('value', function(dataSnapshot) { 
      var counter = 0;
      var refs = [];
          dataSnapshot.forEach(function(childSnapshot) {
            // This code will be called twice.
            var name = childSnapshot.name();
            var childData = childSnapshot.val();
          //   console.log(counter);
           //  console.log(name);
           // console.log(childData);
           counter++;
           refs.push(name);
          });
          refs.reverse();
          //console.log(refs);

          refs.forEach(function(r){
            if ((refs[0]-r)>600000)
            {
              console.log(refs[0]-r);
              logref.child(r).remove();
            }
          })
    });*/


});


var rAv = {};

  logref.on('value', function(dataSnapshot) { 
      var counter=0, tS = 0, tD = 0, avS= 0, avD = 0;
      var refs = [];
          dataSnapshot.forEach(function(childSnapshot) {
            // This code will be called twice.
            var name = childSnapshot.name();
            var childData = childSnapshot.val();
            tD = tD + parseFloat(childData.d);
             tS = tS + parseFloat(childData.s);
        //console.log(parseFloat(childData.d));

           counter++;
           refs.push(name);
          });

if (counter>0)
{
   rAv = { d : tD/counter , s: tS/counter, t:parseInt(latest)};
}
         
//console.log(counter);
//console.log(rAv);

          refs.reverse();
          //console.log(refs);

          refs.forEach(function(r){
            if ((latest-r)>900000)
            {
             // console.log(r);
             logref.child(r).remove();
            }
          })
    });



function hlogger() {
  if (!pause)
  {
console.log(rAv);
   if (rAv)
  {
   // if (rAv.t-currentTimeStamp>1000)
   // {
  var hlogref = myRootRef.child("hlog");
 hlogref.child(rAv.t).setWithPriority(rAv,rAv.t);
 console.log(rAv);
 console.log(new Date());
//}
}
}
}

//scrapeLive();
setTimeout(hlogger,30000);

setInterval(logger,20000);
setInterval(hlogger,600000);
//setInterval(scrapeHistory,600000);

var static = require('node-static');

var fileServer = new static.Server('./dist');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(port);