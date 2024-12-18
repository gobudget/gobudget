import React, { useState } from 'react';

const SimpleParseButton = () => {
  const [message, setMessage] = useState('');

  const handleParse = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/execute-parser', {
        method: 'GET',
      });

      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = { error: 'Server returned non-JSON response' };
      }

      if (response.ok) {
        setMessage('Parsing executed successfully');
        console.log(data); // Log the result
      } else {
        setMessage(data.error || 'Error executing parser');
      }
    } catch (err) {
      setMessage(err.message || 'Error executing parser');
    }
  };

  return (
    <div>
      <button onClick={handleParse} className="mt-4 rounded bg-purple-500 p-2 text-white">
        Execute Simple Parser
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SimpleParseButton;