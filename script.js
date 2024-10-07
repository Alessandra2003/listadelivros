const inputlivrosLiteratura=document.getElementById("inputlivrosLiteratura");
const inputlivrosAcademico=document.getElementById("inputlivrosAcademico");
const inputlivrosDidatico=document.getElementById("inputlivrosDidatico");
const locallivrosAcademicos=document.getElementById("locallivrosAcademicos")
const locallivrosLiteratura=document.getElementById("locallivrosLiteratura")
const locallivrosDidaticos=document.getElementById("locallivrosDidaticos")
const buttonAdicionar=document.getElementById("buttonAdicionar");
const buttonexcluir=document.getElementById("buttonexcluir");

buttonAdicionar.addEventListener("click",()=>{
    let livroLiteratura = inputlivrosLiteratura.value
    let livroAcademicos = inputlivrosAcademico.value
    let livroDidaticos = inputlivrosDidatico.value

    enviardados(livroLiteratura,livroAcademicos,livroDidaticos)
    alert('DadosEnviados')
    location.reload()
    
})
async function enviardados(literatura,academicos,didaticos) {
    const req=await fetch("http://localhost:8080/enviarlivros",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
            literatura:literatura,
            academicos:academicos,
            didaticos:didaticos
        })
    })
}
async function buscardados() {
    const req=await fetch("http://localhost:8080/buscarlivros")
    const tratar=await req.json()
    console.log(tratar)
    tratar.map(livros=>{
        let li=document.createElement("li")
        li.textContent=livros.literatura
        locallivrosLiteratura.appendChild(li)
        let liacademicos=document.createElement("li")
        liacademicos.textContent=livros.academicos
        locallivrosAcademicos.appendChild(liacademicos)
        let lididaticos=document.createElement("li")
        lididaticos.textContent=livros.didaticos
        locallivrosDidaticos.appendChild(lididaticos)

    })
}
buscardados()