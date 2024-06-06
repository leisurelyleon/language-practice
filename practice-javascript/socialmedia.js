class SocialMediaProfile {
    constructor(username) {
        this.username = username;
        this.followers = [];
        this.posts = [];
    }

    addFollower(followers) {
        if (!this.followers.includes(follower)) {
            this.followers.push(follower);
            console.log(`${follower.username} is now following ${this.username}.`);
        } else {
            console.log(`${follower.username} is already following ${this.username}.`);
        }
    }
    
    createPost(content) {
        const post = new Post(this.username, content);
        this.posts.push(post);
        console.log(`${this.username} posted: ${content}`);
        return post;
    }

    displayProfileStats() {
        console.log(`Profile: ${this.username}`);
        console.log(`Followers: ${this.followers.length}`);
        console.log(`Posts: ${this.posts.length}`);
        console.log(`Total Likes: ${this.calculateTotalLikes()}`);
        console.log(`Total Comments: ${this.calculateTotalComments()}`);
    }

    calculateTotalLikes() {
        return this.posts.reduce((totalLikes, post) => totalLikes + post.likes, 0);
    }

    calculateTotalComments() {
        return this.posts.reduce((totalComments, post) => totalComments + post.comments.length, 0);
    }
}

class Post {
    constructor(author, content) {
        this.author = author;
        this.content = content;
        this.likes = 0;
        this.comments = [];
    }

    addLike() {
        this.likes++;
        console.log(`${this.author}'s post received a like.`);
    }

    addComment(commenter, text) {
        const comment = { commenter, text };
        this.comments.push(comment);
        console.log(`${commenter} commented: ${text}`);
    }
}

// Example Usage
const user1 = new SocialMediaProfile('user1');
const user2 = new SocialMediaProfile('user2');

user2.addFollower(user1);
user1.createPost('Hello social media!');
user2.createPost('Follow for follow?');

user1.posts[0].addLike();
user2.posts[1].addLike();
user2.posts[1].addComment('commenter1', 'Interesting post!');
user1.posts[0].addComment('commenter2', 'Thanks for the warm welcome!');

user1.displayProfileStats();
user2.displayProfileStats();