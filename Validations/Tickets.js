const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

export const canCreateTicket = (currentUser, ticket) => {
    return (
        currentUser.roleId === partner || /* Is partner */
        currentUser.roleId === client /* Is a client */
    );
}

export const canViewTicket = (currentUser, ticket) => {
    return (
        currentUser.roleId === sadmin || /* Is super admin */
        currentUser.roleId === admin || /* Is admin and ticket of partner or client */
        currentUser.id === ticket.userId /* Is its own ticket */
    );
}

export const canUpdateTicket = (currentUser, ticket) => {
    return (
        currentUser.roleId === sadmin || /* Is super admin */
        currentUser.roleId === admin || /* Is admin */
        currentUser.id === ticket.userId /* Is its own ticket */
    );
}