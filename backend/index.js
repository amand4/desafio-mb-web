const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const PORT = 3000

app.use(express.urlencoded({ extended: true }))

const validateIndividualFields = ({
  email,
  name,
  cpf,
  dateBirth,
  phone,
  password,
  type
})  => {
  return email && name && cpf && dateBirth && phone && password && type
}

const validateCompanyFields = ({
  email,
  socialReason,
  cnpj,
  openDate,
  phone,
  password,
  type
})  => {
  return email && socialReason && cnpj && openDate && phone && password && type
}

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/registration", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
})

app.post("/registration", (req, res) => {
  const {
    type
  } = req.body

  const isValidFields =
    type === "pf"
      ? validateIndividualFields(req.body)
      : validateCompanyFields(req.body)

  if (!isValidFields) {
    return res
      .status(400)
      .json({ message: "Erro ao cadastrar, verifique se preencheu todos os campos!" })
  }
  res.status(200).json({ message: "Usuário cadastrado com sucesso!!" })
})

app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`)
})
