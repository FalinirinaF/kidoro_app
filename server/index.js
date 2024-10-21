const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

const schemaData = mongoose.Schema({
    materiaux : String,
    designation : String,
    unite : String,
    nombre : Number,
    dimensionUnique : Number,
    longueur : Number,
    largeur : Number,
    epaisseur : Number,
    qunantite : Number
},{
    timestamps : true
})

const materiauxModel = mongoose.model("materiau",schemaData)

app.get("/", async (req, res) => {
    const data = await materiauxModel.find({})
    res.json({success: true, data: data})
})

app.post("/create", async (req, res) => {
    console.log(req.body)
    const data = new materiauxModel(req.body)
    await data.save()
    res.send({success: true, message: "Données sauvegardées", data: data})
})

app.put("/update", async (req, res) => {
    console.log(req.body)
    const { _id, ...rest } = req.body

    console.log(rest)
    await materiauxModel.updateOne({ _id: _id }, rest)
    res.send({success: true, message: "Données modifiées", data: rest})
})

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    console.log(id)
    await materiauxModel.deleteOne({ _id: id })
    res.send({success: true, message: "Données supprimées"})
})

mongoose.connect("mongodb://localhost:27017/kidoro_db")
    .then(() => {
        console.log("Server connecté")
        app.listen(PORT, () => console.log("Server actif sur le port", PORT))
    })
    .catch((err) => console.log(err))
