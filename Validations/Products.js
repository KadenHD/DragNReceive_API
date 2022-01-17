const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

export const canCreateProduct = (currentUser, product, shop) => {
    return (
        currentUser.shopId === shop.id &&
        currentUser.roleId === partner
    );
}

export const canDeleteProduct = (currentUser, product, shop) => {
    return (
        currentUser.shopId === shop.id &&
        currentUser.roleId === partner
    );
}

export const canViewProduct = (currentUser, product, shop) => {
    return (
        currentUser.roleId === sadmin ||
        currentUser.roleId === admin ||
        shop.deleted === false ||
        product.deleted === false
    );
}

export const canUpdateProduct = (currentUser, product, shop) => {
    return (
        currentUser.shopId === shop.id &&
        currentUser.roleId === partner
    );
}