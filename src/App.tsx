import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UploadFiles from "./components/FileUpload";
import React from "react";

function App() {
  return (
    <div className="App">
      <div className="container my-5 shadow-lg p-5">
        <h3 className="text-center text-black">Find Out Meaning Without Reading</h3>
        <hr className="my-2" />
        <div className="row">
          <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
            <UploadFiles />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;