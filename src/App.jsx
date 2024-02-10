import DisplaySection from "./components/DisplaySection";
import Jumbotron from "./components/Jumbotron";
import Navbar from "./components/Navbar";
import SoundSection from "./components/SoundSection";
import WebgiViewer from "./components/WebgiViewer";
function App() {

  return (
    <div className="App">
    <Navbar/>
    <Jumbotron/>
    <SoundSection/>
    <DisplaySection/>
    <WebgiViewer/>
    </div>
  );
}

export default App;
