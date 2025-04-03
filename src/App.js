import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Main from './components/main/Main';
import RaspberryCodeModal from "./components/modal/RaspberryCodeModal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path = '/' element={<Main/>}/>
        <Route path = '/raspberry-modal' element={<RaspberryCodeModal/>}/>
      </Routes>
    </Router>
  );
}

export default App;
