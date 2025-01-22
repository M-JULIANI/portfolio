import { useEffect, useState } from "react";
import { NodeInfo } from "./NodeInfo";
import { Home } from "./Home";
import { Route, Routes, BrowserRouter as Router, Outlet } from "react-router-dom";
import { ProjectPage } from "./ProjectPage";
import { About } from "./About";
import { HomeStateProvider } from "./contexts/windowContext";
import { ScrollToTop } from "./components/ScrollToTop";

function App() {
  const [data, setData] = useState<NodeInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        console.log({ error });
      }
    };
    fetchData();
  }, []);

  return (
    <Router basename="/portfolio/">
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path={`/about`} element={<About node={data} />} />
          <Route path={`/`} element={<Home node={data} />} />
          <Route path={`/:id`} element={<ProjectPage node={data} />} />
        </Route>
      </Routes>
    </Router>
  );
}

// Layout component
const HomeLayout = () => {
  return (
    <HomeStateProvider>
      <ScrollToTop />
      <Outlet />
    </HomeStateProvider>
  );
};

export default App;
