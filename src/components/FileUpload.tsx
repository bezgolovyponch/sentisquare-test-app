import React, { useState, useEffect } from "react";
import FileUploadService from "../services/FileUploadService";
import Chart, { CustomPieChart } from "./Chart";
import MatchedEntitiesList from "./ListGroup";

const defaultText = "George Bush was president of USA.";

export const UploadFiles = () => {
  const [currentFile, setCurrentFile]: any = useState(defaultText);
  const [fileInfos, setFileInfos]: any = useState(null);
  useEffect(() => {
    FileUploadService.upload(currentFile)
      .then((response) => {
        setFileInfos(response.data);
        return response.data;
      })
      .catch(() => {
        console.log("Could not upload the file!");
        setCurrentFile(null);
      });
  }, [currentFile]);

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    const reader = new FileReader();

    reader.onload = function (e) {
      const content = reader.result;
      //Here the content has been read successfuly
      console.log(content);
      setCurrentFile(content);
    };

    reader.readAsText(selectedFiles?.[0]);
  };
  return (
    <div>
      <div className="d-flex justify-content-center mt-2 mb-1">
        <label className="btn btn-outline-primary">
          Choose file
          <input type="file" onChange={selectFile} style={{ display: "none" }} />
        </label>
      </div>
      {currentFile !== null && fileInfos !== null ? (
        <div>
          <div>
            <Chart data={fileInfos?.response.entities} />
            <CustomPieChart data={fileInfos?.response.entities} />
          </div>
          <h6>Matched entities in analyzed text, amount</h6>
          <MatchedEntitiesList data={fileInfos?.response.entities} />
        </div>
      ) : null}
    </div>
  );
};

export default UploadFiles;
