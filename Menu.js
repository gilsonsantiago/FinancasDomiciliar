const Contas       = require("./Contas.js")
const Movimento    = require("./Movimento.js")
const Competencia  = require("./Competencia.js")


class Menu{

  /** ******************************************************** */
  constructor(){

    this.executando = true
   
    this.competencia = new Competencia      
    
  }


  /** ******************************************* */
  inicializacao(){

      while(this.executando){
         
      console.clear()
     
       console.log('==================== MENU =============================')
       console.log('       1 - Cadastrar Contas                            ')
       console.log('       2 - Movimento Financeiro                        ')
       console.log('       3 - Relatórios                                  ')
       console.log('       4 - Sair                                        ')
       console.log('=======================================================')
    
       let opcao = Number(prompt("Digite a sua opção: "))
    
       switch(opcao){
    
        case 1:
           this.cadastrarContas()        
           break
    
        case 2:
           this.cadastrarMovimento()
           break
     
        case 3:
           this.relatorios()      
           break
    
        case 4:

           this.competencia.calcularSaldos()
           
           this.competencia.gravarDadosContas()
           
           this.competencia.gravarDadosMovimento()
           
           this.executando = false
           
           break
         
      }
      
    }


    
  }
   
    
    /** ************************************** */
    cadastrarContas(){
      
       let flag1 = true
    
       while(flag1){
         
         console.clear()
         
         console.log('============= CADASTRAMENTO DE CONTAS =================')
         console.log('       1 - Adicionar nova Conta                        ')
         console.log('       2 - Alterar                                     ')
         console.log('       3 - Excluir                                     ')
         console.log('       4 - Exibir                                      ')
         console.log('       5 - Retorar ao Menu Principal                   ')
         console.log('=======================================================')
    
         let opcao  = Number(prompt("Digite a opção: "))
    
         switch(opcao){
    
          case 1:
           this.incluirContas()        
           break
    
          case 2:
           this.alterarContas()
           break
           
          case 3:
           this.excluirContas()      
           break
    
          case 4:             
           this.exibirContas()              
           prompt("Pressione uma Tecla pra continuar...")  
             
           break    
    
          case 5:
             
           flag1 = false
             
           break
            
        }     
    
      }
      
    }
    
       
    
    /** *********************************************** */
    cadastrarMovimento(){
      
       let flag1 = true  
      
       while(flag1){
    
         console.clear()
         
          console.log('==================== MENU =============================')
          console.log('       1 - Incluir Movimento                           ')
          console.log('       2 - Alterar Movimento                           ')
          console.log('       3 - Excluir Movimento                           ')
          console.log('       4 - Exibir  Movimento                           ')
          console.log('       5 - Retorar ao Menu Principal                   ')
          console.log('=======================================================')
    
         let opcao  = Number(prompt("Digite a opção: "))
    
         switch(opcao){
    
          case 1:
           this.incluirMovimento()        
           break
    
          case 2:
           this.alterarMovimento()
           break
           
          case 3:
           this.excluirMovimento()      
           break
    
          case 4:             
           this.exibirMovimento()        
             
           prompt("Pressione uma Tecla para continuar...")  
             
           break    
    
          case 5:
             
           flag1 = false
             
           break
            
        }   
                
      }
      
    }
    
    /** ************************************************** */
    relatorios(){
      
      let flag1 = true
    
      while(flag1){
    
        console.clear()
        
         console.log('================== RELATÓRIOS =========================')
         console.log('       1 - Saldo Geral  das Contas                     ')
         console.log('       2 - Saldo Mensal das Contas                     ')      
         console.log('       3 - Balancete Mensal                            ')
         console.log('       4 - Balancete Geral                             ')
         console.log('       5 - Linstagem de Lançamentos Mensal             ')   
         console.log('       6 - Retorar ao Menu Principal                   ')
         console.log('=======================================================')
    
          let opcao  = Number(prompt("Digite a opção: "))
    
         switch(opcao){
    
          case 1:
             
           console.clear()      
             
           this.exibirContas()     
             
           prompt("Tecla algo para continuar... ")  
             
           break

          case 2:
             
           console.clear()      
             
           this.saldomensal()  
             
      //     prompt("Tecla algo para continuar... ")  
             
           break             
    
          case 3:
             
           this.balanceteMensal()
             
           break
           
          case 4:
             
           console.clear()    
             
           this.competencia.imprimirBalanceteGeral()  
             
           prompt("Tecla algo para continuar... ")   
             
           break
             
          case 5:

           console.clear()      
             
           this.MovimentoMesal()  
                 
           break                
    
           case 6:
             
           flag1 = false
             
           break
            
        }
        
      }
      
    }
    
    
    /** ********************************************** */
    incluirContas(){
    
       let flag2 = true
          
       while (flag2){
    
          console.clear()

          let id = this.competencia.buscarProximoConta()
          
          console.log('================= INCLUSÃO DE CONTAS===============')    
          console.log('Número da próxima Conta: ' + id )
          let descricao =        prompt("Digite a Descrição da Conta:     ")    
          let tipo      =        prompt("Tipo (R)-Receita (D)-Despesa     ")
          console.log('===================================================')
    
          let conta = new Contas (id, descricao, tipo.toUpperCase())

     /*     if(this.competencia.verificaExisteNumConta(conta.id)){

             prompt ("Número de Conta já existente. Não pode ser gravada!")
            
          } else */ if(this.competencia.verificaExisteDescricaoConta(conta.descricao)){
            
             prompt ("Conta já existente. Não pode ser gravada!")
            
          } else if (!this.competencia.verificaExisteTipoConta(conta.tipo)){

             prompt ("Tipo da conta não permitida. Não pode ser gravada!")
            
          } else {

            this.competencia.adicionarContas(conta)
            
          }             
           
          let opcao  = prompt ("Continuar cadastrando tarefa (S/N) ?")
     
          if(opcao.toUpperCase() == "N"){
            
              flag2 = false
            
          }

         
       }
      
    }


   
    /** ********************************************** */
    alterarContas(){
    
       let flag4 = true
          
       while (flag4){
    
          console.clear()

          this.exibirContas()
         
          let id = Number(prompt("Digite O Código da Conta: "))

          if(id === null || id === 0){

              return
            
          }

          let conta = this.competencia.buscarConta(id)

          if(conta !== []  || conta !== null) {
            
            console.log('')
            console.log('========== ALTERAÇÃO DE CONTAS: DADOS =============')  
            console.log('Descrição da Conta: ' + conta.descricao) 
            console.log('Tipo da Conta     : ' + conta.tipo) 
            console.log('===================================================')
        
         }

         let opcao  = prompt ("Deseja alterar esta Conta (S/N) ?")
     
         if(opcao.toUpperCase() == "S"){
            
             let descricao = prompt("Digite a Descrição da Conta : ")    
             let tipo      = prompt("Tipo (R)-Receita (D)-Despesa: ")


            if(this.competencia.verificaExisteDescricaoConta(descricao)){
            
                 prompt ("Conta já existente. Não pode ser gravada!")
            
            } else if (!this.competencia.verificaExisteTipoConta(tipo.toUpperCase())){

                 prompt ("Tipo da conta não permitida. Não pode ser gravada!")
            
            } else {

                    let indice = this.competencia.buscarIndiceConta(id)

                    this.competencia.contas[indice].descricao = descricao
              
                    this.competencia.contas[indice].tipo = tipo.toUpperCase()

                    this.competencia.gravarDadosContas()

                    this.competencia.contas = this.competencia.lerDadosContas()  // VERIFICAR
                  
                    console.log("Gravadas as alterações com sucesso...")
                            
            }
            
          } 

          console.log('===================================================')
         
          opcao  = prompt ("Deseja Continuar alterando Contas (S/N) ?")
     
          if(opcao.toUpperCase() == "N"){
            
              flag4 = false
            
          }

         
       }
      
    }


    /** ******************************************* */
    excluirContas(){

         let flag3 = true

         while (flag3){
    
           console.clear()   
         
           this.exibirContas()
    
           let id  = Number(prompt ("Digite o Id da Conta a excluir ?"))
    
           console.log(this.competencia.removerContas(id))
    
           let opcao  = prompt ("Continuar a excluir Contas (S/N) ?")
         
           if(opcao.toUpperCase() == "N"){
                
               flag3 = false
                
           }
    
       }  

      
    }
    
    
    /** ************************************** */
    exibirContas(){
    
        console.clear()
          
        console.log('================ EXIBIÇÃO CONTAS ======================')    
    
        this.competencia.exibirContas()
    
        console.log('=======================================================')
      
    } 
    
    
    
    
   
    
    
    /** ********************************************** */
    incluirMovimento(){
    
       let flag2 = true
      
       while (flag2){
    
          console.clear()
           
          console.log('================= INCLUSÃO MOVIMENTO ==================') 
    
          this.exibirContas()
         
          let lacto = this.competencia.buscarProximoLancamento()
       
          console.log('=======================================================')   
          console.log("Número do próximo Lançamento: " + lacto)
          let id           = Number(prompt("Digite O Código da Conta:         "))  
          let data         =        prompt("Digite a Data do lançamento:      ") 
          let valor        = Number(prompt("Digite O Valor do Lançamento:     "))  
          console.log('=======================================================')
    
          let movimento = new Movimento(lacto, id, data, valor)

         /* if(this.competencia.verificaExistelactoMovimento(movimento.lacto)){

            prompt ("Número do Lancamento já existe. Não pode ser gravado...")
            
          } else */
          
         if(!this.competencia.verificaDatalactoMovimento(movimento.data)){

            prompt ("Data invalida. Não pode ser gravado... ")
            
          } else {
            
            this.competencia.adicionaMovimento(movimento)
            
          }
                           
          let opcao  = prompt ("Continuar cadastrando tarefa (S/N) ?")
     
          if(opcao.toUpperCase() == "N"){
            
              flag2 = false
            
          }
         
       }
      
    }


  
    /** ********************************************** */
    alterarMovimento(){
    
      let flag4 = true
      
       while (flag4){
    
          console.clear()

          this.exibirMovimento()

          let lacto = Number(prompt("Digite o Código do Lançamento: "))

          if(lacto === null || lacto === 0){

            return 
            
          }

         let movimento = this.competencia.buscarMovimento(lacto)

         if(movimento !== [] || movimento !== null){

            console.log('============= ALTERAÇÃO DE LANÇAMENTO =================')  
            console.log('Código da Conta   : ' + movimento.id)
            console.log('Data do Lançamento: ' + movimento.data)
            console.log('Valor Lançado     : ' + movimento.valor)            
         
         }

         let opcao  = prompt ("Deseja alterar esta Conta (S/N) ?")
     
           if(opcao.toUpperCase() == "S"){
  
              let id           = Number(prompt("Digite O Código da Conta    : "))  
              let data         =        prompt("Digite a Data do lançamento : ") 
              let valor        = Number(prompt("Digite O Valor do Lançamento: "))  
  
             if(!this.competencia.verificaExisteNumConta(id)){
  
                 prompt("Conta digitada não está cadastrada...")
               
             } else if(!this.competencia.verificaDatalactoMovimento(movimento.data)){
  
                 prompt ("Data invalida. Não pode ser gravado... ")
              
             } else {
  
                 let indice = this.competencia.buscarIndicelactoMovimento(lacto)
  
                 this.competencia.movimento[indice].id = id
  
                 this.competencia.movimento[indice].data = data
  
                 this.competencia.movimento[indice].valor = valor

                 this.competencia.calcularSaldos()
  
                 this.competencia.gravarDadosMovimento()

                 this.competencia.movimento = this.competencia.lerDadosMovimento()  // verificar
  
                 console.log("Gravadas as alterações com sucesso....")
               
             }
  
             
           }
           
           opcao  = prompt ("Continuar cadastrando tarefa (S/N) ?")
       
           if(opcao.toUpperCase() == "N"){
              
                flag4 = false
              
            } 
         
       }
      
    }


  
   /** *************************************** */
   excluirMovimento()
   {

      let flag3 = true
    
       while (flag3){
    
           console.clear()   
         
           this.exibirMovimento()
    
           let lacto  = Number(prompt ("Digite o Número do Lançamento a excluir ?"))
    
           console.log(this.competencia.removerMovimento(lacto))
    
           let opcao  = prompt ("Continuar a excluir Movimento (S/N) ?")
         
           if(opcao.toUpperCase() == "N"){
                
               flag3 = false
                
           }
    
       }  
    
   }

  
    /** ************************************** */
    exibirMovimento(){
    
        console.clear()
          
        console.log('=========== EXIBIÇÃO DOS LANÇAMENTOS ==================')   
      
        this.competencia.exibirMovimento()
    
        console.log('=======================================================')
    
      
    } 

  
  /** ********************************************** */
  balanceteMensal(){
    
         console.clear()

       //   let oBalanceteMensal = []    
           
          console.log('================= BALANCETE MENSAL ====================') 
          let ano = Number(prompt("Digite o Ano:  "))
          let mes = Number(prompt("Digite o Mes:  "))                
          console.log('=======================================================')   

          this.competencia.imprimirBalanceteMensal(mes, ano) 

          prompt("Tecle algo para continuar... ")
    
  } 

 /** ****************************************** */
  saldomensal(){
    
         console.clear()

        //  let saldoMensal = []    
           
          console.log('================= BALANCETE MENSAL ====================') 
          let ano = Number(prompt("Digite o Ano:  "))
          let mes = Number(prompt("Digite o Mes:  "))                
          console.log('=======================================================')   

          this.competencia.imprimirSaldoMensal(mes, ano) 

          console.log('=======================================================') 

          prompt("Tecle algo para continuar... ")
    
  }

  /** ******************************************************************** */
  MovimentoMesal(){

          console.clear()
        
          console.log('================= LISTAGEM MENSAL  ====================') 
          let ano = Number(prompt("Digite o Ano:  "))
          let mes = Number(prompt("Digite o Mes:  "))                
          console.log('=======================================================')   

          this.competencia.imprimirListaemMensal(mes, ano) 

          console.log('=======================================================') 

          prompt("Tecle algo para continuar... ")
    
  }
  
}

module.exports = Menu