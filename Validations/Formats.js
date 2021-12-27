export const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const isValidPassword = (password) => {
    return (
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password) &&
        password.length > 7
    );
}

export const isValidLastName = (lastname) => {
    return (
        lastname.charAt(0) === lastname.charAt(0).toUpperCase() &&
        lastname.length < 50
    );
}

export const isValidFirstName = (firstname) => {
    return (
        firstname.charAt(0) === firstname.charAt(0).toUpperCase() &&
        firstname.length < 50
    );
}