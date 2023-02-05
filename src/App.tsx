import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UploadFiles from "./components/FileUpload";
import React from "react";

function App() {
  return (
    <div className="App">
      <div className="container" style={{ width: "100%" }}>
        <div className="my-3">
          <h4>File Upload</h4>
        </div>
        <UploadFiles />
      </div>
    </div>
  );
}

export default App;
