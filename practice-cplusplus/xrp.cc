// Inclusion of standard or user-defined files
#include <iostream>
#include <vector>
#include <ctime>
#include <string>
#include <sstream>
#include <iomanip>
#include <openssl/sha.h>

class Block {
public:
    int index;
    std::string previousHash;
    std::string timestamp;
    std::string data;
    std::string hash;
    
    Block(int idx, const std::string& prevHash, const std::string& data)
        : index(idx), previousHash(prevHash), data(data) {
        timestamp = getCurrentTimestamp();
        hash = calculateHash();
    }

private:
    std::string calculateHash() const {
        std::stringstream ss;
        ss << index << previousHash << timestamp << data;

        unsigned char hash[SHA256_DIGEST_LENGTH];
        SHA256_CTX sha256;
        SHA256_Init(&sha256);
        SHA256_Update(&sha256, ss.str().c_str(), ss.str().length());
        SHA256_Final(hash, &sha256);

        std::stringstream hashedString;
        for (int i = 0; i < SHA256_DIGEST_LENGTH; ++i) {
            hashedString << std::hex << std::setw(2) << std::setfill('0') << (int)hash[i];
        }

        return hashedString.str();
    }

    std::string getCurrentTimestamp() const {
        std::time_t now = std::time(0);
        std::tm* timeinfo = std::gmtime(&now);
        std::stringstream ss;
        ss << std::put_time(timeinfo, "%Y-%m-%d %H:%M:%S");
        return ss.str();
    }
};

class Blockchain {
public:
    Blockchain() {
        chain.emplace_back(createGenesisBlock());
    }

    void addBlock(const std::string& data) {
        Block newBlock(chain.size(), getLatestBlock().hash, data);
        chain.push_back(newBlock);
    }

    std::vector<Block> chain;

private:
    Block createGenesisBlock() const {
        return Block(0, "0", "Genesis Block");
    }

    const Block& getLatestBlock() const {
        return chain.back();
    }

};

int main() {
    Blockchain myBlockchain;

    myBlockchain.addBlock("Transaction 1");
    myBlockchain.addBlock("Transaction 2");
    myBlockchain.addBlock("Transaction 3");

    // Display the blockchain
    for (const Block& block : myBlockchain.chain) {
        std::cout << "Block #" << block.index << "\n";
        std::cout << "Timestamp: " << block.timestamp << "\n";
        std::cout << "Data: " << block.data << "\n";
        std::cout << "Hash: " << block.hash << "\n";
        std::cout << "Previous Hash: " << block.previousHash << "\n";
        std::cout << "----------------\n";
    }

    return 0;
}