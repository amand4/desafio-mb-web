const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const PORT = 3000

app.use(express.urlencoded({ extended: true }))

app.get("/registration", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Seja bem vindo(a)</title>
      </head>
      <body>
        <h1>Seja bem vindo(a)</h1>
        <form action="/registration" method="post">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
          <label for="name">Nome:</label>
          <input type="text" id="name" name="name" required>
          <button type="submit">Enviar</button>
        </form>
      </body>
    </html>
  `)
})

const validateIndividualFields = ({
  email,
  name,
  cpf,
  dateBirth,
  phone,
  password,
})  => {
  return email && name && cpf && dateBirth && phone && password
}

const validateCompanyFields = ({
  email,
  socialReason,
  cnpj,
  openDate,
  phone,
  password,
})  => {
  return email && socialReason && cnpj && openDate && phone && password
}

app.post("/registration", (req, res) => {
  const {
    type
  } = req.body

  if (type !== "pf" && type !== "pj") {
    return res.status(400).send("Invalid record type!")
  }

  const isValidFields =
    type === "pf"
      ? validateIndividualFields(req.body)
      : validateCompanyFields(req.body)

  if (!isValidFields) {
    return res
      .status(400)
      .send(
        "Please, fill in all required fields!"
      )
  }
  res.status(200).json({ message: "User registration completed successfully!" })
})

app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`)
})
