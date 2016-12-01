var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var admin_user=require('../models/admin_user.js');
var books=require('../models/books.js');
var userschema=require('../models/user.js');
var transactionschema=require('../models/transaction.js');


/* GET /todos book listing. */
router.get('/', function(req, res, next) {
	books.find(function (err, Books) {
	    if (err) return next(err);
	    res.json(Books);
	  });
	});

/* GET /todos User listing. */
router.get('/:id', function(req, res, next) {
	    userschema.find(function (err, userlist) {
		if (err) return next(err);
	    res.json(userlist);
	    });
	});

/* GET /todos/:id add new book. */
router.post('/:id', function(req, res, next) {
	console.log('add new book');
		var book1 = new books({
		"name" :req.body.bookname ,
	    "author" :req.body.authorname ,
	    "av_status" :"available" });
	book1.save(function (err, savedUser) {
		if (err) return next(err);
	    res.json(savedUser);
	});
	});

/* POST /todos login  */
router.post('/', function(req, res, next) {
	admin_user.findOne({"username" : req.body.username,"password":req.body.password},function (err, result) {
    if (err) return next(err);
    var res_obj={};
    if(result!=null){
    	res_obj.text="successfull";
    	res.json(res_obj);
    }
    else{
    	res_obj.text="denied";
        res.json(res_obj);
    }
  });
});

/* PUT /todos/:id  update information*/
router.put('/', function(req, res, next) {
	var today = new Date(); var dd = today.getDate();
	var due_date = new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000));
	if(req.body.status=='borrow'){
	var bookname=req.body.bookname;
	var username=req.body.username;
	books.update({"name" : bookname.trim()}, {"av_status" : "unavailable"}, function (err, post) {
	var track = new transactionschema({
		"username" :username.trim() ,
	    "bookname" :bookname.trim() ,
	    "due_date":due_date,
	    "type" : "borrow"});
	track.save(function (err, savedUser) {
	    if (err) return next(err);
	    res.json(savedUser);
	});
    });
	}
	else{
		var bookname=req.body.bookname;
		books.update({"name" : bookname.trim()}, {"av_status" : "available"}, function (err, post) {
			var track = new transactionschema({
				"username" :'',
			    "bookname" :bookname.trim() ,
			    "due_date":today,
			    "type" : "handover"});
			track.save(function (err, savedUser) {
			    if (err) return next(err);
			    res.json(savedUser);
			});
		    });
	}
});

router.put('/:id', function(req, res, next) {
	var today = new Date(); var dd = today.getDate(); 
	var due_date = new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000));
	if(req.body.status=='borrow'){
	var bookname=req.body.bookname;
	var username=req.body.username;
	books.update({"name" : bookname.trim()}, {"av_status" : "unavailable"}, function (err, post) {
	var track = new transactionschema({
		"username" :username.trim() ,
	    "bookname" :bookname.trim() ,
	    "due_date":due_date,
	    "type" : "borrow"});
	track.save(function (err, savedUser) {
	    if (err) return next(err);
	    res.json(savedUser);
	});
    });
	}
	else{
		var bookname=req.body.bookname;
		books.update({"name" : bookname.trim()}, {"av_status" : "available"}, function (err, post) {
			var track = new transactionschema({
				"username" :'',
			    "bookname" :bookname.trim() ,
			    "due_date":today,
			    "type" : "handover"});
			track.save(function (err, savedUser) {
			    if (err) return next(err);
			    res.json(savedUser);
			});
		    });
	}
});


/* DELETE /todos/:id delete book data*/
router.delete('/:id', function(req, res, next) {
	books.findByIdAndRemove(req.params.id, req.body, function (err, post) {
	  console.log(post);
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
