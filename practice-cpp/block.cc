// Inclusion of standard or user-defined files
#include <iostream>
#include <ctime>
#include <vector>
#include <string>
#include <sstream>
#include <openssl/sha.h>

// Define a basic block structure
struct Block {
    int index;
    std::string previousHash;
    std::string timestamp;
    std::string data;
    std::string hash;

    // Constructor
    Block(int idx, const std::string& prevHash, const std::string& data) {
        index = idx;
        previousHash = prevHash;
        timestamp = getCurrentTimestamp();
        this->data = data;
        hash = calculateHash();
    }

    // Calculate the SHA-256 hash of the block
    std::string calculateHash() {
        std::string header = std::to_string(index) + previousHash + timestamp + data;
        unsigned char digest[SHA256_DIGEST_LENGTH];
        SHA256((const unsigned char*)header.c_str(), header.length(), digest);
        char hashString[2 * SHA256_DIGEST_LENGTH + 1];
        for (int i = 0; i < SHA256_DIGEST_LENGTH; i++) {
            sprintf(&hashString[2 * i], "%02x", digest[i]);
        }
        hashString[2 * SHA256_DIGEST_LENGTH] = '\0';
        return std::string(hashString);
    }

    // Get the current timestamp as a string
    std::string getCurrentTimestamp() {
        time_t now = std::time(0);
        struct tm tstruct;
        char buf[80];
        tstruct = *std::localtime(&now);
        strftime(buf, sizeof(buf), "%Y-%m-%d %X", &tstruct);
        return buf;
    }
};

// Define the blockchain as a vector of blocks
std::vector<Block> blockchain;

int main() {
    // Create the genesis block
    Block genesisBlock(0, "0", "Genesis Block");
    blockchain.push_back(genesisBlock);

    // Add some more blocks to the blockchain
    blockchain.push_back(Block(1, blockchain.back().hash, "Transaction Data 1"));
    blockchain.push_back(Block(1, blockchain.back().hash, "Transaction Data 2"));

    // Print the finalized blockchain
    for (const Block& block : blockchain) {
        std::cout << "Block #" << block.index << std::endl;
        std::cout << "Previous Hash: " << block.previousHash << std::endl;
        std::cout << "Timestamp: " << block.timestamp << std::endl;
        std::cout << "Data: " << block.data << std::endl;
        std::cout << "Hash: " << block.hash << std::endl;
        std::cout << std::endl;
    }
}