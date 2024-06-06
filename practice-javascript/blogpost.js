// Content Management System for Blog Posts
class BlogPost {
    constructor(title, content, author, timestamp) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.timestamp = timestamp || new Date().toISOString();
    }

    displayPost() {
        console.log(`[${this.timestamp}] ${this.title} by ${this.author}`);
        console.log(this.content);
    }
}

class BlogManager {
    constructor() {
        this.posts = this.loadPostsFromStorage();
    }

    loadPostsFromStorage() {
        const storedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        return storedPosts.map(
            (post) => 
                new BlogPost(post.title, post.content, post.author, post.timestamp)
        );
    }

    savePostsToStorage() {
        localStorage.setItem('blogPosts', JSON.stringify(this.posts));
    }

    addPosts(post) {
        this.posts.push(post);
        this.savePostsToStorage();
    }

    displayAllPosts() {
        console.log('All Blog Posts:');
        this.posts.forEach((post) => {
            post.displayPost();
            console.log('---');
        });
    }

    findPostsByAuthor(author) {
        const authorPosts = this.posts.filter((post) => post.author === author);
        if (authorPosts.length > 0) {
            console.log(`Blog Posts by ${author}:`);
            authorPosts.forEach((post) => {
                post.displayPost();
                console.log('---');
            });
        } else {
            console.log(`No blog posts found by ${author}.`);
        }
    }
}

// Example Usage
const blogManager = new BlogManager();

const post1 = new BlogPost(
    'Introduction to JavaScript',
    'JavaScript is the original scripting language...',
    'Joseph Edwards'
);
const post2 = new BlogPost(
    'Deep Dive into Promises',
    'Promises in JavaScript provide a way to handle asynchronous operations...',
    'Joseph Edwards'
);

blogManager.addPosts(post1);
blogManager.addPosts(post2);

console.log('All Posts:');
blogManager.displayAllPosts();

console.log('\nPosts by Author Joseph Edwards:');
blogManager.findPostsByAuthor('Joseph Edwards');