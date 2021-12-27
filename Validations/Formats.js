export const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const isValidPassword = (password) => {
    return /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password) &&
        password.length > 7;
}

export const isValidNewPassword = (actualPassword, newPassword) => {
    if (actualPassword === newPassword) return false
    //bcrypt compare le mot de passe dans le user ainsi que dans le actual
    if (!isValidNewPassword(newPassword)) return false
}