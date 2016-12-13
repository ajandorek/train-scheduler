$(document).ready(function(){

	var config = {
	    apiKey: "AIzaSyDsFML4y__tj1wtlewvC3EgECne-ty-Jiw",
	    authDomain: "train-app-87675.firebaseapp.com",
	    databaseURL: "https://train-app-87675.firebaseio.com",
	    storageBucket: "train-app-87675.appspot.com",
	    messagingSenderId: "381513937298"
  	};
  firebase.initializeApp(config);

  var database = firebase.database();

  var name = "";
  var destination = "";
  var time = "";
  var frequency = "";

	$("#submit").click(function(){
		var name = $("#name").val().trim();
		var destination = $("#destination").val().trim();
		var time = $("#time").val().trim();
		var frequency = $("#frequency").val().trim();

		database.ref().push({
			name: name, 
			destination: destination,
			time: time,
			frequency: frequency
		});

		$("#name").val("");
		$("#destination").val("");
		$("#time").val("");
		$("#frequency").val("");

		return false;
	});

	database.ref().on("child_added", function(snapshot){
		var tFrequency = snapshot.val().frequency;

		var firstTime = snapshot.val().time;

		var firstTimeConverted = moment(firstTime, "hh:mm");

		var currentTime = moment();

		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

		var tRemainder = diffTime % tFrequency;

		var tMinutesTillTrain = tFrequency - tRemainder;

		var nextTrain = moment().add(tMinutesTillTrain, "minutes");
		$("#trains").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + moment(nextTrain).format("hh:mm a") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
	});

});