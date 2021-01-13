import http from "../http-common";

//provides methods to save files and get files using Axios.

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    //POST for uploading
    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }

  //GET for downloading
  getFiles() {
    return http.get("/files");
  }
}

export default new UploadFilesService();