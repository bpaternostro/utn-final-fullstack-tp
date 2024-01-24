const productCreatedTemplate = async (email, subject, producto) => {
    return {
        from: process.env.GMAIL_USER,
        to:email,
        subject:subject,
        html: `<h1>Tu producto: ${producto} fue creado correctamente</h1>`
    }
}

const productTemplates = {
    create:productCreatedTemplate
}

module.exports = {productTemplates}