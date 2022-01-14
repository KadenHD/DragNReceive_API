export const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/; // "string@string.string" format
    email.length <= 100
    return re.test(email);
}

export const isValidPassword = (password) => {
    return (
        /[A-Z]/.test(password) && // One upper case
        /[a-z]/.test(password) && // One lower case
        /[0-9]/.test(password) && // One number
        /[^A-Za-z0-9]/.test(password) && // One special caracter
        password.length > 7
    );
}

export const isValidLastName = (lastname) => {
    return (
        lastname.charAt(0) === lastname.charAt(0).toUpperCase() && // Start with upper case
        lastname.length <= 50
    );
}

export const isValidFirstName = (firstname) => {
    return (
        firstname.charAt(0) === firstname.charAt(0).toUpperCase() && // Start with upper case
        firstname.length <= 50
    );
}

export const isValidTitle = (title) => {
    return (
        title.length <= 60
    );
}

export const isValidContent = (content) => {
    return (
        content.length <= 255
    );
}

export const isValidName = (name) => {
    return (
        name.length <= 50
    );
}

export const isValidPhone = (phone) => {
    return (
        phone.length = 10
    );
}

export const isValidCity = (city) => {
    return (
        city.length <= 60
    );
}

export const isValidStreet = (street) => {
    return (
        street.length <= 100
    );
}

export const isValidPostal = (postal) => {
    return (
        postal.length = 5
    );
}

export const isValidLogo = (logo) => {
    return (
        true // à faire
    );
}

export const isValidPrice = (price) => {
    const split = price.toString().split('.')
    if (split[1]) { // if float
        return (
            split[0].length <= 9 &&
            split[1].length <= 2
        );
    } else { // if int
        return (
            split[0].length <= 9
        );
    }
}