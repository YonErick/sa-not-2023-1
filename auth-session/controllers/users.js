const conn = require('../config/database')
const bcrypt = require('bcrypt')

const controller = {}

// Front-end
controller.formNew = (req, res) => {
  res.render('user_form', {
    title: 'Cadastrar novo usuário'
  })
}

// Back-end
controller.create = async (req, res) => {
  try {
    // TODO: fazer validação dos dados recebidos
    
    // Encriptar a senha
    req.body.password = await bcrypt.hash(req.body.password, 12)

    await conn.query(`
      insert into users (fullname, username, password)
      values ($1, $2, $3)
    `, [
      req.body.fullname,
      req.body.username,
      req.body.password
    ])

    res.render('user_form', {
      title: 'Cadastrar novo usuário',
      message: 'Usuário cadastrado com sucesso'
    })
  }
  catch(error) {
    console.error(error)
  }
}

controller.auth = async (req, res) => {
  try {
    const result = conn.query(`
      select * from users
      where username = $1 and password = $2
    `, [
      req.body.username,
      req.body.password
    ])

    console.log({resultado: result.rows})

    const user = result.rows[0] // Conferir

    const passwordOK = await bcrypt.compare(req.body.password, user.password)

    if(passwordOK) {
      req.session.isLoggedIn = true
      req.session.username = user.username

      res.render('feedback', {
        level: 'success',
        message: 'Login efetuado com sucesso. Usuário autenticado.'
      })
    }
    else {
      res.render('user_login', {
        message:'usuário ou senha invalidos.'
      })
    }

  }
  catch(error) {
    console.error(error)
  }
}

controller.formLogin = (req, res) => {
  res.render('user_login', {
    title: 'Fazer login'
  })
}

module.exports = controller