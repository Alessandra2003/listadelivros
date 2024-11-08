const address = "http://localhost:8080"
const servicos = {
	enviar:"/enviarLivros",
	buscar:"/buscarLivros",
	editar:"/editarLivros",
	remover:"/removerLivros"

}

let textarea = document.getElementsByTagName('textarea') 
let campos = document.getElementsByTagName('input')
let botoes = document.getElementsByTagName('button')
let linhas = document.getElementsByTagName('tr')
const acoes = document.getElementsByClassName('acoes')
const td = document.getElementsByTagName('td')


let Tipo_De_Livro_Marcado = ()=>{
	const academico = campos.CheckboxAcademico
	const literario = campos.CheckboxLiterario
	const didatico = campos.CheckboxDidatico

	const valores =[academico,literario,didatico]
	const valoresMarcados = valores.filter(valor =>{if(valor.checked === true){console.log(valor.name);return valor.name}})

	if(valoresMarcados.length > 1){
		alert("SELECIONE APENAS UM TIPO DE ALIMENTO!")
		return "Usuário selecionou mais de um tipo de alimento"
	}
	else{
		const camposMarcados = valoresMarcados.map(campoMarcado=>{
			if(campoMarcado.name ==='CheckboxAcademico'){
				return 'acadêmico'
			}
			else if(campoMarcado.name ==='CheckboxLiterario'){
				return 'literário'
			}
			else if(campoMarcado.name === 'CheckboxDidatico'){
				return 'didático'
			}
		})
		if(camposMarcados.length === 0){
			alert('Por favor, marque um tipo de livro!')
			return undefined
		}
		else{
			console.log(camposMarcados)
			return camposMarcados[0]
		}
	}
}
let Dados_Fornecidos = ()=>{
	const dados = {
		titulo: campos.Titulo.value,
	 	autor: campos.Autor.value,
	 	editora: campos.Editora.value,
	 	volume: campos.Volume.value,
	 	anodepublicacao: campos.AnoDePublicacao.value,	 	
	 	exemplares: campos.Exemplares.value,	 		 	
	 	resumo: textarea.Resumo.value,
	 	preco: campos.Preco.value,
	 	capa: campos.Capa.value,
	}
	const dadosParaEnviar = [
		dados.titulo,
		dados.autor,
		dados.editora,
		dados.volume,
		dados.anodepublicacao,
		dados.exemplares,
		dados.resumo,
		dados.preco,
		dados.capa]

	console.log(dadosParaEnviar)
	const existemDadosVazios = dadosParaEnviar.find(dado =>{return dado === ""})
	console.log(existemDadosVazios)
	if(existemDadosVazios === ''){
		alert("Existem dados vazios!")
	}
	else{
		return dados		

	}
}



async function Buscar_Dados(){
	const req = await fetch(address+servicos.buscar)
	const tratar = await req.json()
	return tratar
}

function Adicionar_Botoes_De_Apagar_e_Editar(){
	const targetNode = document;
	const config = { childList: true, subtree: true };
	const callback = function(mutationsList, observer) {

		for(const mutation of mutationsList) {
			if (mutation.type === 'childList') {
				const addedNodes = mutation.addedNodes;
				
				for (const node of addedNodes) {
					for(let i = 0; i < 0+acoes.length; i++){

						switch (node) {
							case linhas[i]:
								const Linha = node
								const idDaLinha = parseInt(Linha.id)
								console.log(idDaLinha)

								const caixasDeAcoes = Linha.lastChild 
									console.log(`LINHA Nº: ${i}`)
									console.log(Linha)
									console.log(caixasDeAcoes)
								const botaoEditar = document.createElement('button')
									botaoEditar.textContent= `EDITAR`
									botaoEditar.className= `editar_${idDaLinha}`

								const botaoApagar = document.createElement('button')
									botaoApagar.textContent= `APAGAR`
									botaoApagar.className= `apagar_${idDaLinha}`
								
								caixasDeAcoes.appendChild(botaoEditar)
								caixasDeAcoes.appendChild(botaoApagar)

								botaoEditar.addEventListener('click',Botao_Clicado =>{
										//alert('oi')
										const classeDoBotao = Botao_Clicado.target.className

									if(classeDoBotao.length > 8){
										const idDoBotaoClicado = classeDoBotao.slice(-2)
										console.log(idDoBotaoClicado)
										Habilitar_Edicao(Botao_Clicado.target)
									}
									else{
										Habilitar_Edicao(Botao_Clicado.target)

									}
								})

								botaoApagar.addEventListener('click',Botao_Clicado =>{
									alert('oi')
									const caixaDeAcaoParente = Botao_Clicado.target.parentElement
									const LinhaParente = caixaDeAcaoParente.parentElement
									const idDaLinhaParente = parseInt(LinhaParente.id)
									console.log(Botao_Clicado)
									console.log(caixaDeAcaoParente)
									console.log(LinhaParente)
									console.log(idDaLinhaParente)

									Apagar_Dados(idDaLinhaParente)
								})															
							}
					}
				}
			}
		}
	};

 	const observer = new MutationObserver(callback);
 	observer.observe(targetNode, config);
}




function Reconhecer_Novos_Valores(ID_Da_Linha_Alterada){
	const linhaAlterada = document.getElementById(`${ID_Da_Linha_Alterada}`) //linhas[ID_Da_Linha_Alterada]
	console.log(linhaAlterada)	
	const camposDaLinhaAlterada = linhaAlterada.children
	console.log(camposDaLinhaAlterada)

	const novosValores = []

	// ESTE TRECHO  ABAIXO VISTORIA OS CAMPOS DE INPUT COM A CLASSE .novoscamposdados_ID 
	// DEPOIS EMPURRA OS VALORES ADICIONADOS AOS INPUTS NO ARRAY novosValores
	// SOMENTE OS TEXTOS SÃO ADICIONADOS AO ARRAY 	
	for(let i = 0; i<camposDaLinhaAlterada.length-1;i++){
		const Campos_Dos_Novos_Valores = document.querySelector(`.novoscamposdados_${i}`)//camposDaLinhaAlterada[i].children
			console.log('ELEMENTOS INPUT QUE TERÃO SEUS VALORES RECONHECIDOS')
			console.log(Campos_Dos_Novos_Valores)

		novosValores.push(Campos_Dos_Novos_Valores.value)

	}
	console.log(novosValores)
	return novosValores

}

function Habilitar_Edicao(Botao_Clicado){
	console.log('BOTÃO CLICADO')
		console.log(Botao_Clicado)

	const classeDoBotao = Botao_Clicado.className
		console.log('CLASSE DO BOTÃO')
		console.log(classeDoBotao)
	
	let idDoBotaoClicado = classeDoBotao[Botao_Clicado.className.length-1]

	const caixaDeAcaoParente = Botao_Clicado.parentElement
		console.log('caixaDeAcaoParente')
		console.log(caixaDeAcaoParente)
	
	const LinhaParente = caixaDeAcaoParente.parentElement
		console.log('LinhaParente')
		console.log(LinhaParente)
	const idDaLinhaParente = parseInt(LinhaParente.id)
		console.log('idDaLinhaParente')
		console.log(idDaLinhaParente)


	if(classeDoBotao.length > 8){
		console.log('A CLASSE DO BOTÃO TEM MAIS DE 8 CARACTERES')
		idDoBotaoClicado = classeDoBotao.substring(7,classeDoBotao.length)
			console.log('ID DO BOTÃO RECORTADO CORRETAMENTE!')
			console.log(idDoBotaoClicado)
	}
	
	const CamposDoParente = LinhaParente.children

	let valoresAntigos = []
	const novosCampos = []
	const capturarNovosValores = []

	const Botao_Concluido = document.createElement('button')
		Botao_Concluido.textContent = "CONCLUÍDO"
		Botao_Concluido.className = `concluido_${idDoBotaoClicado}`
	
	const Botao_De_Editar_Atual = document.querySelector(`.${Botao_Clicado.className}`)

	/* AQUI SERÃO REMOVIDOS OS TEXTOS NODE  DOS TDS DA LINHA PRENTE DO BOTÃO CLICADO */
	console.log('QUANTIDADE DE FILHOS DA LINHA CLICADA')
	console.log(CamposDoParente.length)
	console.log(CamposDoParente)

	for(let i = 0; i< CamposDoParente.length-1;i++){

		valoresAntigos.push(CamposDoParente[i].textContent) // ARMAZENAMENTO DOS VALORES ANTES DA SUBSTITUIÇÃO
		
		const NovosCamposDeDados = document.createElement('input') //DEFINIÇÃO DOS NOVOS INPUTS
			NovosCamposDeDados.className = `novoscamposdados_${i}`
			NovosCamposDeDados.value = valoresAntigos[i]

		switch (CamposDoParente[i]){
			case document.querySelector(`.tdcapa_${idDaLinhaParente}`):
				const campoDeImagem = CamposDoParente[i].firstChild.src
				//alert(campoDeImagem)
				NovosCamposDeDados.value=campoDeImagem
				// statements_1
				break;
			default:
				// statements_def
				break;
		}
		
		CamposDoParente[i].replaceChildren(NovosCamposDeDados) // SUBSTITUIÇÃO
	}
	
	Botao_De_Editar_Atual.replaceWith(Botao_Concluido)







	Botao_Concluido.addEventListener('click',Botao_Clicado=>{
		alert('DadosAtualizados!')
		const classeDoBotao = Botao_Clicado.target.className
		if(classeDoBotao.length > 8){
			console.log(classeDoBotao)
		}		
		ID_Da_Linha_Alterada = idDoBotaoClicado
			console.log(ID_Da_Linha_Alterada)		

		const novosValores = Reconhecer_Novos_Valores(ID_Da_Linha_Alterada)
			console.log('VALORES QUE RETORNARAM DA FUNÇÃO Reconhecer_Novos_Valores:')
			console.log(novosValores)

	


		// OS NOVOS VALORES SERÃO REPASSADOS AOS TDS DA LINHA PARENTE
		// NO CASO, SOMENTE OS TEXTOS.
		// ISSO PROVAVELMENTE VAI ME GERAR UMA BOA DOR DE CABEÇA POR CAUSA QUE A IMAGEM NÃO VAI RECEBER SEU SRC
		for(let i = 0; i<CamposDoParente.length-1;i++){
			//console.log(CamposDoParente[i])
			CamposDoParente[i].replaceChildren(novosValores[i])
			//console.log(CamposDoParente[i])

			switch (CamposDoParente[i]) {
				case document.querySelector(`.tdcapa_${ID_Da_Linha_Alterada}`):
					//alert('message?: DOMString')
					//console.log(CamposDoParente[i])
				 	const novaImagem = document.createElement('img')
				 		novaImagem.className = `capa_${ID_Da_Linha_Alterada}`
				 		novaImagem.src = novosValores[novosValores.length-1]
				 	CamposDoParente[i].replaceChildren(novaImagem)

					// statements_1
					break;
				default:
					// statements_def
					break;
			}
		}



		const campos = {
			campo_iddalinha:ID_Da_Linha_Alterada,
			campo_titulo:document.querySelector(`.titulo_${ID_Da_Linha_Alterada}`).textContent,
			campo_autor:document.querySelector(`.autor_${ID_Da_Linha_Alterada}`).textContent,
			campo_tipodelivro:document.querySelector(`.tipodelivro_${ID_Da_Linha_Alterada}`).textContent,
			campo_editora:document.querySelector(`.editora_${ID_Da_Linha_Alterada}`).textContent,
			campo_volume:document.querySelector(`.volume_${ID_Da_Linha_Alterada}`).textContent,
			campo_anodepublicacao:document.querySelector(`.anodepublicacao_${ID_Da_Linha_Alterada}`).textContent,
			campo_exemplares:document.querySelector(`.exemplares_${ID_Da_Linha_Alterada}`).textContent,
			campo_resumo:document.querySelector(`.resumo_${ID_Da_Linha_Alterada}`).textContent,
			campo_preco:document.querySelector(`.preco_${ID_Da_Linha_Alterada}`).textContent.substring(3,document.querySelector(`.preco_${ID_Da_Linha_Alterada}`).textContent.length),
			campo_capa:document.querySelector(`.capa_${ID_Da_Linha_Alterada}`).src // ESSE ELEMENTO AQUI NÃO EXISTE APÓS A RESUBSTIUIÇÃO. POR ISSO ESSA CARNIÇA NÃO TA ENVIANDO
		}
		console.log(ID_Da_Linha_Alterada)
		console.log(campos)
		
		Editar_Dados(campos)
		
		const Botao_Enviar = document.createElement('button')

		//location.reload()
	})
}


async function Renderizar_Dados(){
	const table = document.getElementsByTagName('table')[0]
	const dados = await Buscar_Dados()
	new Promise(renderizacao =>{
		dados.map(dado=>{
				let tr = document.createElement('tr')
				tr.id=dado.id
				
				let tdTitulo = document.createElement('td')
				tdTitulo.textContent = dado.titulo;
				tdTitulo.className=`titulo_${dado.id}`

				let tdAutor = document.createElement('td')			
				tdAutor.textContent = dado.autor;
				tdAutor.className=`autor_${dado.id}`

				let tdTipoDeLivro = document.createElement('td')			
				tdTipoDeLivro.textContent = dado.tipo_de_livro.toUpperCase();
				tdTipoDeLivro.className=`tipodelivro_${dado.id}`

				let tdPreco = document.createElement('td')			
				tdPreco.textContent = "R$ " + dado.preco;
				tdPreco.className=`preco_${dado.id}`

				let tdEditora = document.createElement('td')			
				tdEditora.textContent = dado.editora; 
				tdEditora.className=`editora_${dado.id}`

				let tdVolume = document.createElement('td')			
				tdVolume.textContent = dado.volume; 
				tdVolume.className=`volume_${dado.id}`



				const tratamentoDoAnoDePublicacao = () => {
					let anoDePublicacao = []
					for (let i = 0; i <10; i++){
						anoDePublicacao.push(dado.ano_de_publicacao[i])

					}
					
					return anoDePublicacao.join('')
				}

				let tdAnoDePublicacao = document.createElement('td')			
				tdAnoDePublicacao.textContent = tratamentoDoAnoDePublicacao(); 
				tdAnoDePublicacao.className=`anodepublicacao_${dado.id}`

				let tdExemplares = document.createElement('td')
				tdExemplares.textContent = dado.exemplares;
				tdExemplares.className=`exemplares_${dado.id}`
				
				let tdResumo = document.createElement('td')			
				tdResumo.textContent = dado.resumo;
				tdResumo.className=`resumo_${dado.id}`
				
				let tdCapa = document.createElement('td')			
				tdCapa.className=`tdcapa_${dado.id}`
		
				let capa = document.createElement('img')			
				capa.src = dado.capa;
				capa.className=`capa_${dado.id}`				

				let acoes = document.createElement('td')
				acoes.className = 'acoes'


				table.appendChild(tr)
				tr.appendChild(tdTitulo)
				tr.appendChild(tdAutor)
				tr.appendChild(tdTipoDeLivro)
				tr.appendChild(tdEditora)
				tr.appendChild(tdVolume)
				tr.appendChild(tdAnoDePublicacao)
				tr.appendChild(tdExemplares)
				tr.appendChild(tdResumo)								
				tr.appendChild(tdPreco)

				tr.appendChild(tdCapa)
				tdCapa.appendChild(capa)

				tr.appendChild(acoes)
			})		
	})

	Adicionar_Botoes_De_Apagar_e_Editar()	

}

async function Enviar_Dados(dadosFornecidos,tipoDeLivro){
	if(dadosFornecidos===undefined || tipoDeLivro===undefined){
		return
	}
	else{
		const req = await fetch(address+servicos.enviar,{
			method:'POST',
			headers:{'Content-Type':'Application/JSON'},
			body:JSON.stringify({
				dadosfornecidos:dadosFornecidos,
				tipodelivro:tipoDeLivro
			})
		})
	}
}

async function Editar_Dados(dados){
	const req = await fetch(address+servicos.editar,{
		method:'PUT',
		headers:{'Content-Type':'Application/JSON'},
		body:JSON.stringify({
			dadosparaeditar:dados
		})
	})
}

async function Apagar_Dados(Linha_Para_Apagar){
	const req = await fetch(address+servicos.remover,{
		method:'DELETE',
		headers:{'Content-Type':'Application/JSON'},
		body:JSON.stringify({
			linhaParaApagar:Linha_Para_Apagar
		})
	})
}

botoes.enviar.addEventListener('click',()=>{
	Enviar_Dados(Dados_Fornecidos(),Tipo_De_Livro_Marcado())
	Renderizar_Dados()
//	location.reload()
})

Renderizar_Dados() 
Adicionar_Botoes_De_Apagar_e_Editar()