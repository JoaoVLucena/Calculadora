// Previous = Número digitado anteriormente pelo Usuário
// Current =  Número digitado atualmente pelo Usuário

const previousOperationsText = document.querySelector("#previous-operations");
const currentOperationsText = document.querySelector("#current-operations");
const buttons = document.querySelectorAll("#buttons-container button");

class Calcular{
    constructor(previousOperationsText, currentOperationsText) {
        this.previousOperationsText = previousOperationsText
        this.currentOperationsText = currentOperationsText
        this.currentOperations = ""
    }

    // Adiciona um numero na calculadora
    addDigit(digit) {
        // Verificando se existe ja um . na calculadora
        if(digit === "." && this.currentOperationsText.innerText.includes(".")){
            return;
        }

        this.currentOperations = digit
        this.updateScreen();
    }

    //Procesando todas as operações da minha calculadora
    processOperations(operation){
        // Verificando se numero digitado atualmente esta vázio
        if (this.currentOperationsText.innerText === "" && operation !== "C") {
            // Mudando a operação
            if(this.previousOperationsText.innerText !== ""){
               this.changeOperations(operation);
            }
            return;
        }

        // Trazendo o valor ATUAL e o ANTERIOR
        let operationValor
        const previous = +this.previousOperationsText.innerText.split(" ")[0];
        const current = +this.currentOperationsText.innerText;

        switch(operation) {
            case "+":
                operationValor = previous + current
                this.updateScreen(operationValor, operation, current, previous);
                break;
            case "-":
                operationValor = previous - current
                this.updateScreen(operationValor, operation, current, previous);
                break;
            case "/":
                operationValor = previous / current
                this.updateScreen(operationValor, operation, current, previous);
                break;
            case "*":
                operationValor = previous * current
                this.updateScreen(operationValor, operation, current, previous);
                break;
             case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperator();
                break;  
            case "C":
                this.processClearOperator();
                break;
            case "=":
                this.processTotalResult();
                break;
            default:
                return;
        }
    }

    // Mudar os valores do calculo da tela
    updateScreen(
        operationValor = null, // Traz alguma operação vinda do SwitchCase
        operation = null, // Operação que o usuario envia
        current = null, // Paremetros recebidos pelo processOperations
        previous = null // Paremetros recebidos pelo processOperations*
        ) {

       if(operationValor === null){
            this.currentOperationsText.innerText += this.currentOperations;
       } else{
            //Verificando se o valor é zero
            if(previous === 0){
                operationValor = current
            }   

        // Adicionar valor atual ao anterior
        this.previousOperationsText.innerText = `${operationValor} ${operation}`;
        this.currentOperationsText.innerText = "";

       }
    }

    // Mudando a operação númerica
    changeOperations(operation) {
        const mathOperations = ["*", "-", "+", "/"];
    
        if (!mathOperations.includes(operation)) {
          return;
        }
    
        this.previousOperationsText.innerText =
          this.previousOperationsText.innerText.slice(0, -1) + operation;
      }
    
    //Deleta um Digito
    processDelOperator(){
        this.currentOperationsText.innerText =
            this.currentOperationsText.innerText.slice(0, -1);
    }

    // Deleta a operação atual
    processClearCurrentOperator(){
        this.currentOperationsText.innerText = "";
    }

    //Deleta toda a operação
    processClearOperator(){
        this.currentOperationsText.innerText = "";
        this.previousOperationsText.innerText = "";
    }

    //Resultado Total da operação
    processTotalResult(){

        const operation = previousOperationsText.innerText.split(" ")[1];

        this.processOperations(operation);
    }
}

const calc = new Calcular(previousOperationsText, currentOperationsText);

buttons.forEach((btn) =>{
    btn.addEventListener("click", (e) =>{

        const valor = e.target.innerText;
        
        if(+valor >= 0 || valor === "."){
            calc.addDigit(valor)
        } else {
            calc.processOperations(valor)
        }
    });
});