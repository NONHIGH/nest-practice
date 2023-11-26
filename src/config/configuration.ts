export default ()=>({
    port: process.env.PORT || 9999,
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        // port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    },
    //otras variables de entorno, es algo como en nextjs y su archivo next.config.js
})