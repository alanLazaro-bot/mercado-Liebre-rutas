// ************ Require's ************
const express = require('express');
const router = express.Router();
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({

    destination: function(req,file,cb){
    
    cb(null, path.resolve('public','images','products'))
    
    },
    
    filename: function (req,file,cb){
    
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
    
    }
    
    })
    
    var upload = multer({storage:storage})

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 



router.get('/create', productsController.create); 
router.post('/',upload.any() ,productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('delete/:id', productsController.destroy); 


module.exports = router;
