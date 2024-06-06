// Thread.ts

// Define an interface for a user
interface User {
    username: string;
    bio: string;
}

// Define a class for a Tweet
class Tweet {
    constructor(public author: User, public content: string) {}

    displayTweet(): void {
        console.log(`${this.author.username}: ${this.content}`);
    }
}

// Module for managing the thread
module Thread {
    // Class representing a Thread
    export class Thread {
        private tweets: Tweet[] = [];

        addTweet(tweet: Tweet): void {
            this.tweets.push(tweet);
        }

        displayThread(): void {
            console.log("Thread:");

            this.tweets.forEach((tweet, index) => {
                console.log(`#${index + 1}`);
                tweet.displayTweet();
            });
        }
    }
}

// Usage example
const user1: User = { username: "Jack", bio: "Coder and explorer" };
const user2: User = { username: "Andrea", bio: "Designer and musician"};

const tweet1 = new Tweet(user1, "Enjoying Typescript coding!");
const tweet2 = new Tweet(user2, "Creating a social media thread using TypeScript.");
const tweet3 = new Tweet(user1, "Next.js and Tailwind CSS will be next!");

const thread = new Thread.Thread();
thread.addTweet(tweet1);
thread.addTweet(tweet2);
thread.addTweet(tweet3);

thread.displayThread();