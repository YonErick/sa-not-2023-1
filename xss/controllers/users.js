const conn = require('../config/database')

const controller = {}

controller.login = async (req, res) => {
    try{
        // const sql = `
        //     select * from users
        //     where username = '${req.body.username}'
        //     and password = '${req.body.password}'
        // `
        // console.log('SQL:', sql)

        const sql = `select * from users where username = $1 and password = $2`
        
        const result = await conn.query(sql)

        if(result.rows.length > 0) {
            res.render('loggedin', {
                title: 'Seja bem-vindo!',
                message: 'Autenticação concluída com sucesso.'
            })
        }
        else {
            res.render('loggedin', {
                title: 'Acesso negado',
                message:'Usuário ou senha incorretos!'
            })
        }

    }
    catch(error){
        res.render('error', {title:'Erro', error})
    }
}

module.exports = controller