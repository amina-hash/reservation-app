import { useState } from 'react';

function App() {
  const handleClick = async () => {
    const response = await fetch('http://localhost:3000/api/test', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <button onClick={handleClick}>Get Data</button>
    </>
  );
}

export default App;