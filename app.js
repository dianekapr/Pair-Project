const express = require("express");
const session = require("express-session");
const path = require("path");
const { User, Profile } = require("./models"); // Import Profile
const router = require("./routers/index");

const app = express();
const port = 3300;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
}));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.set("view engine", "ejs");
app.set("views", "./views"); // Ensure views folder is correctly set


// Make session data available in views
app.use(async (req, res, next) => {
    res.locals.session = req.session;

    if (req.session.user) {
        try {
            const profile = await Profile.findOne({ where: { UserId: req.session.user.id } });
            res.locals.session.user.profilePicture = profile ? profile.profilePicture : null;
        } catch (error) {
            console.error("Error fetching profile picture:", error);
        }
    }
    
    next();
});

// Use Router
app.use("/", router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
