import React, { useState, useEffect } from 'react';

const YourComponent: React.FC = () => {
  const [fileContent, setFileContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('./6.txt')
      .then(response => {
        console.log(response.headers.get('Content-Type'));
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('text/plain')) {
          throw new Error('Not a text file');
        }
        return response.text();
      })
      .then(text => {
        setFileContent(text);
      })
      .catch(err => {
        setError(err.message);
        console.error('Fetch error:', err);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {fileContent}
    </div>
  );
};

export default YourComponent;
