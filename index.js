const express=require("express")
const cors=require("cors")
const pg = require("pg")
const app=express()
const {Client,Pool}=pg
const pool=new Pool({
    user:"postgres",
    password:"12345",
    database:"livros",
    port:5432,
    host:"localhost"
})
async function buscardados(){
    const buscar=await pool.query("select * from livros")
    const tratar= buscar.rows
    //console.log(tratar)
    return tratar
}
//buscardados()
async function enviardados(literatura,academicos,didaticos){
    const enviar=await pool.query("insert into livros(literatura,academicos,didaticos) values($1,$2,$3) returning *",[literatura,academicos,didaticos])
}
app.use(express.json())
app.use(cors())
app.listen("8080",()=>{
    console.log("porta 8080")
} )
app.get("/buscarlivros",(req,res)=>{
    const dados= buscardados()
    dados.then(dado=>{
        console.log(dado)
        res.send(dado)
    })
    
    
})
app.post("/enviarlivros",(req,res)=>{
    console.log(req.body)
    let dados=req.body
    enviardados(dados.literatura,dados.academicos,dados.didaticos)
    res.json("livrosenviados")
})