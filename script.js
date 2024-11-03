const tabeladedados = document.getElementById('tabeladedados')
const inputlivrostitulo=document.getElementById("inputlivrostitulo");
const inputlivrosautor=document.getElementById("inputlivrosautor");
const inputlivrostipodelivro=document.getElementById("inputlivrostipodelivro");
const inputlivrospreco=document.getElementById("inputlivrospreco");
const inputlivrosvolume=document.getElementById("inputlivrosvolume");
const inputlivroseditora=document.getElementById("inputlivroseditora");
const inputlivrosanodepublicacao=document.getElementById("inputlivrosanodepublicacao")
const inputlivrosexemplares=document.getElementById("inputlivrosexemplares")

const buttonAdicionar=document.getElementById("buttonAdicionar");
const buttonexcluir=document.getElementById("buttonexcluir");

buttonAdicionar.addEventListener("click",()=>{

    enviardados()
    alert('DadosEnviados')
    location.reload()
    
})
function renderisardados(livros){
    console.log(livros)
    livros.map(livros=>{
        tbody.innerHTML+=`
        <tr>
        <td class="${livros.id}">${livros.titulo}</td>
        <td class="${livros.id}">${livros.autor}</td>
        <td class="${livros.id}">${livro.tipodelivro}</td>
        <td class="${livros.id}">${livros.preco}</td>
        <td class="${livros.id}">${livros.editora}</td>
        <td class="${livros.id}">${livros.volume}</td>
        <td cass="${livros.id}">${livros.anodepublicacao}</td>
        <td class="${livros.id}">${livros.exemplares}</td>
        <td><button id="${livros.id}"onclick="colocarinput(${livros.id})">EDITAR</button></td>
         <td><button id="${livros.id}"onclick="colocarinput(${livros.id})">APAGAR</button></td>
        </tr> `
    })

}



async function enviardados() {
    const req=await fetch("http://localhost:8080/enviarlivros",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
                Titulo: inputlivrostitulo.value,
                Autor: inputlivrosautor.value,
                TipoDeLivro:inputlivrostipodelivro.value,
                Preco: inputlivrospreco.value,
                Editora: inputlivroseditora.value,
                Volume: inputlivrosvolume.value,
                AnoDePublicacao: inputlivrosanodepublicacao.value,
                Exemplares: inputlivrosexemplares.value,
        })
    })
    console.log(req)
}

async function Buscar_Dados(){
    const buscar = await fetch("http://localhost:8080/buscarlivros")
    const dados = await buscar.json()
    console.log(dados)

    dados.map(dado =>{
        console.log(dado)
        const linha = document.createElement('tr')

        const titulo = document.createElement('td')
        titulo.textContent = dado.titulo

        const autor = document.createElement('td')
        autor.textContent = dado.autor

        const tipodelivros = document.createElement('td')
        tipodelivros.textContent = dado.tipodelivro

        const preco = document.createElement('td')
        preco.textContent = dado.preco

        const editora = document.createElement('td')
        editora.textContent = dado.editora

        const volume = document.createElement('td')
        volume.textContent = dado.volume

        const anodepublicacao = document.createElement('td')
        anodepublicacao.textContent = dado.anodepublicacao

        const exemplares = document.createElement('td')
        exemplares.textContent = dado.exemplares                

        const botaoApagar = document.createElement('button')
        botaoApagar.textContent = "APAGAR"
        const botaoEditar = document.createElement('button')
        botaoEditar.textContent = "EDITAR"
        
        
        tabeladedados.appendChild(linha)
        linha.appendChild(titulo)
        linha.appendChild(autor)
        linha.appendChild(tipodelivros)
        linha.appendChild(preco)
        linha.appendChild(editora)
        linha.appendChild(volume)
        linha.appendChild(anodepublicacao)
        linha.appendChild(exemplares)
        linha.appendChild(botaoEditar)
        linha.appendChild(botaoApagar)
    })
    return dados
}




function colocarInput(id){
    const elementosDaLinha = document.getElementsByClassName(`${id}`)
    console.log(elementosDaLinha)
    const botaoConcluido = document.getElementById(`${id}`)
    console.log(botaoConcluido)
    botaoConcluido.textContent = "CONCLUIDO"
     for(let i = 0; i < elementosDaLinha.length; i++){
        const input = document.createElement('input')
        input.id = `input_${i}`
        console.log(i)
         if(elementosDaLinha[i] != undefined){
            elementosDaLinha[i].replaceChild(input,elementosDaLinha[i].firstChild)
         }
        }
        
        
         botaoConcluido.removeAttribute("onclick")
         botaoConcluido.addEventListener('click',botaoClicado=>{
            const titulo = document.getElementById("input_0")
            const autor = document.getElementById("input_1")
            const tipodelivro = document.getElementById("input_2")
            const preco= document.getElementById("input_3")
             const editora = document.getElementById("input_4")
             const volume = document.getElementById("input_5")
             const anodepublicacao = document.getElementById("input_6") 
             const exemplares= document.getElementById("input_7")
            const id = botaoClicado.target.id
            alert('livros ok!!!!')
            console.log(titulo.value,autor.value,tipodelivro.value,preco.value,editora.value,volume.value,anodepublicacao.value,exemplares.valeu,id)
            editar(nome.value,idade.value,email.value,id)
            alert('Dados Editados! Recarregue a página')
         })
        }
        async function editar(nome,idade,email,id) {
            const req = await fetch("http://localhost:8080/editarlivros", {
                method: 'PUT', 
                headers: {'Content-type': 'Application/JSON'},
                body: JSON.stringify({
                    nome: nome,
                    idade: idade,
                    email: email,
                    id: id
                })
            })
            
       }
       async function apagar(id) {
           const req = await fetch("http://localhost:8080/deletarlivros", {
               method: 'DELETE', 
               headers: {'Content-type': 'Application/JSON'},
               body: JSON.stringify({
                   id:id
               })
           })
           alert('Dados Apagados! Recarregue a página')
        }

        Buscar_Dados()
buttonAdicionar.addEventListener("click",()=>{
    enviardados()
    alert(`dadosenviados!!!!`)
})
