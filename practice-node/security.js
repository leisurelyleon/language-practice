const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require()

const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Mock user database
const users = [
    { id: 1, username: 'user1', password: '$2b'}
];

// Passport local strategy for username/password authentication
passport.use(new LocalStrategy(
    (username, password, done) => {
        const user = users.find(u => u.username === username);
        if (!user) {
            return done(null, false, { message: 'Incorrect username.'});
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return done(err);
            }
            if (!result) {
                return done(null, false, { message: 'Incorrect password.'});
            }
            return done(null, user);
        });
    }
));

// Passport serialization and deserialization of user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the secure application!');
});

app.get('/login', (req, res) => {
    res.send('Login page');
});

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })
);

app.get('/dashboard', isAuthenticated, (req, res) => {
    res.send('Welcome to the dashboard, ${req.user.username}!');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});