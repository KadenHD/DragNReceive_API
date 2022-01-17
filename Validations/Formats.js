export const isValidEmail = (key) => {
    const re = /\S+@\S+\.\S+/; // "string@string.string" format
    key.length <= 100
    return re.test(key);
}

export const isValidPassword = (key) => {
    return (
        /[A-Z]/.test(key) && // One upper case
        /[a-z]/.test(key) && // One lower case
        /[0-9]/.test(key) && // One number
        /[^A-Za-z0-9]/.test(key) && // One special caracter
        key.length > 7
    );
}

export const isValidLastName = (key) => {
    return (
        key.charAt(0) === key.charAt(0).toUpperCase() && // Start with upper case
        key.length <= 50
    );
}

export const isValidFirstName = (key) => {
    return (
        key.charAt(0) === key.charAt(0).toUpperCase() && // Start with upper case
        key.length <= 50
    );
}

export const isValidTitle = (key) => {
    return (
        key.length <= 60
    );
}

export const isValidContent = (key) => {
    return (
        key.length <= 255
    );
}

export const isValidName = (key) => {
    return (
        key.length <= 50
    );
}

export const isValidPhone = (key) => {
    return (
        key.length = 10
    );
}

export const isValidCity = (key) => {
    return (
        key.length <= 60
    );
}

export const isValidStreet = (key) => {
    return (
        key.length <= 100
    );
}

export const isValidPostal = (key) => {
    return (
        key.length = 5
    );
}

export const isValidPrice = (key) => {
    const split = key.toString().split('.')
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

export const isValidQuantities = (key) => {
    return (
        true // à faire
    );
}

export const isValidDescription = (key) => {
    return (
        true // à faire
    );
}

export const isValidStock = (key) => {
    return (
        true // à faire
    );
}

export const isValidImage = (key) => {
    return (
        true // à faire
    );
}

export const isValidLogo = (key) => {
    return (
        true // à faire
    );
}