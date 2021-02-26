var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('report/reportmenu');
});

router.get('/itemlist', function(req, res, next){
    let query = "SELECT item_id,itemname, category_id, type_id, size, typeprice, status FROM item";

    // execute query
    db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            }
        res.render('report/itemlist', {allrecs: result });
        });
});

router.get('/perslist', function(req, res, next) {
    let query = "SELECT person_id, firstname, lastname, email, phone, address1, city, state, zip, username, password FROM person";

    // execute query
    db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            }
        res.render('report/perslist', {allpersons: result });
        });
});

router.get('/revlist', function(req, res, next) {
    let query = "SELECT review_id, person_id, item_id, reviewdate, comments, rating FROM review";

    // execute query
    db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            }
        res.render('report/revlist', {allreviews: result });
        });
});

module.exports = router;
