const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

export const canCreateOrder = (currentUser, order) => {
    return (
        currentUser.roleId === client
    );
}

export const canUpdateOrder = (currentUser, order, product) => {
    return (
        (currentUser.roleId === partner && product.shopId === currentUser.shopId) ||
        (currentUser.roleId === client && order.userId === currentUser.id)
    );
}