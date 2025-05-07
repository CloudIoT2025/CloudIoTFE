import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/main/Main';
import Select from './components/select/Select';
import YoutubePlayer from './components/exercise/Exercise';
import ResultPage from './components/result/ResultPage';
import LoadingPage from './components/loading/LoadingPage';
import WeeklyChart from './components/weekly/WeeklyChart';
import LoginCompleted from './components/loading/LoginCompleted';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        {/*<Route path = '/raspberry-modal' element={<RaspberryCodeModal/>}/>*/}
        <Route path="/select" element={<Select />} />
        <Route path="/youtube" element={<YoutubePlayer />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/weekly" element={<WeeklyChart />} />
        <Route path="/logincompleted" element={<LoginCompleted />} />
      </Routes>
    </Router>
  );
}

export default App;
