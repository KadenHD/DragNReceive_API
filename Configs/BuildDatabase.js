import User from '../Models/User.js';
import Role from '../Models/Role.js';
import sequelize from './Database.js'

Role.hasMany(User)
User.belongsTo(Role)

sequelize
    .sync({ force: true })
    .then(result => {
        return (
            Role.create({ id: 1, label: "ADMIN" }),
            Role.create({ id: 2, label: "PARTNER" }),
            Role.create({ id: 3, label: "USER" }),
            User.create({ id: 1, lastname: "admin", firstname: "admin", email: "admin@admin.admin", password: "admin", roleId: 1 }),
            User.create({ id: 2, lastname: "partner", firstname: "partner", email: "partner@partner.partner", password: "partner", roleId: 2 }),
            User.create({ id: 3, lastname: "user", firstname: "user", email: "user@user.user", password: "user", roleId: 3 })
        );
    })
    .then(created => {
        console.log("Database Successfully Created !!!")
        process.exit();
    })
    .catch(err => {
        console.log(err)
    })