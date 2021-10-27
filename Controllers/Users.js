import { v4 as uuidv4 } from 'uuid';

export const findAllUsers = (req, res) => {
    res.send(users);
}

export const createUser = (req, res) => {
    const user = req.body;

    users.push({ ...user, id: uuidv4() }); // génère un id unique);

    res.send(`${user.firstName} ${user.lastName} added to the DataBase`);
}

export const findOneUser = (req, res) => {
    const { id } = req.params;

    const user = users.find((user) => user.id === id);

    res.send(user);
}

export const deleteUser = (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id !== id);

    res.send(`User with the id ${id} deleted from the DataBase`);
}

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;

    const user = users.find((user) => user.id === id);

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (age) user.age = age;

    res.send(`User with the id ${id} patched elements !`);
}