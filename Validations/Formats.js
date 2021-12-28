export const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/; // "string@string.string" format
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
        lastname.length < 50
    );
}

export const isValidFirstName = (firstname) => {
    return (
        firstname.charAt(0) === firstname.charAt(0).toUpperCase() && // Start with upper case
        firstname.length < 50
    );
}