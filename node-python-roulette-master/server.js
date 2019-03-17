#!/usr/bin/env node
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('key.pem');
var certificate = fs.readFileSync('cert.pem');
var cors = require('cors');
// var formidable = require('formidable');
var credentials = {key: privateKey, cert: certificate};

var express = require('express');
var app = express();
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var pg = require('pg');

// var routes = require('./routes/index');
// var routes = require('./routes/index');
// var connect = "postgres://postgres:post@127.0.0.1:5432/global_config";

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(6060,function(){console.log('listning to 6060');});
httpsServer.listen(7070,function(){console.log('listning to 7070');});
//app.use(logger('dev'));
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json({ type: 'application/json' }));

// ------------------old------------------------------------------------

var port = process.env.PORT || 7070;

var amqp = require('amqplib/callback_api');
var path = require('path');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  if ('OPTIONS' == req.method) {
     res.sendStatus(200);
   }
   else {
     next();
   }});
// const cors = require('cors')
const corsOptions = {
  origin: 'https://localhost:4200',
  optionsSuccessStatus: 200
}
 app.use(cors(corsOptions))

// var server = https.createServer( options, app );

// server.listen( port, function () {
//     console.log( 'Express server listening on port ' + server.address().port );
// } );


// app.listen(httpsServer);
 
// app.listen(7070, function () {
//   console.log('server running on port 3000');
// })

console.log('This is after the read call');
app.get('/dalembert/deleteSa', deleteSa);
function deleteSa(req, res) {
  console.log('server /deleteSa/options' + req.query.data);
  var options = {
    args:req.query.data
  };
  PythonShell.run('./python_buttons/delete_storageaccount.py', options, function (err, datadelete) {
    console.log("data=----------" +datadelete);
    if (err) res.send(err);
    res.json(datadelete);
  });
}

app.get('/dalembert/deleteRg', deleteRg);
function deleteRg(req, res) {
  console.log('server /deleteRg/options' + req.query.data);
  var options = {
    args:req.query.data
  };
  PythonShell.run('./python_buttons/delete_resgrp.py', options, function (err, datadelete) {
    console.log("data=----------" +datadelete);
    if (err) res.send(err);
    res.json(datadelete);
  });
}

app.get('/dalembert/startServer', startServer);

function startServer(req, res) {
  console.log('server /startServer/options' + req.query.data);
  
  var options = {
    args:req.query.data
  };
  PythonShell.run('./python_buttons/start_vm.py', options, function (err, datastart) {
    // res.setHeader('Content-Type', 'text/json');
    console.log("data=----------" +datastart);
    // var myArray_without_commas = data.map(row => {
    //   return row;
    // }).join("\n")
    if (err) res.send(err);
    res.json(datastart);

  });
}
app.get('/dalembert/stopServer', stopServer);
function stopServer(req, res) {
  console.log('server /stopServer/options' + req.query.data);
  
  var options = {
    args:req.query.data
  };
  PythonShell.run('./python_buttons/stop_vm.py', options, function (err, datastop) {
    // res.setHeader('Content-Type', 'text/json');
    console.log("data=----------" +datastop);
    // var myArray_without_commas = data.map(row => {
    //   return row;
    // }).join("\n")
    if (err) res.send(err);
    res.json(datastop);

  });
}
app.get('/dalembert/deleteServer', deleteServer);
function deleteServer(req, res) {
  console.log('server /deleteServer/options' + req.query.data);
  
  var options = {
    args:req.query.data
  };
  PythonShell.run('./python_buttons/delete_vm.py', options, function (err, datadelete) {
    // res.setHeader('Content-Type', 'text/json');
    console.log("data=----------" +datadelete);
    // var myArray_without_commas = data.map(row => {
    //   return row;
    // }).join("\n")
    if (err) res.send(err);
    res.json(datadelete);

  });
}

app.get('/dalembert/getnic', getnic);
function getnic(req, res) {
  var subId = req.query.data
  console.log('server /addIssue/options' + req.query.data);
 // req.query.x[3]= decodeURIComponent(req.query.x[3]);
  var options = {
    args:req.query.data
  };
  PythonShell.run('./list_python/list_nic.py',options, function (err, data) {
    console.log("data=----------" + data);
    var myArray_without_commas = data.map(row => {

      return row;

    }).join("\n")
    if (err) res.send(err);
    // res.json(myArray_without_commas)
   res.json(data)
  });
}


app.get('/dalembert/getimage', getimage);
function getimage(req, res) {
  var subId = req.query.data
  console.log('server /addIssue/options' + req.query.data);
 // req.query.x[3]= decodeURIComponent(req.query.x[3]);
  var options = {
    args:req.query.data
  };
  PythonShell.run('./list_python/list_image.py',options, function (err, data) {
    console.log("data=----------" + data);
    var myArray_without_commas = data.map(row => {

      return row;

    }).join("\n")
    if (err) res.send(err);
    res.json(myArray_without_commas)
   // res.json(data)
  });
}

app.get('/dalembert/getvmsize', getvmsize);
function getvmsize(req, res) {
  var subId = req.query.data
  console.log('server /addIssue/options' + req.query.data);
 // req.query.x[3]= decodeURIComponent(req.query.x[3]);
  var options = {
    args:req.query.data
  };
  PythonShell.run('./list_python/list_vmSize.py',options, function (err, data) {
    console.log("data=----------" + data);
    if (err) res.send(err);
    res.json(data)
   // res.json(data)
  });
}

app.get('/dalembert/getsubnetname', getsubnetname);
function getsubnetname(req, res) {
  var subId = req.query.data
  console.log('server /addIssue/options' + req.query.data);
 // req.query.x[3]= decodeURIComponent(req.query.x[3]);
  var options = {
    args:req.query.data
  };
  PythonShell.run('./list_python/list_subnets.py',options, function (err, data) {
    console.log("data=----------" + data);
    if (err) res.send(err);
    res.json(data)
   // res.json(data)
  });
}

app.get('/dalembert/getvname', getVname);
function getVname(req, res) {
  var subId = req.query.data
  console.log('server /addIssue/options' + req.query.data);
 // req.query.x[3]= decodeURIComponent(req.query.x[3]);
  var options = {
    args:req.query.data
  };
  PythonShell.run('./list_python/list_vnet.py',options, function (err, data) {
    console.log("data=----------" + data);
    if (err) res.send(err);
    res.json(data)
   // res.json(data)
  });
}

app.get('/dalembert/getresgrp', getResgrp);
function getResgrp(req, res) {
  var subId = req.query.data
  console.log('server /addIssue/options' + req.query.data);
 // req.query.x[3]= decodeURIComponent(req.query.x[3]);
  var options = {
    args:req.query.data
  };
  PythonShell.run('./list_python/list_resgrp.py',options, function (err, data) {
    console.log("data=----------" + data);
    if (err) res.send(err);
    res.json(data)
   // res.json(data)
  });
}

app.get('/dalembert/getlocation', getLocation);
function getLocation(req, res) {
  var subId = req.query.data
  console.log('server /addIssue/options' + req.query.data);
 // req.query.x[3]= decodeURIComponent(req.query.x[3]);
  var options = {
    args:req.query.data
  };
  PythonShell.run('./final/locations.py',options, function (err, data) {
    console.log("data=----------" + data);
    // var myArray_without_commas = data.map(row => {
    //   return row;
    // }).join("\n")
    if (err) res.send(err);
    res.json(data)
   // res.json(data)
  });
}
app.get('/dalembert/getSub', getSub);
function getSub(req, res) {

  PythonShell.run('./final/show_subscriptions_only.py', function (err, data) {
    console.log("data=----------" + data);
    // var myArray_without_commas = data.map(row => {
    //   return row;
    // }).join("\n")
    if (err) res.send(err);
    res.json(data)
  });

}


app.get('/dalembert/sa', readSa);
function readSa(req, res) {

  PythonShell.run('./final/list_storage_account.py', function (err, data) {
    console.log("data=----------" + data);
    var myArray_without_commas = data.map(row => {
      return row;
    }).join("\n")
    if (err) res.send(err);
    res.json(myArray_without_commas)
  });

}

app.get('/dalembert/vn', readVn);
function readVn(req, res) {

  PythonShell.run('./final/listvnet_in_subs.py', function (err, data) {
    console.log("data=----------" + data);
    var myArray_without_commas = data.map(row => {
      return row;
    }).join("\n")
    if (err) res.send(err);
    res.json(myArray_without_commas)
  });

}


app.get('/dalembert/vm', readVm);
function readVm(req, res) {

  PythonShell.run('./final/listvm_in_subscription.py', function (err, data) {
    console.log("data=----------" + data);
    if(data!= undefined && data!=null){
    var myArray_without_commas = data.map(row => {

      return row;
    }).join("\n")
    if (err) res.send(err);
    res.json(myArray_without_commas)
  }
  else{
    console.log("undefined  data=----------" + data);
    res.json("undefined")
  }
    
   
  });

}

app.get('/dalembert/rg', readRg);
function readRg(req, res) {

  PythonShell.run('./final/list_resourcegroups.py', function (err, data) {
    console.log("data=----------" + data);
    var myArray_without_commas = data.map(row => {
      return row;
    }).join("\n")
    if (err) res.send(err);
    res.json(myArray_without_commas)
  });

}

var fileNames = [];
const testFolder = './action_pythons/';

const jsonFolder = './json/';

app.get('/dalembert/readJson', readJson);
function readJson(req, res) {


  filename = req.query.data + ".json";
  // console.log(filename);
  if (fs.existsSync(jsonFolder + filename)) {
    fs.readFile(jsonFolder + filename, (err, data) => {
      if (err) throw err;
      let student = JSON.parse(data);
      console.log(data);
      res.send(student)

      //res.json(data);
    });
  }
  else {
    res.json("nofile")
    //res.send("nofile")
    console.log("no file");

  }
}


app.get('/dalembert/readFile', readFile);
function readFile(req, res) {
  if (fs.existsSync(testFolder)) {
    fs.readdir(testFolder, (err, files) => {
      // files.forEach(file => {

      //   console.log(file);
      //   fileNames.push(file);
      // });
      filesList = files.filter(function (e) {
        return (path.extname(e).toLowerCase() === '.py') || (path.extname(e).toLowerCase() === '.sh')
      });

      console.log(filesList);
      //console.log(fileNames);
      if (filesList != null || filesList != []) {
        res.json(filesList);
      }
      else {
        res.json("nodata");
      }

      // fileNames=[];
      // console.log(fileNames);
    })
  }
  else {
    res.json("nodata");
  }

};

app.get('/dalembert/runcommand', runCommand);


function runCommand(req, res) {
  var dat = JSON.parse(req.query.arrCommand);
  var reqFile = req.query.file;
  var myJsonString = JSON.stringify(req.query.arrCommand);
  let arr = Object.keys(dat).map(k => `${k}=${dat[k]}`);
  let arrvalue = Object.keys(dat).map(k => `${dat[k]}`);
  var options = {
    args:arrvalue
  };
  var dat = JSON.parse(req.query.arrCommand);
  var reqFile = req.query.file;
  var myJsonString = JSON.stringify(req.query.arrCommand);
  let arr = Object.keys(dat).map(k => `${k}=${dat[k]}`);
  let arrvalue = Object.keys(dat).map(k => `${dat[k]}`);
  var options = {
    args:arrvalue
  };
  console.log(arr.join(', '));
  var jsonString = arr.join('  ')
  console.log(dat);
  console.log("string========" + myJsonString);
  console.log("filename=======" + reqFile);

   var cmd = "st2 run Demo." + reqFile + " " + jsonString
  // var command= "sudo doe run Demo.create_resgrp subscription=9f112f74-5515-4c9a-916f-f3a4240ae2d0  location=westus  resgrp=testr"
  var exec = require('child_process').exec;
//var cmd = 'st2 run Demo.create_resgrp subscription=9f112f74-5515-4c9a-916f-f3a4240ae2d0  location=westus  resgrp=testr';

exec(cmd, function(error, stdout, stderr) {
   console.log("@errrrrrrrrrrr====="+error) ;
    console.log("---------output--------"+stdout) ;
	 res.json(stdout);
   
});
  // PythonShell.run('./action_pythons/'+"/"+reqFile+".py",options, function (err, data) {
  //   console.log("data=----------" + data +"errr======="+err);
  //   var myArray_without_commas = data.map(row => {
  //     return row;
  //   }).join("\n")
  //   if (err) res.send(err);
  //   res.json(myArray_without_commas)
  // });

  //   const execFile = require('child_process').execFile;
  // const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  //     if (error) {
  //         console.error('stderr', stderr);
  //         throw error;
  //     }doe run azure.createresource subscription_id=sajkdh6564646 location=
  //     console.log('stdout', stdout);
  // });
}

function run_cmd(cmd, args, callBack) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";

  child.stdout.on('data', function (buffer) { resp += buffer.toString() });
  child.stdout.on('end', function () { callBack(resp) });
}
// 
// VERSION 1: calling python script from a node child process
// 

app.post('/dalembert', callpython);
function callpython(req, res) {
  console.log('server /dalembert/options' + req.body);

  var options = {

    args: [
      subscription_id = "d512d1c4-e52d-4c9e-bda6-b34bf9f30fd4",
      sub_id = 'd512d1c4-e52d-4c9e-bda6-b34bf9f30fd4'
    ]
  };
  PythonShell.run('./test1.py', options, function (err, data) {
    // res.setHeader('Content-Type', 'text/json');
    console.log("data=----------" + data);
    var myArray_without_commas = data.map(row => {

      return row;

    }).join("\n")
    var myJsonString = JSON.stringify(myArray_without_commas);
    console.log(myJsonString);
    if (err) res.send(err);
    res.json(myArray_without_commas)
    // res.send(myJsonString)
  });
}

//test

app.get('/dalembert2', callD_alembert12);

function callD_alembert12(req, res) {
  console.log("callD_alembert2");
  //   let shell = new PythonShell('./test.py', { mode: 'text '});
  // shell.send('hello world!');
  PythonShell.run('./test.py', null, function (err, data) {
    console.log(data);
    if (err) res.send(err);
    res.send(data)
  });
}
app.get('/dalembert4', callD_alembert);

function callD_alembert(req, res) {
  // using spawn instead of exec, prefer a stream over a buffer
  // to avoid maxBuffer issue
  console.log('server /dalembert');
  var spawn = require('child_process').spawn;
  console.log('server /dalembert', spawn);
  var process = spawn('python', ["./d_alembert.py",
    req.query.funds, // starting funds
    req.query.size, // (initial) wager size
    req.query.count, // wager count - number of wagers per sim
    req.query.sims // number of simulations
  ]);

  process.stdout.on('data', function (data) {
    res.send(data.toString());
  });
}

// 
// VERSION 2: calling python script from a node child process, 
// using python-shell npm package (https://github.com/extrabacon/python-shell) 
// thin wrapper on childprocess
//
var PythonShell = require('python-shell');

app.get('/dalembert', callD_alembert2);

function callD_alembert2(req, res) {
  // console.log('server /dalembert/options'+req.query.x[0]);

  // var options = {
  //     args: [
  //       sub_id=req.query.x.toString(),
  //     ]
  //    };
  PythonShell.run('./final/show_subscription.py', function (err, data) {
    // res.setHeader('Content-Type', 'text/json');
    console.log("data=----------" + data);
    var NO_DATA="nodata"
    var myArray_without_commas = data.map(row => {

      return row;

    }).join("\n")
    //var myJsonString = JSON.stringify(myArray_without_commas);

    //console.log(arr);
    if (err) res.send(err);
    //data.sort(function(c1, c2){return c1.id - c2.id})
    res.json(myArray_without_commas)
    // res.json(myArray_without_commas)
    // res.send(myJsonString)
  });
}

app.get('/dalembert/addNewSub', addNewSub);

function addNewSub(req, res) {
  console.log('server /addIssue/options' + req.query.x);
  req.query.x[3]= decodeURIComponent(req.query.x[3]);
  var options = {
    args:req.query.x
  };
  PythonShell.run('./final/add-sub.py', options, function (err, adddata) {
    // res.setHeader('Content-Type', 'text/json');
    console.log("data=----------" +adddata);
    // var myArray_without_commas = data.map(row => {
    //   return row;
    // }).join("\n")
    if (err) res.send(err);
    res.json(adddata);

  });
}
//test

app.get('/dalembert2', callD_alembert12);

function callD_alembert12(req, res) {
  console.log("callD_alembert2");
  //   let shell = new PythonShell('./test.py', { mode: 'text '});
  // shell.send('hello world!');
  PythonShell.run('./test.py', null, function (err, data) {
    console.log(data);
    if (err) res.send(err);
    res.send(data)
  });
}


// VERSION 3
// submit message, wait for response
app.get('/dalembert3', callD_alembert3);

function callD_alembert3(req, res) {
  var input = [
    req.query.funds, // starting funds
    req.query.size, // (initial) wager size
    req.query.count, // wager count - number of wagers per sim
    req.query.sims // number of simulations
  ]

  amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
      var simulations = 'simulations';
      ch.assertQueue(simulations, { durable: false });
      var results = 'results';
      ch.assertQueue(results, { durable: false });

      ch.sendToQueue(simulations, new Buffer(JSON.stringify(input)));

      ch.consume(results, function (msg) {
        res.send(msg.content.toString())
      }, { noAck: true });
    });
    setTimeout(function () { conn.close(); }, 500);
  });
}