var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function(req, res, next) {
    let query = "SELECT person_id, firstname, lastname, email, phone, address1, city, state, zip, username, password FROM person";

    // execute query
    db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            }
        res.render('person/allpers', {allpersons: result });
        });
});



// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:persid/show', function(req, res, next) {
    let query = "SELECT person_id, firstname, lastname, email, phone, address1, city, state, zip, username, password FROM person WHERE person_id = " + req.params.persid;

    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.render('person/onepers', {onepers: result[0] });
    }
});
});




// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addperson', function(req, res, next) {
    res.render('person/addpers');
});




// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
    let insertquery = "INSERT INTO person (firstname, lastname, email, phone, address1, city, state, zip, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(insertquery,[req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.address1, req.body.city, req.body.state, req.body.zip, req.body.username, req.body.password],(err, result) => {
        if (err) {
                console.log(err);
                res.render('error');
                } else {
                res.redirect('/person');
                }
            });
    });




// ==================================================
// Route to edit one specific record.
// ==================================================

router.get('/:persid/edit', function(req, res, next) {
    let query = "SELECT person_id, firstname, lastname, email, phone, address1, city, state, zip, username, password FROM person WHERE person_id = " + req.params.persid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('person/editpers', {onepers: result[0] });
        }
        });
});


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
    let updatequery = "UPDATE person SET firstname = ?, lastname = ?, email = ?, phone = ?, address1 = ?, city = ?, state = ?, zip = ?, username = ?, password = ? WHERE person_id = " + req.body.person_id;

    db.query(updatequery,[req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.address1, req.body.city, req.body.state, req.body.zip, req.body.username, req.body.password], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/person');
        }
        });
});


// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:persid/delete', function(req, res, next) {
    let query = "DELETE FROM person WHERE person_id = " + req.params.persid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/person');
        }
    });
});
module.exports = router;