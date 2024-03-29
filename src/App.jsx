import { useRef } from "react";
import DisplaySection from "./components/DisplaySection";
import Jumbotron from "./components/Jumbotron";
import Navbar from "./components/Navbar";
import SoundSection from "./components/SoundSection";
import WebgiViewer from "./components/WebgiViewer";
function App() {
  const webgiViewerRef = useRef();
  const contentRef = useRef();
  const handlePreview = () => {
    webgiViewerRef.current.triggerPreview();
  };
  return (
    <div className="App">
      <div ref={contentRef} className="" id="content">
        <Navbar />
        <Jumbotron />
        <SoundSection />
        <DisplaySection triggerPreview={handlePreview} />
      </div>
      <WebgiViewer contentRef={contentRef} ref={webgiViewerRef} />
    </div>
  );
}

export default App;
