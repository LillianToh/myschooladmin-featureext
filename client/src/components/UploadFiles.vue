<template>
  <div>
      <div v-if="currentFile" class="progress">
          <div class="progress-bar progress-bar-info" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100" :style="{ width: progress + '%'}">
              {{ progress }}%
          </div>
      </div>

      <label class="btn btn-default">
         <input type="file" ref="file" @change="selectFile" />
      </label>

      <button class="btn btn-success" :disabled="!selectedFiles" @click="upload">
          Upload
      </button>

      <div class="alert alert-light" role="alert">
          {{ message }}
      </div>

      <div>
          List of files
      </div>

      <ul>
          <li v-for="(file, index) in fileInfos" :key="index">
              <a :href="file.url">
                  {{ file.name }}
              </a>
          </li>
      </ul>

  </div>
</template>

<script>
import UploadService from "../services/UploadFilesService";

export default {
    name: "upload-files",
    data() {
        return {
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",
            fileInfos: []
        };
    },
    methods: {
        selectFile() {
            //reference to html element ref="file"
            this.selectedFiles = this.$refs.file.files;
        },
        upload() {
            this.progress = this.selectedFiles.item(0);
            UploadService.upload(this.currentFile, event => {
                this.progress = Math.round((100 * event.loaded) / event.total);
            })
              .then(response => {
                  this.message = response.data.message;
                  return UploadService.getFiles();
              })
              .then(files => {
                  this.fileInfos = files.data;
              })
              .catch(() => {
                  this.progress = 0;
                  this.message = "sorry file not uploaded";
                  this.currentFile = undefined;
              });
            this.selectedFiles = undefined; 
        },
        mounted() {
            UploadService.getFiles().then(response => {
                this.fileInfos = response.data;
            });
        }
    }
};
</script>

<style>

</style>