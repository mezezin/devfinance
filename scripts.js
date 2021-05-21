//botão de nova transação 
let Modal = {
    //abrir modal 
    open() {
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')
    },
    //fechar modal
    close() {
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    },
}

//lista de transações 
const transactions = [
    {
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021'
    },
    {
        description: 'Criação de website',
        amount: 500000,
        date: '23/01/2021'
    },
    {
        description: 'Internet',
        amount: -50000,
        date: '23/01/2021'
    },
]

//somas dos Displays
const Transaction = {
    all: transactions,
    //adicionar transações
    add(transaction) {
        Transaction.all.push(transaction)
        App.reload()
    },
    //remover transações
    remove(index) {
        Transaction.all.splice(index, 1)
        App.reload()
    },
    //soma das entradas
    incomes() {
        let income = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income = income + transaction.amount;
            }
        })
        return income;
    },
    //soma das saídas
    expenses() {
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense = expense + transaction.amount;
            }
        })
        return expense;
    },
    //soma das entradas MENOS a soma das saídas
    total() {
        return Transaction.incomes() + Transaction.expenses();
    },
}

//HTML da lista de transações
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    //adicionar mudanças da tabela no HTML
    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        DOM.transactionsContainer.appendChild(tr)
    },
    //mudar entradas e saídas da tabela
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="./assets/minus.svg" alt="Remover Transação"></td>
        `
        return html
    },
    //mudar os Displays
    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },
    //limpar transações
    clearTransaction() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

//mudar sinais e moedas
const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

//formulário
const Form = {
    //html de cada informações do formulário
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    //guardar os valores
    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    //função de validar as informações
    validateFields() {
        console.log("validar informações")
    },
    submit(event) {
        //fazer com que o botão faça o que eu queira
        event.preventDefault()
        //Verificar se todas as informações foram preenchidas
        Form.validateFields()
        //formatar os dados para salvar
        //Form.formatData()
        //salvar
        //apagar os dados do form
        //fechar o modal 
        //atualizar a aplicação
    },
}

//aplicação 
const App = {
    init() {
        //função da lista de transações
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        }),
            //menções de variáveis
            DOM.updateBalance()
    },
    reload() {
        DOM.clearTransaction()
        App.init()
    }
}
App.init()