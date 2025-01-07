import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Logo from "./components/Logo/Logo";
// import Search from './components/SearchAndFilter/SearchAndFilter';
import Card from "./components/Card/Card";
import Table from "./components/Table/Table";

function App() {
  return (
    <>
      <Navbar>
        <Logo></Logo>
      </Navbar>
      <div className="section1">
        <h1 className="sectionOneFirstInfo">
          Search Smarter, <br />
          Explore Faster
        </h1>
        <Table></Table>
      </div>
    </>
  );
}

export default App;
