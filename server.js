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


var test = database.ref("tuntst/);


//CREATE UPDATE DELETE USE SET rer nea oh my godness
/*
// for reset playground
test.set({
	room1:['user1'],
	room2:['room2user'],
	room3:['room3user','dum']
});
*/


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
var test = database.ref("tuntst/room3");
test.on("value", function(data){
	console.log(data.key)
	console.log(data.val()) // ARRAY [user in room] //calculate last index or anything with this
	// maybe use set to add data more
});

// UPDATE ???
//database.ref("tuntst/room2/").set("eiei333");



//remove a room
//database.ref("tuntst/room2").remove();


//-------------------------------//
//----------------------------------------------------------------------
/*
app.listen(3000,()=>{
	console.log('app is running on port 3000 kub')
});
*/
