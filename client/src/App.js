import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Join } from './components/Join/join';
import { Chat } from './components/Chat/chat';



function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' exact element={<Join />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
  // return(<div>App</div>);
}


export default App;
