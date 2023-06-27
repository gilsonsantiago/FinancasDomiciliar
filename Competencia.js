const Contas       = require("./Contas.js")
const Movimento    = require("./Movimento.js")

class Competencia{

  /** ******************************************* */
  constructor(){
    
    this.contas = this.lerDadosContas()
    
    this.movto  = this.lerDadosMovimento()

    this.calcularSaldos()

    this.ordenarContas()     //  por tipo de conta
    this.ordenarMovimento()  //  por id   da conta
  }
  

  /** ****************************************** */
  adicionaMovimento(movto){
    
    this.movto.push(movto)

    this.calcularSaldos()

    this.gravarDadosMovimento()

    this.movto = this.lerDadosMovimento()
    
  }

  /** ************************************** */
  adicionarContas(conta){
    
    this.contas.push(conta)

    this.ordenarContas()

    this.gravarDadosContas()

    this.contas = this.lerDadosContas()
    
  }

  /** ************************************* */
  exibirMovimento(){
   
    console.log("Lancto Conta   Descrição        Data Lacto       Valor")
    console.log('-------------------------------------------------------')

    for(let i = 0; i < this.movto.length; i++){

       let descricaoconta = this.buscarConta(this.movto[i].id)

       this.prepararItemMovimento(this.movto[i], descricaoconta.descricao)
      
    }
    
  }




  
  /** ****************************** */
  prepararItemMovimento(imovto, descricao){

       console.log(imovto.lacto.toString().padStart(6,' '), 
                   imovto.id.toString().padStart(4,' '),
                   descricao.padEnd(19,' '),
                   imovto.data.padStart(10,' '),
                   imovto.valor.toFixed(2).toString().padStart(12,' '))                  
      
  }

  /** **************************** */
  exibirContas(){
    
   this.calcularSaldos()

    console.log("Conta         Descriçao              Tipo       Saldo")
    console.log('-------------------------------------------------------')

     for(let i = 0; i < this.contas.length; i++){

         this.preparaItemConta(this.contas[i])
        
      }
    
  }

  /** ****************************** */
  preparaItemConta(contas){

       console.log(contas.id.toString().padStart(5,' '), 
                   contas.descricao.padEnd(30,' '),
                   contas.tipo.padStart(4,' '),
                   contas.saldo.toFixed(2).toString().padStart(12,' '))
      
  }

  

  /** ********************************** */
  gravarDadosContas(){

    const fs = require('fs')

   // fs.unlinkSync('Contas.json', function (err){
    
       fs.writeFileSync('Contas.json', JSON.stringify(this.contas))      
    
   // })

  
  } 

  /** ********************************** */
  gravarDadosMovimento(){

     const fs = require('fs')
 
     fs.writeFileSync('Movimento.json', JSON.stringify(this.movto))  
    
  }

  /** *************************************** */
  lerDadosContas(){

    const fs = require('fs')
    
    let dados = fs.readFileSync("Contas.json")
   
    let lista = JSON.parse(dados.toString())

   // console.log(lista)

    this.contas = lista.map(
      
      i => new Contas(
        i.id,
        i.descricao,
        i.tipo,
        i.saldo        
      )) 

        
    return this.contas    
    
  }
  

  /** **************************************** */
  lerDadosMovimento(){

    const fs = require('fs')
    
    let dados = fs.readFileSync("Movimento.json")
   
    let lista = JSON.parse(dados.toString())

   // console.log(lista)

    this.movimento = lista.map(
      
      i => new Movimento(
        i.lacto,
        i.id,
        i.data,
        i.valor        
      )) 
    
    return this.movimento   
    
  } 


  /** ******************************************************* */
  verificaExistelactoMovimento(lacto){

     for(let i=0; i < this.movto.length; i++){
        
        if (this.movto[i].lacto === lacto){
          
              return true
          
          } 
       
      }
  
      return false
  
    }

   /** ******************************************************* */
   verificaExisteContaMovimento(id){

     for(let i=0; i < this.movto.length; i++){
        
        if (this.movto[i].id === id){
          
              return true
          
          } 
       
      }
  
      return false
  
    }
  

  /** ******************************************************* */
   verificaDatalactoMovimento(data){

     let [dia, mes, ano] =  data.split('/') 

     let flag = true
     
     if(dia < 1 || dia > 31){

       flag = false
       
     } else if( mes < 1|| mes > 12){

        flag = false
       
     } else if( data.length !== 10) {

        flag = false
     }

     return flag
  
    }


  
  /** ******************************************************* */
  verificaExisteNumConta(id){

     for(let i=0; i < this.contas.length; i++){
        
        if (this.contas[i].id === id){
          
              return true
          
          } 
       
      }

      return false  
    }


  
   /** ******************************************************* */
   verificaExisteTipoConta(tipo){

     if(tipo === 'R' || tipo === 'D'){
       return true
     } else {
       return false
     }
     
    }

 
  /** ******************************************************* */
  verificaExisteDescricaoConta(descricao){

     for(let i=0; i < this.contas.length; i++){
        
        if (this.contas[i].descricao === descricao){
          
              return true
          
          } 
       
      }
  
      return false
  
   }




  /** ******************************************************* */
  buscarIndicelactoMovimento(lacto){

     for(let i=0; i < this.movto.length; i++){
        
        if (this.movto[i].lacto === lacto){
          
              return [i]
          
          } 
       
      }
  
      return -1
  
    }


  /** *************************************** */
  buscarProximoLancamento(){

    let numproximo

    if(this.movto.length == 0){

      numproximo = 0
      
    } else {

      numproximo = this.movto[0].lacto
      
    }

        
    for(let i = 0; i < this.movto.length; i++){
      
       if(this.movto[i].lacto > numproximo){
         
           numproximo = this.movto[i].lacto
       }
    }

    return numproximo + 1
    
  }

  
   /** *************************************** */
   buscarProximoConta(){

   let numproximo 

   if(this.contas.length == 0){

     numproximo = 0
     
   } else {

     numproximo = this.contas[0].id
   }
      
    for(let i = 0; i < this.contas.length; i++){
      
       if(this.contas[i].id > numproximo){
         
           numproximo = this.contas[i].id
       }
    }

    return numproximo + 1
    
  }


 

   /** ******************************************************* */
   buscarIndiceConta(id){

     for(let i=0; i < this.contas.length; i++){
        
        if (this.contas[i].id === id){
          
              return [i]
          
          } 
       
      }
  
      return -1
  
    }
  

  
  /** ******************************************************* */
  buscarConta(id){

     for(let i=0; i < this.contas.length; i++){
        
        if (this.contas[i].id === id){
          
              return this.contas[i]
          
          } 
       
      }

      return []
    
    }


  /** ******************************************************* */
  buscarMovimento(lacto){

     for(let i=0; i < this.movto.length; i++){
        
        if (this.movto[i].lacto === lacto){
          
              return this.movto[i]
          
          } 
       
      }

      return []
    
    }

  

   //****************************************************
   removerContas(id){

     let mensagem = "Conta não existe ou já excluida..."

     if(this.verificaExisteNumConta(id)){

         if(this.verificaExisteContaMovimento(id)){
  
             return mensagem = "Existe Lançamento nesta conta. Não pode ser excluida"
           
         } else {

             let indice = this.buscarIndiceConta(id)

              if(indice > -1)
               {
               
                   this.contas.splice(indice, 1)
                   this.calcularSaldos()
                   this.gravarDadosContas()

                   this.contas = this.lerDadosContas()
      
                   return mensagem = "Conta excluida com sucesso...."
                   
               } else {

                  return mensagem = "Ocorreu um erro fatal ao tentar excluir ..."
                 
               }
                         
          }
  
         
       } else {

         return mensagem = "Conta não existe..."     
       
       }         
  
   }


   //****************************************************
   removerMovimento(lacto){

     let mensagem = "Lançamento não existe ou já excluido..."

     if(this.verificaExistelactoMovimento(lacto)){

       let indice = this.buscarIndicelactoMovimento(lacto)

       if(indice > -1)
       {
     
          this.movto.splice(indice, 1)

          this.calcularSaldos()

          this.gravarDadosMovimento()

          this.movto = this.lerDadosMovimento()

          return  mensagem = "Lançamento excluido com sucesso...."
         
       }  else {

           return mensagem = "Ocorreu um erro fatal ao tentar excluir ..."
         
       }
              
     } else {

       return mensagem = "Lançamento não existe ou já excluido..."
       
     }

  
   }

  /** *************************************** */
  calcularSaldos(){

    for(let i= 0; i< this.contas.length; i++){

       let saldo = 0.00
      
       for(let y =0 ; y < this.movto.length; y++){

           if(this.movto[y].id == this.contas[i].id){

              saldo += this.movto[y].valor
             
           }

           this.contas[i].saldo = saldo         
       }     
      
    }     
    
  }


  /** *************************************** */
  calcularSaldosMensal(ano, mes){

    for(let i= 0; i< this.contas.length; i++){

       let saldo = 0.00
      
       for(let y =0 ; y < this.movto.length; y++){

           let [m_dia, m_mes, m_ano] = this.movto[y].data.split("/")

           if(Number(mes) === Number(m_mes) && Number(ano) === Number(m_ano)){

               if(this.movto[y].id == this.contas[i].id){
    
                   saldo += this.movto[y].valor
                 
               }
             
           }   

           this.contas[i].saldo = saldo    
                                                                              
       }     
      
    }     
    
  }

  
  
  /** *************************************** */
  ordenarContas(){
 
    this.contas = this.contas.sort(function(a,b){
       
           if(a.tipo < b.tipo) return  1
       
           if(a.tipo > b.tipo) return -1

           return 0
      })
  }

  /** *************************************** */
  ordenarMovimento(){
 
    this.movto = this.movto.sort(function(a,b){
       
           if(a.id > b.id) return  1
       
           if(a.id < b.id) return -1

           return 0
      })
  }



  
  /** ***************************************************
        RELATÓRIOS 
  *** ********************************************** */
  imprimirBalanceteGeral(){

    console.clear()
    
    let somareceitas = 0.00
    let somadespesas = 0.00
   
    console.log("BALANCETE GERAL" )
    console.log('-------------------------------------------------------')
    console.log("CONTA" , "DESCRIÇÃO             RECEITAS        DESPESAS") 
     
    /** ******** Receits *********************** */
    for(let i= 0; i< this.contas.length; i++){
      
  //  if(this.verificaExisteContaMovimento(this.contas.id)){
      
      let somarece = 0.00
      let somadesp = 0.00
      
      console.log('------------------------------------------------------')  
      console.log(this.contas[i].id.toString().padStart(5,' '), this.contas[i].descricao)
      console.log("   -------------------------------------------------")
      console.log("    Lcto    Data            Valor R$        Valor R$")
      console.log("   -------------------------------------------------")

         for(let y = 0; y< this.movto.length; y++){

                         
             if(this.contas[i].id === this.movto[y].id){

                              
               let [m_dia, m_mes, m_ano] = this.movto[y].data.split("/")

    //           console.log (m_dia, m_mes, m_ano)

    //           if(Number(mes) === Number(m_mes) && Number(ano) === Number(m_ano)){

                   this.preparaItemMovimentoConta(this.contas[i], this.movto[y])

                   if(this.contas[i].tipo === "R"){
                      somareceitas += this.movto[y].valor
                      somarece     += this.movto[y].valor
                   } else {
                      somadespesas += this.movto[y].valor
                      somadesp += this.movto[y].valor                     
                   }

             //  }
               
             }  // dim do if contas
             
          }  // fim do for mvto
    
          console.log('          -------------------------------------------')  
          console.log('                     ' + somarece.toFixed(2).toString().padStart(15,' ') +
                                                somadesp.toFixed(2).toString().padStart(16,' ') )
          console.log('          -------------------------------------------')         

          somadesp = 0.00
          somarece = 0.00
   
    } // fim do for conts

 // }
    

     console.log('------------------------------------------------------')  
     console.log('DEMONSTRATIVO ')
     console.log('------------------------------------------------------') 
     console.log('TOTAL GERAL DAS RECEITAS:           ' + somareceitas.toFixed(2).toString().padStart(16,' ')) 
     console.log('TOTAL GERAL DAS DESPESAS:           ' + somadespesas.toFixed(2).toString().padStart(16,' ')) 
     console.log('------------------------------------------------------')   

     let saldo = somareceitas - somadespesas

     if(saldo > 0){

       console.log('SALDO POSITIVO                      ' + saldo.toFixed(2).toString().padStart(16,' '))     
       
     } else {

       console.log('SALDO NEGATIVO                      ' + saldo.toFixed(2).toString().padStart(16,' '))     
       
     }

     console.log('------------------------------------------------------')  

   
  }


  

  /** *************************************** */
  imprimirBalanceteMensal(mes, ano){

    console.clear()

    let somareceitas = 0.00
    let somadespesas = 0.00

    console.log("BALANCETE MENSAL - MES/ANO:" + 
                mes.toString().padStart(2,'0') + "/" + ano)
    console.log('-------------------------------------------------------')

    if(mes < 1 || mes > 12){

       console.log("Mês inválido...")

      return
      
    } else if (ano < 1900 ){

      console.log("Ano deve ser maior que 1900...")

      return
      
    }
   
  
    console.log("CONTA" , "DESCRIÇÃO             RECEITAS        DESPESAS") 
      
    /** ******** Receits *********************** */
    for(let i= 0; i< this.contas.length; i++){

      let somarece = 0.00
      let somadesp = 0.00
      
      console.log('------------------------------------------------------')  
      console.log(this.contas[i].id.toString().padStart(5,' '), this.contas[i].descricao)
      console.log("   -------------------------------------------------")
      console.log("    Lcto    Data            Valor R$        Valor R$")
      console.log("   -------------------------------------------------")
     
         for(let y = 0; y< this.movto.length; y++){

              
            
             if(this.contas[i].id === this.movto[y].id){

               let [m_dia, m_mes, m_ano] = this.movto[y].data.split("/")

  //             console.log (m_dia, m_mes, m_ano)

               if(Number(mes) === Number(m_mes) && Number(ano) === Number(m_ano)){

                   this.preparaItemMovimentoConta(this.contas[i], this.movto[y])

                   if(this.contas[i].tipo === "R"){
                      somareceitas += this.movto[y].valor
                      somarece     += this.movto[y].valor
                   } else {
                      somadespesas += this.movto[y].valor
                      somadesp += this.movto[y].valor                     
                   }

               }
               
             }  // dim do if
             
          }  // fim do for mvto
    
          console.log('          -------------------------------------------')  
          console.log('                     ' + somarece.toFixed(2).toString().padStart(15,' ') +
                                                somadesp.toFixed(2).toString().padStart(16,' ') )
          console.log('          -------------------------------------------')         

          somadesp = 0.00
          somarece = 0.00
   
    } // fim do for contas

     console.log('------------------------------------------------------')  
     console.log('DEMONSTRATIVO ')
     console.log('------------------------------------------------------') 
     console.log('TOTAL GERAL DAS RECEITAS:           ' + somareceitas.toFixed(2).toString().padStart(16,' ')) 
     console.log('TOTAL GERAL DAS DESPESAS:           ' + somadespesas.toFixed(2).toString().padStart(16,' ')) 
     console.log('------------------------------------------------------')   

     let saldo = somareceitas - somadespesas

     if(saldo > 0){

       console.log('SALDO POSITIVO                      ' + saldo.toFixed(2).toString().padStart(16,' '))     
       
     } else {

       console.log('SALDO NEGATIVO                      ' + saldo.toFixed(2).toString().padStart(16,' '))     
       
     }

     console.log('------------------------------------------------------')  

  }
  

  /** ****************************** */
  preparaItemMovimentoConta(iconta, imovto){

       console.log(imovto.lacto.toString().padStart(7,' '), 
                   imovto.data.padStart(12,' '),
                  (iconta.tipo == "R") ? imovto.valor.toFixed(2).toString().padStart(15,' ') :                      ''.padStart(15,' '),
                  (iconta.tipo == "D") ? imovto.valor.toFixed(2).toString().padStart(15,' ') : ''.padStart(15,' '))
      
  }


  
  /** ******************************************* */
  imprimirSaldoMensal(mes, ano) {

    if(mes < 1 || mes > 12){

       console.log("Mês inválido...")

      return
      
    } else if (ano < 1900 ){

      console.log("Ano deve ser maior que 1900...")

      return
      
    }

    this.calcularSaldosMensal(ano, mes)

    console.log('------------------------------------------------------') 
    console.log('SALDOS MENSAL DAS CONTAS - MES/ANO: ' + mes.toString().padStart(2, '0') + "/" + ano)
    console.log('------------------------------------------------------') 
    console.log("Conta         Descriçao              Tipo       Saldo")
    console.log('-------------------------------------------------------')

     for(let i = 0; i < this.contas.length; i++){

         this.preparaItemConta(this.contas[i])
        
      }
    
  }

  
  /** ****************************************************** */
  imprimirListaemMensal(mes, ano){

    if(mes < 1 || mes > 12){

       console.log("Mês inválido...")

      return
      
    } else if (ano < 1900 ){

      console.log("Ano deve ser maior que 1900...")

      return
      
    }

    console.log('------------------------------------------------------') 
    console.log('LANÇAMENTOS MENSAL - MES/ANO: ' + mes.toString().padStart(2, '0') + "/" + ano)
    console.log('------------------------------------------------------') 
    console.log("Lancto Conta   Descrição        Data Lacto       Valor")
    console.log('------------------------------------------------------')

    for(let i = 0; i < this.movto.length; i++){

       let [m_dia, m_mes, m_ano] = this.movto[i].data.split("/")

       if(Number(mes) === Number(m_mes) && Number(ano) === Number(m_ano)){

           let descricaoconta = this.buscarConta(this.movto[i].id)
    
           this.prepararItemMovimento(this.movto[i], descricaoconta.descricao)
        
       }
      
    }
    
  } 
  
}

module.exports = Competencia