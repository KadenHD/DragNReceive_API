const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

export const canCreateShop = (currentUser, user) => {
    return (
        currentUser.roleId === sadmin ||
        currentUser.roleId === admin
    );
}

export const canViewShop = (currentUser, shop) => {
    return (
        currentUser.roleId === sadmin ||
        currentUser.roleId === admin ||
        shop.deleted === false
    );
}

export const canDeleteShop = (currentUser, shop) => {
    return (
        currentUser.roleId === sadmin ||
        currentUser.roleId === admin
    );
}

export const canUpdateShop = (currentUser, shop) => {
    return (
        currentUser.roleId === sadmin ||
        currentUser.roleId === admin ||
        (currentUser.shopId === shop.id && currentUser.roleId === partner && shop.deleted === false)
    );
}