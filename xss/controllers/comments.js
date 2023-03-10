const conn = require('../config/database')

const controller = {}

controller.create = async (req, res) => {
    try{
        await conn.query(`
        insert into comments (comment)
        values ($1)
        `, [req.body.comment])

        res.redirect('/')
    }
    catch(error){
        console.error(error)
    }
}

module.exports = controller