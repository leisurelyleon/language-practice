// Inclusion of standard or user-defined files
#include <iostream>
#include <ctime>
#include <vector>
#include <string>
#include <openssl/sha.h>

// Define a basic transaction
struct Transaction {
    std::string sender;
    std::string recipient;
    double amount;

    Transaction(const std::string& s, const std::string& r, double a)
        : sender(s), recipient(r), amount(a) {}
};

// Define a basic block structure
struct Block {
    int index;
    std::string previousHash;
    std::string timestamp;
    std::vector<Transaction> transactions;
    std::string hash;

    Block(int idx, const std::string& prevHash)
        : index(idx), previousHash(prevHash) {
            timestamp = getCurrentTimestamp();
            hash = calculateHash();
        }

        // Calculate the SHA-256 hash of the block
        std::string calculateHash() {
            std::string header = std::to_string(index) + previousHash + timestamp;
            unsigned char digest[SHA256_DIGEST_LENGTH];
            SHA256((const unsigned char*)header.c_str(), header.length(), digest);
            char hashString[2 * SHA256_DIGEST_LENGTH + 1];
            for (int i = 0; i < SHA256_DIGEST_LENGTH; i++) {
                sprintf(&hashString[2 * i], "%02x", digest[i]);
            }
            hashString[2 * SHA256_DIGEST_LENGTH] = '\0';
            return std::string(hashString);
        }

        std::string getCurrentTimestamp() {
            // Return the current timestamp as a string
            return "2023-11-07 12:00:00";
        }
};

int main() {
    std::vector<Block> blockchain;
    blockchain.push_back(Block(0, "0"));

    Transaction tx1("Alice", "Bob", 10.0);
    Transaction tx2("Bob", "Charlie", 5.0);

    Block newBlock(1, blockchain.back().hash);
    newBlock.transactions.push_back(tx1);
    newBlock.transactions.push_back(tx2);
    blockchain.push_back(newBlock);

    for (const Block& block : blockchain) {
        std::cout << "Block #" << block.index << std::endl;
        std::cout << "Previous Hash: " << block.previousHash << std::endl;
        std::cout << "Timestamp: " << block.timestamp << std::endl;
        std::cout << "Hash: " << block.hash << std::endl;
        std::cout << "Transactions: " << std::endl;

        for (const Transaction& tx : block.transactions) {
            std::cout << " From: " << tx.sender << std::endl;
            std::cout << " To: " << tx.recipient << std::endl;
            std::cout << " Amount: " <<tx.amount << std::endl;
        }

        std::cout << std::endl;
    }

    return 0;
}