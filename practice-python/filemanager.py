import os

# Define a class to represent a file manager
class FileManager:
    def __init__(self, base_directory):
        self.base_directory = base_directory

    def create_directory(self, directory_name):
        """Create a new directory within the base directory."""
        directory_path = os.path.join(self.base_directory, directory_name)
        os.makedirs(directory_path, exist_ok=True)
        print(f"Created directory: {directory_path}")

    def list_directory_contents(self, directory_name):
        """List the contents of a directory within the base directory."""
        directory_path = os.path.join(self.base_directory, directory_name)
        if os.path.exists(directory_path):
            print(f"Contents of {directory_path}:")
            for item in os.listdir(directory_path):
                print(item)
        else:
            print(f"Directory {directory_name} does not exist.")

    def create_file(self, directory_name, file_name, content=""):
        """Create a new file within a directory, with optional content."""
        directory_path = os.path.join(self.base_directory, directory_name)
        file_path = os.path.join(directory_path, file_name)
        with open(file_path, 'w') as file:
            file.write(content)
        print(f"Created file: {file_path}")

    def read_file(self, directory_name, file_name):
        """Read the content of a file within a directory."""
        directory_path = os.path.join(self.base_directory, directory_name)
        file_path = os.path.join(directory_path, file_name)
        if os.path.exists(file_path):
            with open(file_path, 'r') as file:
                content = file.read()
            print(f"Content of {file_path}:")
            print(content)
        else:
            print(f"File {file_name} does not exist in {directory_name}.")

# Example utilization of the FileManager class
if __name__ == "__main__":
    base_directory = "my_file_manager"
    file_manager = FileManager(base_directory)

    file_manager.create_directory("documents")
    file_manager.create_directory("pictures")

    file_manager.create_file("documents", "document.txt", "This is a sample document.")
    file_manager.create_file("pictures", "image.jpg")

    file_manager.list_directory_contents("documents")
    file_manager.list_directory_contents("music")

    file_manager.read_file("documents", "document.txt")