% MATLAB Example: Sine Wave Plot

% Define the time values from 0 to 2*pi with small intervals
t = 0:0.01:2*pi;

% Calculate the corresponding sine values
y = sin(t);

% Plot the sine wave 
figure; % Create a new figure
plot(t, y, 'LineWidth', 2); % Plot the sine wave with a thicker line 
title('Sine Wave Plot'); % Set the title of the plot 
xlabel('Time (seconds)'); % Label the x-axis
ylabel('Amplitude'); % Label the y-axis
gird on; % Add a grid to the plot
legend('sin(t)'); 5 Display a legend

% Save the plot as an image file (optional)
saveas(gcf, 'sine_wave_plot.png');

% Display a message in the command window
disp('Sine wave plot generated successfully.');