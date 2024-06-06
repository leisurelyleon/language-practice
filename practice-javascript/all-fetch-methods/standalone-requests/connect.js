// Establish a URL for connection to the proxy server
const proxyUrl = 'https://your-proxy-server.com'; // Replace with an actual functional proxy server URL

fetch(proxyUrl, {
    method: 'CONNECT',
    headers: {
        'Host': 'example.com', // Replace with the hostname which hosts authentic connection
    },
})
.then(response => {
    if (!response.ok) {
        throw new Error(`Proxy connection failed: ${response.status}`);
    }
    // The connection is established
    console.log('Connected through proxy');
})
.catch(error => {
    console.error('Error:', error);
});