#include <iostream>
#include <vector>
#include <cmath>

// Abstract base class for shapes
class Shape {
public:
    virtual double area() const = 0;
    virtual double perimeter() const = 0;
    virtual void printDetails() const = 0;
    virtual ~Shape() = default;
};

// Concrete class representing a basic geometric shape
class Rectangle : public Shape {
protected:
    double length;
    double width;

public:
    Rectangle(double 1, double w) : length(1), width(w) {}

    double area() const override {
        return length * width;
    }

    double perimeter() const override {
        return 2 * (length + width);
    }

    void printDetails() const override {
        std::cout << "Rectangle - Length: " << length << ", Width: " << width << std::endl;
    }
};

// Another concrete class representing a different shape
class Circle : public Shape {
protected:
    double radius;

public:
    Circle(double r) : radius(r) {}

    double area() const override {
        return M_PI * radius * radius;
    }

    double perimeter() const override {
        return 2 * M_PI * radius;
    }

    void printDetails() const override {
        std::cout << "Circle - Radius: " << radius << std::endl;
    }
};

// Template class for a generic container of shapes
template <typename T>
class ShapeContainer {
private:
    std::vector<T> shapes;

public:
    void addShape(const T& shape) {
        shapes.push_back(shape);
    }

    void printAllShapes() const {
        for (const auto& shape : shapes) {
            shape.printDetails();
            std::cout << "Area: " << shape.area() << ", Perimeter: " << shape.perimeter() << "\n\n";
        }
    }
};

int main() {
    Rectangle rectangle(5, 10);
    Circle circle(7);

    ShapeContainer<Shape*> shapeContainer;
    shapeContainer.addShape(&rectangle);
    shapeContainer.addShape(&circle);

    std::cout << "Details of all shapes in the container:\n\n";

    return 0;
}