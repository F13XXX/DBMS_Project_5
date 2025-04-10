import React from 'react';
import UserPerformanceComponent from './components/UserPerformanceComponent';

function App() {
  return (
    <div className="App">
      {/*Call this Component with username={username}, to incorporate into nosqlconceptstool.*/}
      <UserPerformanceComponent username="bob" />
    </div>
  );
}

export default App;
