var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all categories. Display view to list all categories
// ==================================================

router.get('/', function(req, res, next) {
    let query = "SELECT category_id, category, description FROM category";

    // execute query
    db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            }
        res.render('category/allcats', {allcats: result });
        });
});



// ==================================================
// Route to view one specific category. Notice the view is one record
// ==================================================
router.get('/:catid/show', function(req, res, next) {
    let query = "SELECT category_id, category, description FROM category WHERE category_id = " + req.params.catid;

    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.render('category/onecat', {onecat: result[0] });
    }
});
});




// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addcategory', function(req, res, next) {
    res.render('category/addcat');
});




// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
    let insertquery = "INSERT INTO category (category, description) VALUES (?, ?)";

    db.query(insertquery,[req.body.category, req.body.description],(err, result) => {
        if (err) {
                console.log(err);
                res.render('error');
                } else {
                res.redirect('/category');
                }
            });
    });




// ==================================================
// Route to edit one specific record.
// ==================================================

router.get('/:catid/edit', function(req, res, next) {
    let query = "SELECT category_id, category, description FROM category WHERE category_id = " + req.params.catid;

    // execute query
    db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.render('category/editcat', {onecat: result[0] });
            }
        });
});


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
    let updatequery = "UPDATE category SET category = ?, description = ? WHERE category_id = " + req.body.category_id;

    db.query(updatequery,[req.body.category, req.body.description], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/category');
        }
        });
});

        




// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:catid/delete', function(req, res, next) {
    let query = "DELETE FROM category WHERE category_id = " + req.params.catid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/category');
        }
    });
});
module.exports = router;