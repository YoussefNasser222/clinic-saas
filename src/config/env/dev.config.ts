export default ()=>({
    DB_URL : process.env.DB_URL,
    PORT : process.env.PORT,
    JWT_SECRET : process.env.JWT_SECRET,
    cloud : {
        api_key : process.env.CLOUDINARY_API_KEY,
        api_secret : process.env.CLOUDINARY_API_SECRET,
        cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    }
})