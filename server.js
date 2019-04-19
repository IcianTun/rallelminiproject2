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

/*test.then((successMessage) => {
	console.log("yay"+successMessage)
	}).catch((failandrejectedreason) => {
		console.log('Handle rejected promise ('+reason+') here.')
	})
console.log(test)
*/
//CREATE UPDATE DELETE USE SET rer nea oh my godness

// for reset playground
database.ref("tuntst").set({
	room1:['user1'],
	room2:['room2user'],
	room3:['room3user','dum']
});



/*
test.on("value", function(data) {
	//console.log("datakub")
	//console.log(data)
	data.forEach(function(data) {
	//console.log(data)
	console.log(data.key);
	console.log(data.val());
	});
});
*/

//QUERY USERS of a room + GET LAST INDEX of a room------------
/*
var test = database.ref("tuntst/room3");
test.on("value", function(data){
	console.log(data.key)
	console.log(data.val()) // ARRAY [user in room] //calculate last index or anything with this
	// maybe use set to add data more
});
*/

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
*/
app.delete('/allrooms',(req,res)=>{
	console.log(req.body);
	var reqdata = req.body
	var tst = database.ref("rooms/");
	tst.on("value", function(data){
		//console.log(data.val()) // data.val() = rooms
		var roomsname = Object.keys(data.val())
		console.log(roomsname)
		if (!reqdata.id || !roomsname.includes(reqdata.id)){
			res.status(404).send("Room id is not found");
		} else {
		// TODO deletedata
		res.status(200).send(reqdata);
	}
	});
	
});





// Endpoint room
app.put('/room/roomX', (req,res) =>{


});

app.delete('/room/:roomX',(req,res) =>{
	var user = req.body.user;
	var roomX = (req.params.roomX)
	var idx = 0
	test.child(roomX).on("value", function(data) {
		var li = data.val()
		var li2 = data.key
		idx = li.indexOf(user)
	})

	if(idx != -1){
		database.ref('rooms/'+roomX).child(idx).remove().then(function(){
				res.status(200).send("USERS_ID leaves the rooms")
			}).catch(function(error){
				console.log('Error in deleting.')
			})
	}else{
		res.status(404).send("User id is not found");
	}
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

