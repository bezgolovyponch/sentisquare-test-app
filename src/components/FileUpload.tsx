import React, { useState, useEffect } from "react";
import FileUploadService from "../services/FileUploadService";
import Chart, { CustomPieChart } from "./Chart";
import MatchedEntitiesList from "./ListGroup";

const defaultText = "George Bush was president of USA.";

export const UploadFiles = () => {
  const [currentFile, setCurrentFile] = useState(defaultText);
  const [progress, setProgress] = useState(0);
  const [fileInfos, setFileInfos] = useState(null);
  useEffect(() => {
    FileUploadService.upload(currentFile).then((response) => {
      setFileInfos(response.data);
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
    setProgress(0);
  };

  const upload = () => {
    setProgress(0);
    if (!currentFile) return;

    FileUploadService.upload(currentFile, (event: any) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setFileInfos(response.data);
        return response.data;
      })
      .catch(() => {
        setProgress(0);
        console.log("Could not upload the file!");
        setCurrentFile(null);
      });

    setCurrentFile(currentFile);
  };
  return (
    <div>
      <div className="row">
        <div className="col-8">
          <label className="btn btn-default p-0">
            <input type="file" onChange={selectFile} />
          </label>
        </div>

        <div className="col-4">
          <button
            className="btn btn-success btn-sm"
            disabled={!currentFile}
            onClick={upload}
          >
            Upload
          </button>
        </div>
      </div>

      {currentFile && (
        <div className="progress my-3">
          <div
            className="progress-bar progress-bar-info"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: progress + "%" }}
          >
            {progress}%
          </div>
        </div>
      )}
      {fileInfos !== null ? (
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
