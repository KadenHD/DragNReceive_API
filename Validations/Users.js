const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

export const canCreateUser = (currentUser, user) => {
    return (
        currentUser.roleId === sadmin || // Is SuperAdmin
        (currentUser.roleId === admin && user.roleId > admin) // Is Admin and user is partner or client
    );
}

export const canViewUser = (currentUser, user) => {
    return (
        currentUser.roleId === sadmin || // Is superAdmin
        (currentUser.roleId === admin && user.roleId > admin) || // Is Admin and user is partner or client
        user.id === currentUser.id // Is himself
    );
}

export const canDeleteUser = (currentUser, user) => {
    return currentUser.roleId === sadmin && currentUser.roleId != sadmin; // Is SuperAdmin and user isn't SuperAdmin
}

export const canUpdateUser = (currentUser, user) => {
    return (
        currentUser.roleId === sadmin || // Is SuperAdmin
        (currentUser.roleId === admin && user.roleId > admin) || // Is Admin and user is partner or client
        user.id === currentUser.id // Is himself
    );
}