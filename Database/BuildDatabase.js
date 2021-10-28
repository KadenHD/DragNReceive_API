import User from '../Models/User.js';
import Role from '../Models/Role.js';
import sequelize from './DBConfig.js'

sequelize
    .sync({ force: true })
    .then(result => {
        return (
            Role.create({ id: "1", label: "SUPERADMIN" }),
            Role.create({ id: "2", label: "ADMIN" }),
            Role.create({ id: "3", label: "PARTNER" }),
            Role.create({ id: "4", label: "USER" }),
            User.create({ id: "1", lastname: "sadmin", firstname: "sadmin", email: "sadmin@sadmin.sadmin", password: "sadmin", roleId: "1" }),
            User.create({ id: "2", lastname: "admin", firstname: "admin", email: "admin@admin.admin", password: "admin", roleId: "2" }),
            User.create({ id: "3", lastname: "partner", firstname: "partner", email: "partner@partner.partner", password: "partner", roleId: "3" }),
            User.create({ id: "4", lastname: "user", firstname: "user", email: "user@user.user", password: "user", roleId: "4" })
        );
    })
    .then(created => {
        console.log("Database Successfully Created !!!")
        process.exit();
    })
    .catch(err => {
        console.log(err)
    })