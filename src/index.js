const express = require('express');
const path = require('path');
const app = express();
const LogInCollection = require('./mongo'); // Ensure this path is correct
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, '../tempelates');
const publicPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(publicPath));

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/signup', async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            password: req.body.password
        };

        const checking = await LogInCollection.findOne({ name: req.body.name });

        if (checking) {
            // If user already exists, send a response and exit the function
            return res.send("User details already exist");
        } else {
            // If user doesn't exist, insert the new user and render the home page
            await LogInCollection.insertMany([data]);
            return res.status(201).render("home", { naming: req.body.name });
        }
    } catch (error) {
        // If there's an error, send an error response and exit the function
        return res.send("Wrong inputs or an error occurred");
    }
});

app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.name });

        if (check && check.password === req.body.password) {
            // Pass only the username to the template
            res.status(201).render("home", { naming: req.body.name });
        } else {
            res.send("Incorrect password");
        }
    } catch (e) {
        res.send("Wrong details");
    }
});


app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
