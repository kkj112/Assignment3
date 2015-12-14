var express= require('express');
var app = express();
var mongojs= require('mongojs');
var db=mongojs('tasklist',['tasklist']);
var bodyParser= require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.get('/tasklist', function(req, res){
	console.log("Get Received");
	db.tasklist.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/tasklist', function(req, res){
	console.log(req.body);
	db.tasklist.insert(req.body, function(err,doc){
		res.json(doc);
	});
});

app.delete('/tasklist/:id', function(req, res){
var id=req.params.id;
console.log(id);
db.tasklist.remove({_id: mongojs.ObjectId(id)},function(err,doc){
	res.json(doc);
});

});

app.get('/tasklist/:id', function(req, res){
var id=req.params.id;
console.log(id);
db.tasklist.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
	res.json(doc);
});

});

app.put('/tasklist/:id', function(req, res){
var id=req.params.id;
console.log(req.body.Name);	
db.tasklist.findAndModify({query: {_id: mongojs.ObjectId(id)},
update: {$set: {Name: req.body.Name}},
new: true},function(err,doc){
	res.json(doc);
});

});

app.listen(3000);
console.log("Server running on port 3000");