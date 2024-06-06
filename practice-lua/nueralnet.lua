-- Define the neural network architecture
function create_nueral_network(input_size, hidden_size, output_size)
    local network = {}

    -- Initialize weights and biases randomly
    network.weights_input_hidden = torch.rand(hidden_size, input_size)
    network.biases_hidden = torch.rand(hidden_size, 1)
    network.weights_hidden_output = torch.rand(output_size, hidden_size)
    network.biases_output = torch.rand(output_size, 1)

    return network
end

-- Define the sigmoid activation function
function sigmoid(x)
    return 1 / (1 + math.exp(-x))
end

-- Forward pass through the neural network
function forward_pass(network, input)
    local hidden_input = network.weights_input_hidden * input + network.biases_hidden
    local hidden_output = hidden_input:apply(sigmoid)

    local final_input = network.weights_hidden_output * hidden_output + network.biases_output
    local final_output = final_input:apply(sigmoid)

    return final_output
end

-- Define the mean sqaured error loss function
function mean_squared_error(target, prediction)
    return torch.pow(target - prediction, 2):mean()
end

-- Backward pass and weight update using backpropagation
function backward_pass(network, input, target, learning_rate)
    -- Forward pass
    local hidden_input = network.weights_input_hidden * input + network.biases_hidden
    local hidden_output = hidden_input:apply(sigmoid)

    local final_input = network.weights_hidden_output * hidden_output + network.biases_output
    local final_output = final_input:apply(sigmoid) 

    -- Comput loss
    local loss = mean_squared_error(target, final_output) 

    -- Backward pass
    local output_error = final_output - target
    local output_delta = output_error:cmul(final_output:cmul(1 - final_output))

    local hidden_error = network.weights_hidden_output:t() * output_delta
    local hidden_delta = hidden_error:cmul(hidden_output:cmul(1 - hidden_output))

    -- Update weights and biases
    network.weights_hidden_output = network.weights_hidden_output - learning_rate * output_delta * hidden_output:t()
    network.biases_output = network.biases_output - learning_rate * output_delta

    network.weights_input_hidden = network.weights_input_hidden - learning_rate *hidden_delta * input:t()
end

-- Example usage
local input_size = 3
local hidden_size = 5
local output_size = 1
local learning_rate = 0.01

local training_data = torch.rand(100, input_size) -- Example training data
local training_data = torch.rand(100, output_size) -- Example target data

local neural_network = create_neural_network(input_size, hidden_size, output_size)

-- Training loop
for epoch = 1, 1000 do
    for i = 1, training_data:size(1) do
        local input = training_data[i]:view(input_size, 1)
        local target = target_data[i]:view(output_size, 1)

        -- Forward and backward pass
        forward_pass(neural_network, input)
        backward_pass(neural_network, input, target, learning_rate)
    end
end