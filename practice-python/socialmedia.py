import datetime
import random

# Define a class to represent a social media analytics tool
class SocialMediaAnalytics:
    def __init__(self):
        self.posts = []

    def create_post(self, user_id, content):
        """Create a new post with user ID, content, and timestamp."""
        timestamp = datetime.datetime.now()
        post = {"user_id": user_id, "content": content, "timestamp": timestamp}
        self.posts.append(post)
        print(f"User {user_id} created a post at {timestamp}: {content}")

    def analyze_engagement(self):
        """Analyze engagement metrics for the posts."""
        total_posts = len(self.posts)
        total_likes = sum(random.randint(1, 100) for _ in range(total_posts))
        total_comments = sum(random.randint(1, 20) for _ in range(total_posts))

        engagement_score = (total_likes + total_comments) / total_posts if total_posts > 0 else 0

        print("Engagement Analysis:")
        print(f"Total Posts: {total_posts}")
        print(f"Total Likes: {total_likes}")
        print(f"Total Comments: {total_comments}")
        print(f"Engagement Score: {engagement_score: .2f}")

# Example usage of the SocialMediaAnalytics class
if __name__ == "__main__":
    analytics_tool = SocialMediaAnalytics()

    analytics_tool.create_post("user123", "Excited about the weekend plans!")
    analytics_tool.create_post("user456", "Just finished reading a great book.")
    analytics_tool.create_post("user789", "Traveling to new places is always an adventure.")

    analytics_tool.analyze_engagement()