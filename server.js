var request = require('request');
var Firebase = require('firebase');

var myRootRef = new Firebase('https://poolewind.firebaseIO.com/');



//thanks to http://www.tnetweather.com/wd-parser.php?site=http%3A%2F%2Fwww.pooleharbourweather.com%2Fweather&submit=Submit

function scrapeLive()
{
   var rand = Math.floor(Math.random()*100000000).toString();
   var weatherRef = myRootRef.child("weather");
   request('http://www.pooleharbourweather.com/weather/clientraw.txt?' + rand, function (error, response, body) {
     if (!error && response.statusCode == 200) {
      var arr = body.split(" ");
       weatherRef.set({'StationName' : arr[32], 
                   'AvgSpeed' : arr[1], 
                   'MaxGust' : arr[71],
                   'Gusts' : arr[2], 
                   'WindDir' : arr[3],
                    'TimeStamp' : arr[29] + ':' + arr[30] + ':' + arr[31]});

      }
   });
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





     //       }
     // });
   }});

}


scrapeLive();
scrapeHistory();
setInterval(scrapeLive,5000);
setInterval(scrapeHistory,600000);