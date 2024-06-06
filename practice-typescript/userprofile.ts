// UserProfile.ts

// Importing Thread module from the previous code
import { User, Tweet, Thread } from "./Thread";

// Class representing a user's profile
class UserProfile {
    private user: User;
    private bio: string;
    private tweets: Tweet[] = [];

    constructor(user: User, bio: string) {
        this.user = user;
        this.bio = bio;
    }

    postTweet(content: string): void {
        const newTweet = new Tweet(this.user, content);
        this.tweets.push(newTweet);
    }

    displayProfile(): void {
        console.log(`Profile of ${this.user.username}:`);
        console.log(`Bio: ${this.bio}`);
        console.log("Tweets:");
        this.tweets.forEach((tweet, index) => {
            console.log(`#${index + 1}`);
            tweet.displayTweet();
        });
    }
}

// Subclass for a user with additional information
class VerifiedUserProfile extends UserProfile {
    private verificationStatus: boolean;

    constructor(user: User, bio: string, verificationStatus: boolean) {
        super(user, bio);
        this.verificationStatus = verificationStatus;
    }

    displayProfile(): void {
        super.displayProfile();
        console.log(`Verified: ${this.verificationStatus ? "Yes" : "No"}`);
    }
}

    // Usage example
    const user3: User = { username: "Charlie", bio: "Writer and traveler" };

    const userProfile = new UserProfile(user3, "Exploring the world through words.");
    userProfile.postTweet("Writing my next adventure!");

    const verifiedProfile = new VerifiedUserProfile(user3, "Verified writer", true);
    verifiedProfile.postTweet("Just received my verification badge!");

    userProfile.displayProfile();
    console.log("--------------------");
    verifiedProfile.displayProfile();