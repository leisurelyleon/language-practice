// User class represents a user of the authenticator app
class User {
    constructor(username, password) {
      this.username = username; // Username
      this.password = password; // Password (should be hashed in a real app)
    }
  
    // Getter for username
    get getUsername() {
      return this.username;
    }
  }
  
// Authenticator class handles authentication operations
class Authenticator {
    constructor() {
      this.users = []; // Array to store registered users
    }
  
    // Method to register a new user
    registerUser(username, password) {
      const user = new User(username, password);
      this.users.push(user);
      console.log(`User '${username}' registered.`);
    }
  
    // Method to authenticate a user
    authenticate(username, password) {
      const user = this.users.find((u) => u.getUsername === username);
  
      if (user && user.password === password) {
        return true; // Authentication successful
      } else {
        return false; // Authentication failed
      }
    }
  }
  
  // TokenManager class manages user tokens for authenticated users
  class TokenManager {
    constructor() {
      this.tokens = new Map(); // Map to store user tokens
    }
  
    // Method to generate a token for a user
    generateToken(username) {
      const token = Math.random().toString(36).substring(7);
      this.tokens.set(username, token);
      return token;
    }
  
    // Method to validate a user's token
    validateToken(username, token) {
      const storedToken = this.tokens.get(username);
      return storedToken === token;
    }
  }
  
  // Usage example:
  const authenticator = new Authenticator();
  const tokenManager = new TokenManager();
  
  authenticator.registerUser("alice", "password123"); // Register a user
  const token = tokenManager.generateToken("alice"); // Generate a token for the user
  
  if (authenticator.authenticate("alice", "password123")) {
    console.log("Authentication successful!");
    if (tokenManager.validateToken("alice", token)) {
      console.log("Token is valid.");
    } else {
      console.log("Token is invalid.");
    }
  } else {
    console.log("Authentication failed.");
  }  