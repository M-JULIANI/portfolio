import './App.css'
import { useEffect, useState } from 'react';
import { NodeInfo } from './NodeInfo';
import { Home } from './Home';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ProjectPage } from './ProjectPage';
import { About } from './About';

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
        console.log({ error })
      }
    };
    fetchData();
  }, []);


  return (
    <Router basename='/portfolio'>
      <Routes>
        <Route path={`/about`} element={<About node={data} />} />
        <Route path={`/`} element={<Home node={data} />} />
        <Route path={`/:id`} element={<ProjectPage node={data} />} />
      </Routes>
    </Router>
  );
}

export default App
