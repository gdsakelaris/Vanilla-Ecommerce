var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    
    let query = "SELECT item_id, itemname, itemimage, category_id, type_id, size, typeprice, status, homepage FROM item WHERE homepage = true";

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        
     let query = "SELECT promotion_id, promotitle, promoimage FROM promotion WHERE startdate <= CURRENT_DATE() and enddate >= CURRENT_DATE()";
    // execute query
        db.query(query, (err, result2) => {
            if (err) {
                console.log(err);
                res.render('error');
            }
        res.render('index', {allrecs: result, promos: result2 });
        });   
        
        
       
    }); 
    
});

module.exports = router;
