const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

export const canCreateUser = (currentUser, user) => {
    return (
        currentUser.roleId === sadmin ||
        (currentUser.roleId === admin && user.roleId > admin)
    );
}

export const canViewUser = (currentUser, user) => {
    return (
        currentUser.roleId === sadmin ||
        (currentUser.roleId === admin && user.roleId > admin) ||
        user.id === currentUser.id
    );
}

export const canDeleteUser = (currentUser, user) => {
    return currentUser.roleId === sadmin && currentUser.roleId != sadmin;
}

export const canUpdateUser = (currentUser, user) => {
    return (
        currentUser.roleId === sadmin ||
        (currentUser.roleId === admin && user.roleId > admin) ||
        user.id === currentUser.id
    );
}