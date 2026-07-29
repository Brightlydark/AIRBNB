const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
    module.exports.createReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    console.log(req.body.review);
    let newReview = new Review(req.body.review);
    newReview.author = res.locals.currUser;
    console.log(newReview.author);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New Review created!");
    console.log("Review saved");
    res.redirect(`/listings/${listing.id}`);
};
module.exports.deleteReview = async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
};