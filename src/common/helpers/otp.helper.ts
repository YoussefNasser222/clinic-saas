
export const generateOtp = () => {
    return Math.floor(Math.random() * 90000 + 10000).toString();
}

export const generateOtpExpire = () => {
    return new Date(Date.now() + 15 * 60 * 1000)
}