const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const firebase = require('firebase');

const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


var tstkub;
//-------------------------------//
// Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    apiKey: "AIzaSyDRDwUYrkWh9La_pJO411YO75_S-GQsyfE",
    authDomain: "lll-e2868.firebaseapp.com",
    databaseURL: "https://lll-e2868.firebaseio.com/",
    storageBucket: "gs://lll-e2868.appspot.com"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();
  var test = database.ref("test/");

	test.on("value", function(data) {
		console.log("datakub")
		console.log(data)
   /*
   data.forEach(function(data) {
      console.log(data.val());
   });
   */
});
//-------------------------------//
//---------------

var rooms = [];

//---------------


app.get('/', (req, res) => {
	res.sendStatus(404);
});


app.get('/allrooms',(req,res)=>{
	res.send(rooms);
});
app.post('/allrooms',(req,res)=>{
	console.log('POST allrooms reqdata')
	console.log(req.body);
	var reqdata = req.body;
	if (!reqdata.id || rooms.includes(reqdata.id)){
		res.status(404).send("ROOM_ID already exists");
	} else {
		rooms.push(reqdata.id);
		res.status(201).send(reqdata);
	}
});
//----------------------------------------------------------------------
/*
app.post('/cart',(req,res)=>{
	var items = req.body.listOfProduct;
	//console.log(items)
	var OrderID = 322;
	var totalPrice = 0;
	var insertValuesTxt = '';
	for (i = 0; i< items.length; i++ ){
		totalPrice += items[i].Price;
		insertValuesTxt += '('+items[i].ItemID+', '+OrderID+')';
		if ( i < items.length -1 ) {
		insertValuesTxt += ',';
		}
	}
	console.log(insertValuesTxt);
	console.log('total Price kub '+totalPrice);
	var datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
	var txtkub = "INSERT INTO purchase_order (OrderID, TotalPrice, Orderdate, CouponID) VALUES ("+OrderID+", "+totalPrice+", '"+datetime+"', NULL);";
	conn.query(txtkub, function(err,results){
		if(err)console.log(err);//throw err;
	})
	conn.query('INSERT INTO SENT_TO (ItemID,OrderID) Values '+insertValuesTxt+';', function(err,response){
		if(err)console.log(err);//throw err;
	})
	
});

//--------THIS ONE IS OPTIONAL , didn't used :( --------------------------------------------------------------
app.get('/home', (req,res) => {
	conn.query("select * from item natural join item_name;", function(err,results){
		if(err)throw err;
		console.log(results);
		res.json(results);
	})
});

//----------------------------------------------------------------------
app.post('/AccPro',(req,res)=>{
	//console.log(req.body); // { newUserName : ' ASDAfasd' }
	var newUserNamekub = req.body.newUserName;
	console.log(newUserNamekub);
	conn.query("UPDATE user SET Username = '"+newUserNamekub+"' WHERE (Username = '"+oldName+"');",function(err,results){
		if(err)throw err;
	});
	oldName = newUserNamekub;
})

//----------------------------------------------------------------------
app.get('/productManage', (req,res) => {
	conn.query('SELECT ItemID,ItemName,Price FROM ITEM NATURAL JOIN item_Name',function(err,results){
		if(err) throw err;
		console.log(results);
		res.json(results);
	});
	
});
app.post('/productManage',(req,res)=>{
	console.log(req.body);
	var deletedID = req.body.ItemID;
	conn.query("DELETE item, item_name FROM item INNER JOIN item_name ON item.ItemName = item_name.ItemName WHERE item.ItemID = "+deletedID+";",function(err,results){
		if(err)throw err;
	});
})
*/
//----------------------------------------------------------------------
app.listen(3000,()=>{
	console.log('app is running on port 3000 kub')
});

