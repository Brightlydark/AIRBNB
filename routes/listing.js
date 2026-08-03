const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLoggedin,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
    //INDEX ROUTE
.get(wrapAsync(listingController.index))
    //CREATE ROUTE
.post(isLoggedin,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));

//NEW ROUTE
router.get("/new",isLoggedin,listingController.renderNewForm);

router.route("/:id")
//SHOW ROUTE
.get(wrapAsync(listingController.showListing))
//UPDATE ROUTE
.put(isLoggedin,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
//DELETE ROUTE
.delete(isLoggedin,isOwner,wrapAsync(listingController.destroyListing));


//EDIT ROUTE
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingController.renderEditForm));


module.exports = router;
