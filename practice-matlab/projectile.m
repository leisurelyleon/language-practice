% MATLAB Example: Projectile Motion

% Parameters
g = 9.8; % Acceleration due to gravity (m/s^2)
initial_velocity = 20; % Initial velocity of the projectile (m/s)
launch_angle = 25; % Launch angle in degrees

% Convert launch angle to radians
launch_angle_rad = deg2rad(launch_angle);

% Time vector from 0 to 4 seconds with small intervals 
time_interval = 0:0.01:4;

% Calculate horizontal and vertical components of the projectile motion 
horizontal_velocity = initial_velocity * cos(launch_angle_rad);
vertical_velocity = initial_velocity * sin(launch_angle_rad);

% Calculate the horizontal and vertical positions at each time point 
horizontal_position = horizontal_velocity * time_interval;
vertical_position = vertical_velocity * time_interval - 0.5 * g * time_interval.^2;

% Plot the projectile motion
figure;

% Plot the trajectory
plot(horizontal_position, vertical_position, "LineWidth", 2);
title('Projectile Motion');
xlabel('Horizontal Distance (m)');
ylabel('Vertical Distance (m)');
grid on;

% Add labels to indicate the start and end points 
text(horizontal_position(1), vertical_position(1), 'Start', 'FontSize', 8);
text(horizontal_position(end), vertical_position(end), 'End', 'FontSize', 8);

% Add a legend
legend('Projectile Trajectory');

% Display maximum height and horizontal range in the command window
max_height = max(vertical_position);
horizontal_range = max(horizontal_position);

fprintf('Maximum Height: %.2f meters\n', max_height);
fprintf('Horizontal RangE: %.2f meters\n', horizontal_range);