import axios from "axios";

const url = "https://api.textrazor.com";
const key = process.env.REACT_APP_TEXT_RAZOR_API_KEY;

const upload = async (file: any) => {
  const urlencoded = new URLSearchParams();
  urlencoded.append("extractors", "entities,words");
  urlencoded.append(
    "text",
    file
  );
 
  const response = axios.post(url, urlencoded, {
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      "X-TextRazor-Key": key,
    },
  });
  return response;
};

const FileUploadService = {
  upload,
};

export default FileUploadService;
