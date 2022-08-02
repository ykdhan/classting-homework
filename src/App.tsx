import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { PageHome } from './component/pages/home';
import { PageQuiz } from './component/pages/quiz';
import { PageResult } from './component/pages/result';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<PageHome/>}></Route>
          <Route path="/quiz" element={<PageQuiz/>}></Route>
          <Route path="/result" element={<PageResult/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
