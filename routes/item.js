var express = require('express');
var router = express.Router();

function adminonly(req,res,next){
    if (!req.session.isadmin)
        {return res.redirect('/person/login');}
    next();
}



// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', adminonly, function(req, res, next) {
    let query = "SELECT item_id,itemname, category_id, type_id, size, typeprice, status, homepage FROM item";

    // execute query
    db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            }
        res.render('item/allrecords', {allrecs: result });
        });
});



// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT item_id,itemname, itemimage, description, category_id, type_id, subcategory_1, subcategory_2, size, typeprice, status, homepage FROM item WHERE item_id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.render('item/onerec', {onerec: result[0] });
    }
});
});




// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', adminonly, function(req, res, next) {
    let query = "SELECT category_id, category FROM category";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('item/addrec', {category: result});
    });
});




// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', adminonly, function(req, res, next) {
    let insertquery = "INSERT INTO item (itemname, itemimage, description, category_id, type_id, subcategory_1, subcategory_2, size, typeprice, status, homepage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    homepagechecked = false;

    if (req.body.homepage) 
        {homepagechecked = true;}
    else 
        {homepagechecked = false;}
    

    db.query(insertquery,[req.body.itemname, req.body.itemimage, req.body.description, req.body.category_id, req.body.type_id, req.body.subcategory_1, req.body.subcategory_2, req.body.size, req.body.typeprice, req.body.status, homepagechecked],(err, result) => {
        if (err) {
                console.log(err);
                res.render('error');
                } else {
                res.redirect('/item');
                }
            });
    });




// ==================================================
// Route to edit one specific record.
// ==================================================

router.get('/:recordid/edit', adminonly, function(req, res, next) {
    let query = "SELECT item_id,itemname, itemimage, description, category_id, type_id, subcategory_1, subcategory_2, size, typeprice, status, homepage FROM item WHERE item_id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            
            let query = "SELECT category_id, category FROM category";
            // execute query
            db.query(query, (err, cats) => {
                if (err) {
                    console.log(err);
                    res.render('error');
                }
                
            res.render('item/editrec', {onerec: result[0], cats: cats});
            });
        }
    });
});


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminonly, function(req, res, next) {
    let updatequery = "UPDATE item SET itemname = ?, itemimage = ?, description = ?, category_id = ?, type_id = ?, subcategory_1 = ?, subcategory_2 = ?, size = ?, typeprice = ?, status = ?, homepage = ? WHERE item_id = " + req.body.item_id;
    
    homepagechecked = false;

    if (req.body.homepage) 
        {homepagechecked = true;}
    else 
        {homepagechecked = false;}

    db.query(updatequery,[req.body.itemname, req.body.itemimage, req.body.description, req.body.category_id, req.body.type_id, req.body.subcategory_1, req.body.subcategory_2, req.body.size, req.body.typeprice, req.body.status, homepagechecked], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/item');
        }
        });
});


// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', adminonly, function(req, res, next) {
    let query = "DELETE FROM item WHERE item_id = " + req.params.recordid;

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/item');
        }
    });
});
module.exports = router;