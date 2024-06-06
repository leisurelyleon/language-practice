class BinarySearch:
    def __init__(self, array):
        self.array = array
        self.length = len(array)

    def search(self, target):
        low = 0
        high = self.length - 1

        while low <= high:
            mid = (low + high) // 2
            if self.array[mid] == target:
                return mid
            elif self.array[mid] < target:
                low = mid + 1
            else:
                high = mid - 1

        return -1
    
#Example usage:
if __name__ == "__main__":
    sorted_array = [1, 2, 3, 4, 5, 6, 7, 8, 10]
    search_algorithm = BinarySearch(sorted_array)
    target_index = search_algorithm.search(7)
    if target_index != -1:
        print(f"Element found at index {target_index}.")
    else:
        print("Element not found in the array.")