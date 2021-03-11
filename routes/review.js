var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function(req, res, next) {
    let query = "SELECT review_id, person_id, item_id, reviewdate, comments, rating, status FROM review";

    // execute query
    db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            }
        res.render('review/allrev', {allreviews: result });
        });
});



// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:revid/show', function(req, res, next) {
    let query = "SELECT review_id, person_id, item_id, reviewdate, comments, rating, status FROM review WHERE review_id = " + req.params.revid;

    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.render('review/onerev', {onerev: result[0] });
    }
});
});




// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addreview', function(req, res, next) {
    res.render('review/addrev');
});




// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
    let insertquery = "INSERT INTO review (person_id, item_id, reviewdate, comments, rating, status) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(insertquery,[req.body.person_id, req.body.item_id, req.body.reviewdate, req.body.comments, req.body.rating, req.body.status],(err, result) => {
        if (err) {
                console.log(err);
                res.render('error');
                } else {
                res.redirect('/review');
                }
            });
    });




// ==================================================
// Route to edit one specific record.
// ==================================================

router.get('/:revid/edit', function(req, res, next) {
    let query = "SELECT review_id, person_id, item_id, reviewdate, comments, rating, status FROM review WHERE review_id = " + req.params.revid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('review/editrev', {onerev: result[0] });
        }
        });
});


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
    let updatequery = "UPDATE review SET person_id = ?, item_id = ?, reviewdate = ?, comments = ?, rating = ?, status = ? WHERE review_id = " + req.body.review_id;

    db.query(updatequery,[req.body.person_id, req.body.item_id, req.body.reviewdate, req.body.comments, req.body.rating, req.body.status], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/review');
        }
        });
});


// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:revid/delete', function(req, res, next) {
    let query = "DELETE FROM review WHERE review_id = " + req.params.revid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/review');
        }
    });
});
module.exports = router;