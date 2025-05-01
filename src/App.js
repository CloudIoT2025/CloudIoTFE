import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Main from './components/main/Main';
import RaspberryCodeModal from "./components/modal/RaspberryCodeModal";
import Select from "./components/select/Select";
import YoutubePlayer from "./components/exercise/Exercise"
import ResultPage from "./components/result/ResultPage";
import LoadingPage from "./components/loading/LoadingPage";
import WeeklyChart from "./components/weekly/WeeklyChart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path = '/' element={<Main/>}/>
        {/*<Route path = '/raspberry-modal' element={<RaspberryCodeModal/>}/>*/}
        <Route path = '/ex' element={<Select/>}/>
        <Route path= '/youtube' element={<YoutubePlayer/>}/>
        <Route path= '/loading' element={<LoadingPage/>}/>
        <Route path= '/result' element={<ResultPage/>}/>
        <Route path= '/weekly' element={<WeeklyChart/>}/>
      </Routes>
    </Router>
  );
}

export default App;
