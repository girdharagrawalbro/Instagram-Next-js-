import { useState } from 'react';

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file); // file is a binary image data
  
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
  
    const data = await res.json();
    setFilePath(data.filePath);
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {filePath && <img src={filePath} alt="Uploaded Image" />}
    </div>
  );
}
