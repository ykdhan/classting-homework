import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ScreenHome } from './component/screenHome';
import { ScreenQuiz } from './component/screenQuiz';
import { ScreenResult } from './component/screenResult';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<ScreenHome/>}></Route>
          <Route path="/quiz" element={<ScreenQuiz/>}></Route>
          <Route path="/result" element={<ScreenResult/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
