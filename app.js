const express = require("express");
const cors = require("cors");
const sequelize = require("./utils/database");

const User = require("./models/User");
const Role = require("./models/Role");
const Product = require("./models/Product");
const Category = require("./models/Category");

const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');


const categoryRoutes = require("./routes/CategoryRoutes");
const { ensureAuthenticated } = require("./middleware/authJwt");

const app = express();
var corsOptions = { origin: "http://localhost:8081" };
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Define the validPassword method for user authentication
User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Configure Passport.js for user authentication
passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ where: { username: username } }).then(user => {
      if (!user || !user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect username or password' });
      }
      return done(null, user);
    }).catch(err => {
      return done(err);
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id).then(user => {
    done(null, user);
  }).catch(err => {
    done(err);
  });
});

// Configure express-session
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport and use sessions for authentication
app.use(passport.initialize());
app.use(passport.session());

// Parse JSON requests
app.use(bodyParser.json());


app.get("/", (req, res) => {res.json({ message: "Welcome." })});
app.use('/categories',ensureAuthenticated,categoryRoutes)

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

Product.belongsTo(User);
Product.belongsTo(Category);

Category.hasMany(Product);
Category.belongsTo(User);

Role.belongsToMany(User, {through: "user_roles"});
User.belongsToMany(Role, {through: "user_roles",});
User.hasMany(Product);
User.hasMany(Category);


const rolesList = ["user", "admin", "moderator"];

sequelize
  .sync()
  .then(async (result) => {
    console.log(result);
    for (const roleName of rolesList) {
      const [role, created] = await Role.findOrCreate({
        where: { name: roleName },
      });
      if (created) {
        console.log(`Role '${roleName}' created.`);
      } else {
        console.log(`Role '${roleName}' already exists.`);
      }
    }
  })
  .catch((error) => {
    console.log(error);
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
