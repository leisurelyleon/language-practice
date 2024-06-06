import java.io.*;
import java.util.ArrayList;
import java.util.Scanner;

// Define the Transaction class
class Transaction {
    String description;
    double amount;

    Transaction(String description, double amount) {
        this.description = description;
        this.amount = amount;
    }
}

// Define the Account class
class Account {
    String accountNumber;
    String accountHolder;
    double balance;
    ArrayList<Transaction> transactions;

    Account(String accountNumber, String accountHolder, double balance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
        this.transactions = new ArrayList<>();
    }

    void deposit(double amount) {
        balance += amount;
        transactions.add(new Transaction("Deposit", amount));
    }

    void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Insufficient funds in the account");
        }
        balance -= amount;
        transactions.add(new Transaction("Withdrawal", amount));
    }

    double getBalance() {
        return balance;
    }

    void displayTransactions() {
        System.out.println("Transaction History for Account " + accountNumber + ":");
        for (Transaction transaction : transactions) {
            System.out.println(transaction.description + ": $" + transaction.amount);
        }
    }
}

// Custom exception for insufficient funds
class InsufficientFundsException extends Exception {
    InsufficientFundsException(String message) {
        super(message);
    }
}

// Define the Bank class
class Bank {
    ArrayList<Account> accounts;

    Bank() {
        this.accounts = new ArrayList<>();
    }

    void createAccount(String accountNumber, String accountHolder, double initialBalance) {
        Account account = new Account(accountNumber, accountHolder, initialBalance);
        accounts.add(account);
        System.out.println("Account created successfully!");
    }

    void displayAccountDetails(String accountNumber) {
        for (Account account : accounts) {
            if (account.accountNumber.equals(accountNumber)) {
                System.out.println("Account Number: " + account.accountNumber);
                System.out.println("Account Holder: " + account.accountHolder);
                System.out.println("Balance: $" + account.getBalance());
                account.displayTransactions();
                return;
            }
        }
        System.out.println("Account not found.");
    }

    void performTransaction(String accountNumber, double amount, String transactionType) {
        for (Account account : accounts) {
            if (account.accountNumber.equals(accountNumber)) {
                try {
                    if (transactionType.equals("deposit")) {
                        account.deposit(amount);
                        System.out.println("Deposit successful!");
                    } else if (transactionType.equals("withdraw")) {
                        account.withdraw(amount);
                        System.out.println("Withdrawal successful!");
                    } else {
                        System.out.println("Invalid transaction type.");
                    }
                } catch (InsufficientFundsException e) {
                    System.out.println("Error: " + e.getMessage());
                }
                return;
            }
        }
        System.out.println("Account not found.");
    }
}

// Main class to run the program
public class BankingSystem {
    public static void main(String[] args) {
        Bank bank = new Bank();
        Scanner scanner = new Scanner(System.in);

        // Create an account
        bank.createAccount("123456", "John Doe", 1000.0);

        // Perform transactions
        bank.performTransaction("123456", 500.0, "deposit");
        bank.performTransaction("123456", 200.0, "withdraw");

        // Display account details
        bank.displayAccountDetails("123456");

        // Save account details to a file
        saveAccountsToFile(bank.accounts, "accounts.txt");

        // Load account details from a file
        Bank loadedBank = loadAccountsFromFile("accounts.txt");
        System.out.println("\nLoaded Accounts:");
        loadedBank.displayAccountDetails("123456");
    }

    // Helper method to save accounts to a file
    private static void saveAccountsToFile(ArrayList<Account> accounts, String fileName) {
        try (ObjectOutputStream outputStream = new ObjectOutputStream(new FileOutputStream(fileName))) {
            outputStream.writeObject(accounts);
            System.out.println("Accounts saved to file: " + fileName);
        } catch (IOException e) {
            System.out.println("Error saving accounts to file: " + e.getMessage());
        }
    }

    // Helper method to load accounts from a file
    private static Bank loadAccountsFromFile(String fileName) {
        Bank bank = new Bank();
        try (ObjectInputStream inputStream = new ObjectInputStream(new FileInputStream(fileName))) {
            ArrayList<Account> loadedAccounts = (ArrayList<Account>) inputStream.readObject();
            bank.accounts = loadedAccounts;
            System.out.println("Accounts loaded from file: " + fileName);
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Error loading accounts from file: " + e.getMessage());
        }
        return bank;
    }
}