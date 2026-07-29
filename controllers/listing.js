const Listing = require("../models/listing");
module.exports.index = async(req,res)=>{
    const allListings= await Listing.find();
    res.render("listings/index",{allListings});
};
module.exports.renderNewForm =(req,res)=>{
    res.render("listings/new.ejs");
};
module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate(
        {
            path:"reviews",
            populate:
            {
                path:"author"
            }
        })
    .populate("owner");
    if(!listing){
        req.flash("error","Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};
module.exports.createListing = async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Send valid data for listing");
    }
    const newlisting=new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    await newlisting.save();
    req.flash("success","New listing created!");
    console.log("Response saved");
    res.redirect("/listings");
};
module.exports.renderEditForm = async(req,res)=>{
    const {id}=req.params;
    let listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
};
module.exports.updateListing = async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Send valid data for listing");
    }
    const {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing},{runValidators:true});
    req.flash("success","Listing updated!");
    res.redirect(`/listings/${id}`);
};
module.exports.destroyListing = async(req,res)=>{
    const {id}=req.params;
    let dltList=await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    console.log(dltList)
    res.redirect("/listings");
};