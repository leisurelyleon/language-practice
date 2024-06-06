import React, {useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('https://api.example.com/data')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

return (
    <div>
        {data ? (
            <ul>
                {data.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
        ) : (
          <p>Loading...</p>
        )}
    </div>
  );
};

export default App;