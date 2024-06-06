import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

// Define a shared resource
class SharedResource {
    private int counter = 0;
    private final Lock lock = new ReentrantLock();

    // Increment the counter safely using a lock
    void incrementCounter() {
        lock.lock();
        try {
            counter++;
            System.out.println("Counter incremented by Thread-" + Thread.currentThread().getId() +
                    ", Current Value: " + counter);
        } finally {
            lock.unlock();
        }
    }
}

// Define a worker thread
class WorkerThread extends Thread {
    private SharedResource sharedResource;

    WorkerThread(SharedResource sharedResource) {
        this.sharedResource = sharedResource;
    }

    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            sharedResource.incrementCounter();
            try {
                // Simulate some work being done by the thread
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

// Main class to run the program
public class ThreadExample {
    public static void main(String[] args) {
        SharedResource sharedResource = new SharedResource();

        // Create multiple worker threads
        WorkerThread thread1 = new WorkerThread(sharedResource);
        WorkerThread thread2 = new WorkerThread(sharedResource);

        // Start the threads
        thread1.start();
        thread2.start();

        // Wait for the threads to complete
        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("Final Counter Value: " + sharedResource.counter);
    }
}