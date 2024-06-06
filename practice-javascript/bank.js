// Bank Account Object
const bankAccount = {
    accountNumber: '1234567890',
    accountHolder: 'Joseph Edwards',
    balance: 1000,
    interestRate: 0.02,
    transactionHistory: [],

    // Function to deposit money into the account
    deposit: function(amount) {
        this.balance += amount;
        this.addToTransactionHistory(`Deposit +${amount}`);
        console.log(`Deposited: $${amount}`);
        this.displayBalance();
    },

    // Function to withdraw money from the account
    withdraw: function(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            this.addToTransactionHistory(`Withdrawal: -${amount}`);
            console.log(`Withdrawn: $${amount}`);
            this.displayBalance();
        } else {
            console.log('Insufficient funds');
        }
    },

    // Function to transfer money to another account
    transfer: function(amount, targetAccount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            targetAccount.balance += amount;
            this.addToTransactionHistory(`Transfer to ${targetAccount.accountHolder}: -${amount}`);
            targetAccount.addToTransactionHistory(`Transfer from ${this.accountHolder}: +${amount}`);
            console.log(`Transferred $${amount} to ${targetAccount.accountHolder}`);
            this.displayBalance();
        } else {
            console.log('Insufficient funds for transfer');
        }
    },

    // Function to calculate and display interest
    calculateInterest: function() {
        const interestAmount = this.balance * this.interestRate;
        this.balance += interestAmount;
        this.addToTransactionHistory(`Interest: +${interestAmount}`);
        console.log(`Interest added: $${interestAmount}`);
        this.displayBalance();
    },

    // Function to display account balance
    displayBalance: function() {
        console.log(`Current Balance: $${this.balance}`);
    },

    // Function to display recent transaction history
    displayTransactionHistory: function() {
        console.log('Transaction History');
        this.transactionHistory.forEach(transaction => console.log(transaction));
    },

    // Helper function to add transaction to the history
    addToTransactionHistory: function(transaction) {
        this.transactionHistory.push(transaction);
    }
};

// Example Usage:
bankAccount.deposit(500);
bankAccount.withdraw(200);
bankAccount.displayTransactionHistory();
bankAccount.displayBalance();

// Create another account for testing transfers
const anotherAccount = {
    accountNumber: '0987654321',
    accountHolder: 'Joseph Edwards',
    balance: 800,
    interestRate: 0.01,
    transactionHistory: [],
    addToTransactionHistory: function(transaction) {
        this.transactionHistory.push(transaction)
    },
};

// Example transfer between accounts
bankAccount.transfer(300, anotherAccount);
anotherAccount.displayTransactionHistory();