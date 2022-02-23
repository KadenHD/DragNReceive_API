const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

export const canCreateUser = (currentUser, user) => {
    return (
        currentUser.roleId === sadmin || /* Is SuperAdmin */
        (currentUser.roleId === admin && user.roleId === partner) /* Is Admin and user is partner */
    );
}

export const canViewUser = (currentUser, user) => {
    return (
        currentUser.roleId === sadmin || /* Is superAdmin */
        (currentUser.roleId === admin &&
            (user.roleId === partner || user.roleId === client)) || /* Is Admin and user is partner or client */
        user.id === currentUser.id /* Is himself */
    );
}

export const canDeleteUser = (currentUser, user) => {
    return (
        currentUser.roleId === sadmin && /* Is SuperAdmin  */
        user.roleId != sadmin /* User isn't SuperAdmin */
    );
}

export const canUpdateUser = (currentUser, user) => {
    return (
        currentUser.roleId === sadmin || /* Is SuperAdmin */
        (currentUser.roleId === admin &&
            (user.roleId === partner || user.roleId === client)) || /* Is Admin and user is partner or client */
        user.id === currentUser.id /* Is himself */
    );
}