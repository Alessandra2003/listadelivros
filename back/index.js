/*
TODO:
Definir função para validar valores
*/
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const app = express();
const port = 8080;
const address = 'http://localhost:';
require('dotenv').config({path:'./.env.production'})

const createPool = () => { 
    if (process.env.NODE_ENV === "production") {
        return new Pool({ connectionString: process.env.DB_URL, ssl: { rejectUnauthorized: false } });
    } 
    else {
        return new Pool({
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            host: process.env.DB_URL,
            password: process.env.DB_PASS,
            port: process.env.DB_PORT
        });
    }
};

async function buscarDados(){
    const buscar = await pool.query("SELECT * FROM listadelivros ORDER BY id")
    const dados =  await buscar.rows
    console.log(buscar)
    console.log(dados)
    return dados
}



const pool = createPool()
app.use(express.json());
app.use(cors());

app.get('/buscarLivros', async(req, res) => {
    pool.query(`CREATE TABLE if not exists produtos_livros_alessandra(
        id serial primary key,
        titulo varchar(50) not null,
        autor varchar(50) not null,
        tipo_de_livro varchar(30) not null,
        preco decimal(10,2) not null,
        editora varchar(30) not null,
        volume int not null,
        ano_de_publicacao date not null,
        quantidade_em_estoque int not null,
        resumo varchar(200),
        capa text


        )`)


    const buscar = buscarDados()
    buscar.then(dados =>{
    res.status(200).send(dados);    
    })

});


app.post('/enviarLivros', (req, res) => {
    const dadosRecebidos = req.body
    console.log(dadosRecebidos)

    const dadosParaEnviar = {
        Titulo_Do_Livro_Recebido: dadosRecebidos.dadosfornecidos.titulo,
        Autor_Do_Livro_Recebido: dadosRecebidos.dadosfornecidos.autor,
        Tipo_De_Livro_Recebido: dadosRecebidos.tipodelivro,
        Preco_Recebido: dadosRecebidos.dadosfornecidos.preco,
        Editora_Recebida: dadosRecebidos.dadosfornecidos.editora,
        Volume_Recebido: dadosRecebidos.dadosfornecidos.volume,
        Ano_De_Publicacao_Recebido: dadosRecebidos.dadosfornecidos.anodepublicacao,
        quantidade_em_estoque: dadosRecebidos.dadosfornecidos.exemplares,
        Resumo_Recebido: dadosRecebidos.dadosfornecidos.resumo,
        Capa_Recebida: dadosRecebidos.dadosfornecidos.capa,
    };

    console.log('Dados Para Enviar')
    console.log(dadosParaEnviar)
    if(dadosParaEnviar.Titulo_Do_Livro_Recebido === ''|| dadosParaEnviar.Tipo_De_Livro_Recebido === ''){
        res.status(400).json('Título do livro vazio ou nenhum tipo de livro especificado');        
    }
    else {
     pool.query(`
        INSERT INTO produtos_livros_alessandra(titulo,autor,tipo_de_livro,editora,volume,ano_de_publicacao,quantidade_em_estoque,resumo,preco,capa)
        values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,[
        dadosParaEnviar.Titulo_Do_Livro_Recebido,
        dadosParaEnviar.Autor_Do_Livro_Recebido,        
        dadosParaEnviar.Tipo_De_Livro_Recebido,
        dadosParaEnviar.Editora_Recebida,
        dadosParaEnviar.Volume_Recebido,
        dadosParaEnviar.Ano_De_Publicacao_Recebido,
        dadosParaEnviar.quantidade_em_estoque,
        dadosParaEnviar.Resumo_Recebido,
        dadosParaEnviar.Preco_Recebido,
        dadosParaEnviar.Capa_Recebida,
        ])

        
    }
});

app.put('/editarLivros', (req, res) => {
    console.log('CHEGARAM DADOS PARA EDITAR')
    const dados = req.body.dadosparaeditar;
        console.log(dados)
        
    pool.query(
    `UPDATE produtos_livros_alessandra SET titulo=$1, autor=$2, tipo_de_livro=$3, preco=$4, editora=$5, volume=$6, ano_de_publicacao=$7, quantidade_em_estoque=$8, resumo=$9, capa=$10 WHERE id=$11 `
    ,[
        dados.campo_titulo,
        dados.campo_autor,
        dados.campo_tipodelivro,
        dados.campo_preco,
        dados.campo_editora,
        dados.campo_volume,
        dados.campo_anodepublicacao,
        dados.campo_exemplares,
        dados.campo_resumo,
        dados.campo_capa,
        dados.campo_iddalinha])

    res.status(200).json('Livros editados com sucesso!');
});

app.delete('/removerLivros', (req, res) => {
    const dadosDeletar = req.body;
    console.log(dadosDeletar)
    
    pool.query(`DELETE FROM produtos_livros_alessandra WHERE id=$1`,[dadosDeletar.linhaParaApagar])
    res.status(200).json('Livro removido com sucesso!');
});

app.listen(port, () => {
    console.log('Servidor aberto na porta ' + port);
});
