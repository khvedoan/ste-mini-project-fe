import { useState } from "react";
import request, { QueryFilter } from "../api-request";

function FileUploader({ loadDataFn }: { loadDataFn: (queryFilter: QueryFilter) => void }) {
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [progressClass, setProgressClass] = useState<string>("hidden-bar");
  const [fileDisabled, setFileDisable] = useState<boolean>();
  const [showSubmit, setShowSubmit] = useState<boolean>(true);
  const [showNewUpload, setShowNewUpload] = useState<boolean>();

  const toggleShowSubmit = () => {
    setShowSubmit(true);
    setFileDisable(false);
    setShowNewUpload(false);
  }

  const resetProgressBar = () => {
    setProgress(0);
    setProgressClass("hidden-bar");
  }

  const readFile = (e: any) => {
    if (!e.target.files.length) {
      alert("Please select a csv file to upload.");

      return;
    }
    setProgressClass("shown-bar");
    const reader = new FileReader();
    reader.addEventListener('progress', (event) => {
      const percent = Math.round((event.loaded / event.total) * 100);
      setProgress(percent);
    });
  
    reader.readAsText(e.target.files[0]);
    if(e.target.files[0].type !== "text/csv") {
      alert("Only csv files are supported.");
    } else {
      setSelectedFiles(e.target.files);
    }
  }

  const handleSubmit = (e: any) => {
    if (!selectedFiles.length) {
      alert("Please select a csv file to upload.");

      return;
    }
    e.preventDefault();
    setShowSubmit(false);
    setFileDisable(true);
    setShowNewUpload(true);
    let formData = new FormData();
    formData.append("file", selectedFiles[0]);
  
    request({
      method: "POST",
      url: "csv-file",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }).then((res) => {
      if (res.status === 200) {
        alert("File upload successful.");
        loadDataFn({ page: 1 });
      } else {
        alert(res.statusText);
        console.log(res);
      }
    }).catch((error) => {
      alert(error.message);
      console.log(error);
    });
  };
  return (
    <form onSubmit={handleSubmit}>
        <label className="form-name">Upload CSV File</label>
        <br/>
        <input
          className="form-input"
          type="file"
          accept=".csv"
          disabled={fileDisabled}
          onChange={readFile}
          onClick={resetProgressBar}
          data-testid="file-input"
        />
      <div className={progressClass} data-testid="progress-bar">
        <progress className="form-progress-bar" value={progress} max="100"/>
        <br/>
        <a>{progress}%</a>
      </div>
      {showSubmit &&
        <button className="form-submit-button" type="submit" data-testid="submit-button">Submit</button>}
      {showNewUpload &&
        <button className="form-submit-button" onClick={toggleShowSubmit} data-testid="new-submit-button">Upload new file</button>}
    </form>
  );
}

export default FileUploader;
