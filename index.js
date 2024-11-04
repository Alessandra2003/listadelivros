const express = require("express")
const cors = require("cors")
const pg = require("pg")
const app = express()
const { Client, Pool } = pg
const pool = new Pool({
    user: "gilson"||"postgres",
    password: "admin"||"12345" ,
    database: "livros",
    port: 5432,
    host: "localhost"
})

app.use(express.json())
app.use(cors())
app.get("/buscarlivros", async (req, res) => {
    pool.query(`CREATE TABLE if not exists listadelivros(
        id serial primary key,
        titulo VARCHAR(50) not null,
        autor VARCHAR(50) not null,
        tipodelivro VARCHAR(20) not null,
        preco DECIMAL not null,
        editora VARCHAR(30) not null,
        volume INT not null,
        anodepublicacao DATE not null,
        exemplares INT not null
        )`)
    const buscar = await pool.query('SELECT * FROM listadelivros')
    //    console.log(buscar)
    const tratar = await buscar.rows
    console.log(tratar)

    res.json(tratar)
})
app.post("/enviarlivros", async (req, res) => {
    const dados = {
        titulo: req.body.Titulo,
        autor: req.body.Autor,
        tipodelivro: req.body.TipoDeLivro,
        preco: req.body.Preco,
        editora: req.body.Editora,
        volume: req.body.Volume,
        anodepublicacao: req.body.AnoDePublicacao,
        exemplares: req.body.Exemplares
    }
    console.log(dados)
    pool.query(`INSERT INTO listadelivros(titulo,autor,tipodelivro,preco,editora,volume,anodepublicacao,exemplares)
        values($1,$2,$3,$4,$5,$6,$7,$8)
        `, [dados.titulo, dados.autor, dados.tipodelivro, dados.preco, dados.editora, dados.volume, dados.anodepublicacao, dados.exemplares])
    res.json("livrosenviados")
})

app.put("/editarlivros", async (req, res) => {
    console.log(req)
    pool.query(`update livro set Titulo=$1,Autor=$2,Tipodelivro=$4,preco=$5,editora=$6,volume=$7,anodepublicacao=$8,exemplares=$9`)
})


app.delete("/deletarlivros", async (req, res)=>{
    pool.query(`delete from livros where id=$1`,[req.body.id])
})


app.listen("8080", () => {
    console.log("porta 8080")
})