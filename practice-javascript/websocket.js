// WebSocket setup for real-time data
const socket = new WebSocket('wss://stock-market-api.example.com');

// D3.js setup for chart
const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const width = window.innerWidth - margin.left - margin.right;
const height = 300;

const svg = d3.select('#stock-chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Initial data for the chart
    let data = [];
    const maxDataPoints = 50;

    // Line chart setup
    const xScale = d3.scaleLinear().range([0, width]);
    const yScale = d3.scaleLinear().range([height, 0]);
    const line = d3.line().x(d => xScale(d.index)).y(d => yScale(d.value));
    const path = svg.append('path').data([data]).attr('class', 'line');

    // Update chart with new data
    const updateChart = () => {
        xScale.domain(d3.extent(data, d => d.index));
        yScale.domain([0, d3.max(data, d => d.value)]);

        svg.select('.line')
            .attr('d', line)
            .attr('transform', null);

        svg.select('.x.axis')
            .call(d3.axisBottom(xScale));

        svg.select('.y.axis')
            .call(d3.axisLeft(yScale));
    };

    // WebSocket event listener for new data
    socket.addEventListener('message', (event) => {
        const newDataPoint = { index: new Date(), value: parseFloat(event.data) };

        // Update data array with new point
        data.push(newDataPoint);
        if (data.length > maxDataPoints) {
            data.shift(); // Remove oldest data point
        }

        // Update the chart
        updateChart();
    });

    // Initialize chart axes
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(xScale));

    svg.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(yScale));