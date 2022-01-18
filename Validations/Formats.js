export const isValidEmail = (key) => {
    return (
        /\S+@\S+\.\S+/.test(key) && // "string@string.string" format
        typeof key === 'string' &&
        key.length <= 100
    );
}

export const isValidPassword = (key) => {
    return (
        /[A-Z]/.test(key) && // One upper case
        /[a-z]/.test(key) && // One lower case
        /[0-9]/.test(key) && // One number
        /[^A-Za-z0-9]/.test(key) && // One special caracter
        typeof key === 'string' &&
        key.length > 7
    );
}

export const isValidLastName = (key) => {
    return (
        key.charAt(0) === key.charAt(0).toUpperCase() && // Start with upper case
        typeof key === 'string' &&
        key.length <= 50
    );
}

export const isValidFirstName = (key) => {
    return (
        key.charAt(0) === key.charAt(0).toUpperCase() && // Start with upper case
        typeof key === 'string' &&
        key.length <= 50
    );
}

export const isValidTitle = (key) => {
    return (
        typeof key === 'string' &&
        key.length <= 60
    );
}

export const isValidContent = (key) => {
    return (
        typeof key === 'string' &&
        key.length <= 255
    );
}

export const isValidName = (key) => {
    return (
        typeof key === 'string' &&
        key.length <= 50
    );
}

export const isValidPhone = (key) => {
    return (
        typeof key === 'string' &&
        key.length === 10
    );
}

export const isValidCity = (key) => {
    return (
        typeof key === 'string' &&
        key.length <= 60
    );
}

export const isValidStreet = (key) => {
    return (
        typeof key === 'string' &&
        key.length <= 100
    );
}

export const isValidPostal = (key) => {
    return (
        typeof key === 'number' &&
        key.length === 5
    );
}

export const isValidPrice = (key) => {
    const split = key.toString().split('.')
    if (split[1]) { // if float
        return (
            typeof key === 'number' &&
            split[0].length <= 9 &&
            split[1].length <= 2
        );
    } else { // if int
        return (
            typeof key === 'number' &&
            split[0].length <= 9
        );
    }
}

export const isValidQuantities = (key) => {
    return (
        typeof key === 'number' &&
        key.length <= 11
    );
}

export const isValidDescription = (key) => {
    return (
        typeof key === 'string' &&
        key.length <= 255
    );
}

export const isValidStock = (key) => {
    return (
        typeof key === 'number' &&
        key.length <= 11
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