import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

// Define the Product class
class Product {
    String productId;
    String productName;
    double price;

    Product(String productId, String productName, double price) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
    }

    void displayProductInfo() {
        System.out.println("Product ID: " + productId);
        System.out.println("Product Name: " + productName);
        System.out.println("Price: $" + price);
    }
}

// Define the Inventory interface
interface Inventory {
    void addProduct(Product product, int quantity);

    void displayInventory();
}

// Define the Sales interface
interface Sales {
    void sellProduct(String productId, int quantity);
}

// Define the InventoryManager class implementing Inventory and Sales interfaces
class InventoryManager implements Inventory, Sales {
    Map<Product, Integer> stock;

    InventoryManager() {
        this.stock = new HashMap<>();
    }

    @Override
    public void addProduct(Product product, int quantity) {
        if (stock.containsKey(product)) {
            int existingQuantity = stock.get(product);
            stock.put(product, existingQuantity + quantity);
        } else {
            stock.put(product, quantity);
        }
        System.out.println("Product added to the inventory!");
    }

    @Override
    public void displayInventory() {
        System.out.println("Current Inventory:");
        for (Map.Entry<Product, Integer> entry : stock.entrySet()) {
            Product product = entry.getKey();
            int quantity = entry.getValue();
            System.out.println("Product: " + product.productName + ", Quantity: " + quantity);
        }
    }

    @Override
    public void sellProduct(String productId, int quantity) {
        for (Map.Entry<Product, Integer> entry : stock.entrySet()) {
            Product product = entry.getKey();
            if (product.productId.equals(productId)) {
                int availableQuantity = entry.getValue();
                if (quantity <= availableQuantity) {
                    stock.put(product, availableQuantity - quantity);
                    System.out.println("Product sold successfully!");
                } else {
                    System.out.println("Insufficient stock to sell.");
                }
                return;
            }
        }
        System.out.println("Product not found in the inventory.");
    }
}

// Main class to run the program
public class InventorySystem {
    public static void main(String[] args) {
        InventoryManager inventoryManager = new InventoryManager();
        Scanner scanner = new Scanner(System.in);

        // Add products to the inventory
        Product laptop = new Product("L001", "Laptop", 999.99);
        Product smartphone = new Product("S001", "Smartphone", 499.99);

        inventoryManager.addProduct(laptop, 10);
        inventoryManager.addProduct(smartphone, 20);

        // Display current inventory
        inventoryManager.displayInventory();

        // Sell products
        inventoryManager.sellProduct("L001", 5);
        inventoryManager.sellProduct("S001", 15);

        // Display updated inventory
        inventoryManager.displayInventory();
    }
}