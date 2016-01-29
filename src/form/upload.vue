<template>
  <div class="upload">
    <!-- 上传文件 -->
    <ul class="upload-files" v-on:dragenter.stop.prevent v-on:dragover.stop.prevent v-on:drop.stop.prevent="onFileDrop">
      <li v-if="files.length === 0" class="upload-files-tip">Drop Picture here</li>
      <li class="upload-file" v-for="file in files" title="file.name">
        <img class="upload-file-pic" v-bind:src="file.imgUrl" alt="">
        <span class="upload-file-name">{{file.name}}</span>
      </li>
    </ul>
    <form class="upload-operate" enctype="multipart/form-data">
      <button class="btn btn-default btn-file"><input type="file" name="picture[]" @change="onChange($event)" multiple><span class="d-icon-plus">+</span>添加图片</button>
      <button class="btn btn-primary" @click="upload()" v-disabled="uploading">{{uploading ? '正在上传...' : '上传'}}</button>
    </form>
    <!-- 上传结果 -->
    <div class="upload-result">
      <h3 class="upload-result-title">上传结果<span>（历史上传记录最多保存 <em>{{maxRecords}}</em> 条）</span></h3>
      <table>
        <thead>
          <tr>
            <th width="40px">#</th>
            <th width="70px">图片</th>
            <th width="100px">文件名</th>
            <th width="80px">大小</th>
            <th>链接</th>
            <th width="120px">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in result">
            <td>{{$index}}</td>
            <td><img class="upload-result-pic" v-bind:src="item.url"></td>
            <td>{{item.name}}</td>
            <td>{{item.size | size}}</td>
            <td class="upload-result-link"><a href="{{item.url}}" target="_blank">{{item.url}}</a></td>
            <td><button class="btn btn-primary" @click="copyUrl(item.url)">复制</button><button class="btn btn-default" @click="deleteRecord($index)">删除</button></td>
          </tr>
        </tbody>
      </table>
      <input class="upload-result-clipboard" v-el:clipboard type="text" v-model="copyText" contenteditable>
    </div>
  </div>
</template>

<style>
.upload {
  margin: 30px auto;
  border-color: #e5e5e5 #eee #eee;
  width: 940px;
  padding: 20px;
}
.upload h2 {
  color: #333;
  margin-bottom: 20px;
}
.upload li {
  list-style: none;
}
.upload .btn {
  padding: 5px 12px;
  font-size: 13px;
  line-height: 1.5;
  border-radius: 3px;
}
.upload .btn-default {
  border: 1px solid rgba(0,0,0,0.15);
}
.upload .btn:disabled {
  background-color: #ADB2B5;
  border-color: #898D90;
  color: #eee;
  cursor: default;
}
.upload .btn .d-icon-plus {
  font-weight: bold;
  font-size: 16px;
  line-height: 1;
  margin-right: 5px;
}
.upload-operate button {
  margin-right: 5px;
  width: 95px;
}
.upload-operate .btn-file {
  position: relative;
  overflow: hidden;
}
.upload-operate .btn-file input {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  opacity: 0;
  font-size: 100px;
}

/* 上传文件列表 */
.upload-files {
  overflow: hidden;
  margin-bottom: 20px;
  border: 2px dashed #8E8383;
  padding: 20px 0 0 20px;
}
.upload-files-tip {
  font-size: 40px;
  color: rgb(101, 107, 121);
  line-height: 120px;
  text-indent: 50px;
}
.upload-file {
  float: left;
  margin: 0 20px 20px 0;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 110px;
  height: 110px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.075);
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.upload-file-pic {
  width: 100%;
  height: 100%;
  display: block;
}
.upload-file-name {
  font-size: 13px;
  width: 100%;
}

/* 上传结果列表 */
.upload-result {
  margin-top: 40px;
  color: rgb(101, 107, 121);
  border-radius: 3px;
}
.upload-result-title {
  text-align: left;
  line-height: 1.5;
  font-size: 18px;
}
.upload-result-title span {
  font-size: 12px;
  color: #666;
}
.upload-result-title span em {
  color: #FF1C1C;
  font-style: normal;
}
.upload-result table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}
.upload-result th,
.upload-result td {
  text-align: center;
  border-bottom: 1px solid rgba(216, 210, 210, 0.35);
  padding: 8px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.upload-result thead th {
  font-weight: 600;
  text-transform: uppercase;
}
.upload-result tbody tr:nth-of-type(odd) {
  background-color: #fff;
}
.upload-result button + button {
  margin-left: 5px;
}
.upload-result-pic {
  width: 100%;
}
.upload-result-link {
  white-space: normal;
  text-overflow: initial;
}
.upload-result-link a {
  color: #254563;
}
.upload-result-link a:hover {
  color: #55aff0;
  text-decoration: underline;
}
.upload-result-clipboard {
  opacity: 0;
}

</style>

<script type="text/ecmascript-6">
  export default {

    data() {
      return {
        maxRecords: 20,
        uploading: false,
        files: [],
        result: JSON.parse(localStorage.getItem('uploadPicture[]')) || [],
        url: ''
      };
    },
    methods: {
      upload() {
        if (this.uploading) return;
        this.uploading = true;

        var formData = new FormData();

        this.files.forEach(function(file) {
          formData.append('picture[]', file);
        });

        this.$http.post(this.url, formData, (data) => {
          var result = this.result;

          this.uploading = false;

          data.forEach(function(item, index) {
            var file = this.files[index];

            item = item || 'Upload Fail';

            result.unshift({
              url: item.replace(/(.)(..)(.{29}(.+))/, 'http://fuss.test.ele.me/$1/$2/$3.$4'),
              name: file.name,
              size: file.size
            });
          });
        }, (e) => {
          this.uploading = false;
          alert('系统异常！');
        });
      },
      deleteRecord(index) {
        this.result.splice(index, 1);
      },
      copyUrl(url) {
        this.copyText = url;
        this.$els.clipboard.select();
        document.execCommand('copy', true);
      },
      parseFiles(rawFiles) {
        var [i, len] = [0, rawFiles.length];

        for (; i < len; i++) {
          rawFiles[i].imgUrl = URL.createObjectURL(rawFiles[i]);
        }

        return Array.prototype.slice.call(rawFiles, 0);
      },
      onFileDrop(e) {
        this.files = this.parseFiles(e.dataTransfer.files);
      },
      onChange(e) {
        this.files = this.parseFiles(e.srcElement.files);
      }

    },
    watch: {
      'result'(newValue, oldVal) {
        var maxRecords = this.maxRecords;

        if (newValue.length >= maxRecords) {
          this.result = newValue.slice(0, maxRecords);
        }
        localStorage.setItem('uploadPicture[]', JSON.stringify(newValue));
      }
    }
  };
</script>
