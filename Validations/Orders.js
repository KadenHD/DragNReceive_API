const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

export const canCreateOrder = (currentUser, order) => {
    return (
        currentUser.roleId === client
    );
}
