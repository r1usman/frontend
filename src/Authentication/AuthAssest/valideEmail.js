export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};
