//exporting configuration
module.exports={
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_URL,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            charset: 'utf8'
        }
    }
}