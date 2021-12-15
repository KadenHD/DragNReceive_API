import bcrypt from 'bcrypt';

// Hash the password
const hashedSadmin = await bcrypt.hash("sadmin", 10);
const hashedAdmin = await bcrypt.hash("admin", 10);
const hashedPartner = await bcrypt.hash("partner", 10);
const hashedUser = await bcrypt.hash("user", 10);

export const roles = [
    { id: "1", label: "SUPERADMIN" }, 
    { id: "2", label: "ADMIN" }, 
    { id: "3", label: "PARTNER" }, 
    { id: "4", label: "USER" }
];

export const users = [
    { id: "1", lastname: "sadmin", firstname: "sadmin", email: "sadmin@sadmin.sadmin", password: hashedSadmin, roleId: "1", shopId: null },
    { id: "2", lastname: "admin", firstname: "admin", email: "admin@admin.admin", password: hashedAdmin, roleId: "2", shopId: null },
    { id: "3", lastname: "partner", firstname: "partner", email: "partner@partner.partner", password: hashedPartner, roleId: "3", shopId: null },
    { id: "4", lastname: "user", firstname: "user", email: "user@user.user", password: hashedUser, roleId: "4", shopId: null }
];

export default { roles, users }