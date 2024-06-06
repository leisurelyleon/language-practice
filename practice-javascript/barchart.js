// Data Visualization Module using D3.js
class BarChart {
    constructor(data, containerId) {
        this.data = data;
        this.containerId = containerId;
        this.margin = { top: 20, right: 30, bottom: 30, left: 40};
        this.width = 600 - this.margin.left - this.margin.right;
        this.height = 400 - this.margin.top - this.margin.bottom;

        this.initializeChart();
    }

    initializeChart() {
        this.svg = d3
            .select(`#${this.containerId}`)
            .append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

        this.xScale = d3.scaleBand().range([0, this.width]).padding(0.1);
        this.yScale = d3.scaleLinear().range([this.height, 0]);

        this.updateChart();
    }

    updateChart() {
        this.xScale.domain(this.data.map((d) => d.label));
        this.yScale.domain([0, d3.max(this.data, (d) => d.value)]);

        // Update existing bars
        const bars = this.svg.selectAll('.bar').data(this.data);
        bars
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .merge(bars)
            .transition()
            .duration(1000)
            .attr('x', (d) => this.xScale(d.label))
            .attr('width', this.xScale.bandwidth())
            .attr('y', (d) => this.yScale(d.value))
            .attr('height', (d) => this.height - this.yScale(d.value));

        // Remove bars not in the updated data
        bars.exit().remove();

        // Axes
        this.svg
            .append('g')
            .attr('transform', `translate(0,${this.height})`)
            .call(d3.axisBottom(this.xScale));

        this.svg.append('g').call(d3.axisLeft(this.yScale));
    }
}

// Example Usage
const chartData = [
    { label: 'Category A', value: 30 },
    { label: 'Category B', value: 50 },
    { label: 'Category C', value: 20 },
    { label: 'Category D', value: 40 },
];

const chartContainerId = 'chart-container';
const myBarChart = new BarChart(chartData, chartContainerId);

// Simulate data update after a delay
setTimeout(() => {
    const updatedData = [
        { label: 'Category A', value: 40 },
        { label: 'Category B', value: 20 },
        { label: 'Category C', value: 60 },
        { label: 'Category D', value: 30 },
    ];
    myBarChart.data = updatedData;
    myBarChart.updateChart();
}, 3000);