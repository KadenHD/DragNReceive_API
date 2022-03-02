const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

export const canCreateMessage = (currentUser, ticket) => {
    return (
        (currentUser.roleId === sadmin || /* Is sadmin */
            currentUser.roleId === admin || /* Is admin */
            currentUser.id === ticket.userId) &&/* is own */
        ticket.ticketStatusId === "1"/* ticket is not closed */
    );
}