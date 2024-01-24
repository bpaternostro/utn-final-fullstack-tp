const userCreatedTemplate = (email, subject, user) => {
    return {
        from: process.env.GMAIL_USER,
        to: email,
        subject:subject,
        html: `<div>
            <h1>Bruno's Marketplace'</h1>
            <h2>Hola ${user.name} ${user.lastname}!!!</h2>
            <p>Tu usuario: ${user.email} fue creado correctamente.</p> 
            <p>Si deseas ingresar a nuestro portal, podes ir al siguiente link: <a href=${process.env.LOGIN_URL}>Click aqui!</a></p>
            <h3>Gracias por confiar en nosotros!!</h3>
        </div>`
    }
}

const userTemplates = {
    create: userCreatedTemplate
}

module.exports = { userTemplates }