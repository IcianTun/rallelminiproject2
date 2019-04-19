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

// for reset playground
/*
database.ref("tuntst").set({
	room1:['user1'],
	room2:['room2user'],
	room3:['room3user','dum'],
	room4:[]
});
*/




//QUERY USERS of a room + GET LAST INDEX of a room------------

var test = database.ref("tuntst/room3");
test.on("value", function(data){
	console.log(data.key)
	console.log(data.val())// ARRAY [user in room] //calculate last index or anything with this
	// maybe use set to add data more
	database.ref("tuntst/room55/").set(data.val().concat([4]))
});


// UPDATE ???
//database.ref("tuntst/room44/").set("eiei333");



//remove a room
//database.ref("tuntst/room2").remove();


// END playground-------------------------------//


app.get('/', (req, res) => {
	res.sendStatus(404);
});

app.get('/allrooms',(req,res)=>{
	var tst = database.ref("rooms/");
	tst.on("value", function(data){
		console.log(data.val()) // data.val() = rooms
		res.send(Object.keys(data.val()));
	});
});
/*app.post('/allrooms',(req,res)=>{
	console.log('POST allrooms room_ID')
	console.log(req.body);
	var room_ID = req.body;
	if (!room_ID.id || rooms.includes(room_ID.id)){
		res.status(404).send("ROOM_ID already exists");
	} else {
		rooms.push(room_ID.id);
		res.status(201).send(room_ID);
	}
});
*/
app.put('/allrooms',(req,res)=>{
	console.log(req.body);
	var room_ID = req.body.id
	var tst = database.ref("rooms/");
	tst.on("value", function(data){
		//console.log(data.val()) // data.val() = rooms
		var roomsname = Object.keys(data.val())
		console.log(roomsname)
		if (roomsname.includes(room_ID)){
			res.status(200).send(req.body);
		} else {
			// ADD room to roomsname
			res.status(201).send(req.body);
		}
	});
});

app.delete('/allrooms',(req,res)=>{
	console.log(req.body);
	var room_ID = req.body.id
	var tst = database.ref("rooms/");
	tst.on("value", function(data){
		//console.log(data.val()) // data.val() = rooms
		var roomsname = Object.keys(data.val())
		console.log(roomsname)
		if (!room_ID || !roomsname.includes(room_ID)){
			res.status(404).send("Room id is not found");
		} else {
		database.ref("rooms/"+room_ID).remove();
		res.status(200).send(req.body);
		}
	});
});





// Endpoint room
app.put('/room/roomX', (req,res) =>{


});

app.delete('/room/:roomX',(req,res) =>{
	var user = req.body.user;
	var roomX = (req.params.roomX)
	var idx = -1
	console.log(user)
	console.log(roomX)
	var test = database.ref("rooms/"+roomX);
	test.on("value", function(data){
		console.log("user in rooms")
		console.log(data.val())
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


app.get('/users',(req,res)=>{
	var user = database.ref("users");
	user.on("value", function(data){
		console.log(data.val())
		res.status(200).send(data.val());
	});
});

app.listen(3000,()=>{
	console.log('app is running on port 3000 kub')
});

