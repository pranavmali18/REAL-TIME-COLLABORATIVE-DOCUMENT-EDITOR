import { useEffect, useState } from "react";

function App() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/doc")
      .then(res => res.json())
      .then(data => setContent(data.content));
  }, []);

  const saveDoc = () => {
    fetch("http://localhost:5000/doc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });
    alert("Document Saved");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Collaborative Document Editor</h2>
      <textarea
        rows="15"
        cols="80"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <br /><br />
      <button onClick={saveDoc}>Save</button>
    </div>
  );
}

export default App;
