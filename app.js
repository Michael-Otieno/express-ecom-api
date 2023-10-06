const express = require("express");
const cors = require("cors");
const sequelize = require("./utils/database");

const User = require("./models/User");
const Role = require("./models/Role");


const app = express()
var corsOptions = { origin: "http://localhost:8081"};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

Role.belongsToMany(User, {
    through: "user_roles"
  });
  User.belongsToMany(Role, {
    through: "user_roles"
});

const rolesList = ["user", "admin", "moderator"];

  
sequelize
.sync().then(async (result)=>{
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
}).catch((error)=>{
    console.log(error);
})



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

