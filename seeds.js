var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex possimus sapiente doloribus voluptatem commodi eligendi corporis esse tenetur iste? Accusantium cupiditate blanditiis consectetur. Non incidunt sed doloremque obcaecati minus id, nemo adipisci molestias expedita voluptatem iure, atque nihil vero voluptatibus."
    },
    {
        name: "Desert Mesa",
        image: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex possimus sapiente doloribus voluptatem commodi eligendi corporis esse tenetur iste? Accusantium cupiditate blanditiis consectetur. Non incidunt sed doloremque obcaecati minus id, nemo adipisci molestias expedita voluptatem iure, atque nihil vero voluptatibus."
    },
    {
        name: "Canyon Floor",
        image: "https://images.pexels.com/photos/999068/pexels-photo-999068.jpeg?auto=compress",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex possimus sapiente doloribus voluptatem commodi eligendi corporis esse tenetur iste? Accusantium cupiditate blanditiis consectetur. Non incidunt sed doloremque obcaecati minus id, nemo adipisci molestias expedita voluptatem iure, atque nihil vero voluptatibus."
    }
]

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add a few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function (err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;
