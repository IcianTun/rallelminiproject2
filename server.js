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

//-------------------------------//
// Set fire config 
var config = {
	apiKey: "AIzaSyDRDwUYrkWh9La_pJO411YO75_S-GQsyfE",
	authDomain: "lll-e2868.firebaseapp.com",
	databaseURL: "https://lll-e2868.firebaseio.com/",
	storageBucket: "gs://lll-e2868.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
//CREATE UPDATE DELETE USE SET rer nea oh my godness

app.get('/', (req, res) => {
	res.sendStatus(404);
});

//---Allroom--------------------------//
app.get('/allrooms',(req,res)=>{
	var tst = database.ref("roomsname/");
	tst.once("value", function(data){
		console.log(data.val()) // data.val() = rooms
		res.send(data.val());
	});
});
app.post('/allrooms',(req,res)=>{
	console.log(req.body);
	var room_ID = req.body.id;
	var tst = database.ref("roomsname/")
	tst.once("value", function(data){
		var roomsname = data.val()
		if (roomsname.includes(room_ID.id)){
			res.status(404).send({error:"ROOM_ID already exists"});
		} else {
			database.ref("roomsname").set(roomsname.concat([room_ID]));
			res.status(201).send({id:req.body});
		}
	});
});
app.put('/allrooms',(req,res)=>{
	console.log(req.body);
	var room_ID = req.body.id
	var tst = database.ref("roomsname/");
	tst.once("value", function(data){
		//console.log(data.val()) // data.val() = rooms
		var roomsname = data.val()
		console.log(roomsname)
		if (roomsname.includes(room_ID)){
			res.status(200).send(req.body);
		} else {
			database.ref("roomsname").set(roomsname.concat([room_ID]))	
			res.status(201).send(req.body);
		}
	});
});
app.delete('/allrooms',(req,res)=>{
	console.log(req.body);
	var room_ID = req.body.id
	var tst = database.ref("roomsname/");
	tst.once("value", function(data){
		//console.log(data.val()) // data.val() = rooms
		var roomsname = data.val()
		console.log(roomsname)
		if (!roomsname.includes(room_ID)){
			res.status(404).send({error:"Room id is not found"});
		} else {
			var idx = roomsname.indexOf(room_ID)
			roomsname = roomsname.splice(idx,1);
			console.log("new roomsname")
			console.log(roomsname)
			database.ref("roomsname/").set(roomsname);
			res.status(200).send(req.body);
		}
	});
});
//---End Allroom--------------------------//


//---Room--------------------------//
app.get('/room/:roomX',(req,res)=>{
	var roomX = req.params.roomX;
	var tsl = database.ref("rooms/"+roomX);
	tsl.on("value", function(data){
		var clean = data.val().filter(function (el) {
  			return el != null;
		});
		console.log(clean); // data.val() = roomX
		res.status(200).send(clean);
	});
});
app.post('/room/:roomX',(req,res) =>{
	var user = req.body.user;
	var roomX = req.params.roomX;
	var idx = -1;
	var tstka = database.ref("rooms/"+roomX);
	tstka.once("value", function(data){
		var tmp = data.val()
		var idx = tmp.indexOf(user)
		if (idx!=-1){
			res.status(200).send();
		 }else{
			tmp.push(user);
			tstka.set(tmp);
			res.status(201).send();
		}
	})
});
app.put('/room/:roomX', (req,res) =>{
	var user = req.body.user;
	var roomX = (req.params.roomX)
	var test = database.ref("rooms/"+roomX);
	console.log('hello')
	test.once("value", function(data){
		//console.log(data.val())
		var tmp = data.val()
		console.log(tmp)
		var idx = tmp.indexOf(user)
		if (idx!=-1){
			console.log('if')
			console.log(tmp)
			res.status(200).json({})
		}else{
			tmp.push(user)
			test.set(tmp)
			console.log('else')
			console.log(tmp)
			res.status(201).json({});
		}
	})
});
app.delete('/room/:roomX',(req,res) =>{
	var user = req.body.user;
	var roomX = (req.params.roomX)
	var idx = -1
	console.log(user)
	console.log(roomX)
	var test = database.ref("rooms/"+roomX);
	test.once("value", function(data){
		console.log("user in rooms")
		//console.log(data.val())
		var tmp = data.val()
		var idx = tmp.indexOf(user)
		if (idx!=-1){
			delete tmp[idx]
			test.set(tmp)
			res.status(200).send("USERS_ID leaves the rooms")
		 }else{
			res.status(404).send("User id is not found");
		}
	})
});
//---End Room--------------------------//

//---User--------------------------//
app.get('/users',(req,res)=>{
	var user = database.ref("users");
	user.once("value", function(data){
		console.log(data.val())
		res.status(200).send(data.val());
	});
});
//---End User--------------------------//


app.listen(3000,()=>{
	console.log('app is running on port 3000 kub')
});

