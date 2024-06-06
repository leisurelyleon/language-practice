import random

# Define a class to represent a weather forecasting system
class WeatherForecaster:
    def __init__(self):
        self.cities = {}

    def add_city(self, city_name):
        """Add a new city to the weather forecasting system."""
        self.cities[city_name] = {"temperature": None, "humidity": None, "wind_speed": None}

    def generate_weather_data(self):
        """Generate random weather data for each city."""
        for city_name in self.cities:
            temperature = random.uniform(10, 30) # Simulated temperature in Celsius
            humidity = random.uniform(30, 80) # Simulated humidity percentage
            wind_speed = random.uniform(5, 20) # Simulated wind speed in km/h

            self.cities[city_name]["temperature"] = temperature
            self.cities[city_name]["humidity"] = humidity
            self.cities[city_name]["wind_speed"] = wind_speed

    def display_weather(self):
        """Display the current weather conditions for each city."""
        print("Weather Forecast:")
        for city_name, data in self.cities.items():
            print(f"{city_name}")
            print(f"    Temperature: {data['temperature']: .2f}°C")
            print(f"    Humidity: {data['humidity']: .2f}")
            print(f"    Wind Speed: {data['wind_speed']: .2f} km/h")
            print()

# Example usage of the WeatherForecaster class
if __name__ == "__main__":
    forecaster = WeatherForecaster()

    forecaster.add_city("New York")
    forecaster.add_city("Tokyo")
    forecaster.add_city("London")

    forecaster.generate_weather_data()
    forecaster.display_weather()