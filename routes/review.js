const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedin,validateReview,isAuthor }= require("../middleware.js");
const reviewController = require("../controllers/review.js");





//CREATE REVIEW
router.post("/",isLoggedin,validateReview,wrapAsync(reviewController.createReview));

//DELETE REVIEW
router.delete("/:reviewId",isLoggedin,isAuthor,wrapAsync(reviewController.deleteReview));

module.exports = router;