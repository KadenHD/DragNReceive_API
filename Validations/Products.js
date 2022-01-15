const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

export const canCreateProduct = (currentUser, shop) => {
    return (
        currentUser.id === shop.userId &&
        currentUser.roleId === partner
    );
}

export const canDeleteProduct = (currentUser, shop) => {
    return (
        currentUser.id === shop.userId &&
        currentUser.roleId === partner
    );
}

export const canUpdateProduct = (currentUser, shop) => {
    return (
        currentUser.id === shop.userId &&
        currentUser.roleId === partner
    );
}