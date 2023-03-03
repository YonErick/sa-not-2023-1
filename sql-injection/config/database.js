const { Poll } = require('pg')

const conn = new Poll({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME

})

async function testConn() {
    try{
        await conn.query('select new()')
        console.log('**POSTGRES: ERRO => ' + error)
    }
    catch(error){
        console.error('** POSTGRES: ERRO => ' + error)
    }
}

testConn()

module.exports = conn