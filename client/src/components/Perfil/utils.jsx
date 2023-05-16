export const validateEmail = (email) => {
    return(/.+@.+\.[A-Za-z]+$/.test(email))
}