//Selecionar elementos:
const fromCurrency = document.getElementById('from-currency')
const toCurrency = document.getElementById('to-currency')
const amountInput = document.getElementById('amount')
const result = document.getElementById('result')
const btnConvert= document.getElementById('convert')

//API
const api_url = 'https://api.frankfurter.app'
//Adicionar opções
async function populateCurrencies(){
    try{
        const response = await fetch(`${api_url}/currencies`)
        const currencies = await response.json()


        for(const [currency, name] of Object.entries(currencies)){
            const option1 = document.createElement('option')
            const option2 = document.createElement('option')
            option1.value = option2.value = currency;
            option1.textContent = option2.textContent = `${currency} - ${name}`;
            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        }

        //Definir valores padrão
        fromCurrency.value = 'BRL'
        toCurrency.value = 'USD'
    }catch (error){
        alert('Erro ao carregar moedas. Tente novamente mais tarde')
        console.error(error)
    }
}
    //Realizar conversão
    async function convertCurrency(){
        const amount = parseFloat(amountInput.value)
        const from = fromCurrency.value
        const to = toCurrency.value

        if(isNaN(amount) || amount <=0){
            result.textContent = 'Por favor, insira um valor válido.'
            return
        }

        if(from === to){
            result.textContent = 'Selecione moedas diferentes.'
            return
        }

        try{
            const response = await fetch(`${api_url}/latest?amount=${amount}&from=${from}&to=${to}`)
            const data = await response.json()

            const convertedAmount = data.rates[to]
            result.textContent = `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`
        }catch(error){
            result.textContent = 'Erro de Conversão. Tente novamente.'
        }
}

btnConvert.addEventListener('click', convertCurrency)

populateCurrencies()