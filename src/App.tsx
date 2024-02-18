import './App.css'
import { useEffect, useState } from 'react';
import { NodeInfo } from './NodeInfo';
import {Home} from './Home';

//const data: TreeNode = sampleData;

function App() {

    const [data, setData] = useState<NodeInfo | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('./data.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
            <Home />
    )
}

export default App
