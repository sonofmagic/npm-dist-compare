"use strict";
const helper = require("./helper-x_rsIeNY.cjs");
require("vue");
const locale = require("./locale-j1fuSDyN.cjs");
const ElProgress = require("element-ui/lib/progress");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const migrating = require("./migrating-BMLifAiB.cjs");
const _sfc_main$3 = {
  name: "ElUploadList",
  mixins: [locale.Locale],
  data() {
    return {
      focusing: false
    };
  },
  components: { ElProgress },
  props: {
    files: {
      type: Array,
      default() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    handlePreview: Function,
    listType: String
  },
  methods: {
    parsePercentage(val) {
      return parseInt(val, 10);
    },
    handleClick(file) {
      this.handlePreview && this.handlePreview(file);
    }
  }
};
var _sfc_render$3 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition-group", { class: [
    "el-upload-list",
    "el-upload-list--" + _vm.listType,
    { "is-disabled": _vm.disabled }
  ], attrs: { "tag": "ul", "name": "el-list" } }, _vm._l(_vm.files, function(file) {
    return _c("li", { key: file.uid, class: ["el-upload-list__item", "is-" + file.status, _vm.focusing ? "focusing" : ""], attrs: { "tabindex": "0" }, on: { "keydown": function($event) {
      if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "delete", [8, 46], $event.key, ["Backspace", "Delete", "Del"])) return null;
      !_vm.disabled && _vm.$emit("remove", file);
    }, "focus": function($event) {
      _vm.focusing = true;
    }, "blur": function($event) {
      _vm.focusing = false;
    }, "click": function($event) {
      _vm.focusing = false;
    } } }, [_vm._t("default", function() {
      return [file.status !== "uploading" && ["picture-card", "picture"].indexOf(_vm.listType) > -1 ? _c("img", { staticClass: "el-upload-list__item-thumbnail", attrs: { "src": file.url, "alt": "" } }) : _vm._e(), _c("a", { staticClass: "el-upload-list__item-name", on: { "click": function($event) {
        return _vm.handleClick(file);
      } } }, [_c("i", { staticClass: "el-icon-document" }), _vm._v(_vm._s(file.name) + " ")]), _c("label", { staticClass: "el-upload-list__item-status-label" }, [_c("i", { class: {
        "el-icon-upload-success": true,
        "el-icon-circle-check": _vm.listType === "text",
        "el-icon-check": ["picture-card", "picture"].indexOf(_vm.listType) > -1
      } })]), !_vm.disabled ? _c("i", { staticClass: "el-icon-close", on: { "click": function($event) {
        return _vm.$emit("remove", file);
      } } }) : _vm._e(), !_vm.disabled ? _c("i", { staticClass: "el-icon-close-tip" }, [_vm._v(_vm._s(_vm.t("el.upload.deleteTip")))]) : _vm._e(), _vm._v(" "), file.status === "uploading" ? _c("el-progress", { attrs: { "type": _vm.listType === "picture-card" ? "circle" : "line", "stroke-width": _vm.listType === "picture-card" ? 6 : 2, "percentage": _vm.parsePercentage(file.percentage) } }) : _vm._e(), _vm.listType === "picture-card" ? _c("span", { staticClass: "el-upload-list__item-actions" }, [_vm.handlePreview && _vm.listType === "picture-card" ? _c("span", { staticClass: "el-upload-list__item-preview", on: { "click": function($event) {
        return _vm.handlePreview(file);
      } } }, [_c("i", { staticClass: "el-icon-zoom-in" })]) : _vm._e(), !_vm.disabled ? _c("span", { staticClass: "el-upload-list__item-delete", on: { "click": function($event) {
        return _vm.$emit("remove", file);
      } } }, [_c("i", { staticClass: "el-icon-delete" })]) : _vm._e()]) : _vm._e()];
    }, { "file": file })], 2);
  }), 0);
};
var _sfc_staticRenderFns$3 = [];
var __component__$3 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$3,
  _sfc_render$3,
  _sfc_staticRenderFns$3,
  false
);
const UploadList = __component__$3.exports;
function getError(action, option, xhr) {
  let msg;
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `fail to post ${action} ${xhr.status}`;
  }
  const err = new Error(msg);
  err.status = xhr.status;
  err.method = "post";
  err.url = action;
  return err;
}
function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}
function upload(option) {
  if (typeof XMLHttpRequest === "undefined") {
    return;
  }
  const xhr = new XMLHttpRequest();
  const action = option.action;
  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
      }
      option.onProgress(e);
    };
  }
  const formData = new FormData();
  if (option.data) {
    Object.keys(option.data).forEach((key) => {
      formData.append(key, option.data[key]);
    });
  }
  formData.append(option.filename, option.file, option.file.name);
  xhr.onerror = function error(e) {
    option.onError(e);
  };
  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr));
    }
    option.onSuccess(getBody(xhr));
  };
  xhr.open("post", action, true);
  if (option.withCredentials && "withCredentials" in xhr) {
    xhr.withCredentials = true;
  }
  const headers = option.headers || {};
  for (let item in headers) {
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item]);
    }
  }
  xhr.send(formData);
  return xhr;
}
const _sfc_main$2 = {
  name: "ElUploadDrag",
  props: {
    disabled: Boolean
  },
  inject: {
    uploader: {
      default: ""
    }
  },
  data() {
    return {
      dragover: false
    };
  },
  methods: {
    onDragover() {
      if (!this.disabled) {
        this.dragover = true;
      }
    },
    onDrop(e) {
      if (this.disabled || !this.uploader) return;
      const accept = this.uploader.accept;
      this.dragover = false;
      if (!accept) {
        this.$emit("file", e.dataTransfer.files);
        return;
      }
      this.$emit("file", [].slice.call(e.dataTransfer.files).filter((file) => {
        const { type, name } = file;
        const extension = name.indexOf(".") > -1 ? `.${name.split(".").pop()}` : "";
        const baseType = type.replace(/\/.*$/, "");
        return accept.split(",").map((type2) => type2.trim()).filter((type2) => type2).some((acceptedType) => {
          if (/\..+$/.test(acceptedType)) {
            return extension === acceptedType;
          }
          if (/\/\*$/.test(acceptedType)) {
            return baseType === acceptedType.replace(/\/\*$/, "");
          }
          if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
            return type === acceptedType;
          }
          return false;
        });
      }));
    }
  }
};
var _sfc_render$2 = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-upload-dragger", class: {
    "is-dragover": _vm.dragover
  }, on: { "drop": function($event) {
    $event.preventDefault();
    return _vm.onDrop.apply(null, arguments);
  }, "dragover": function($event) {
    $event.preventDefault();
    return _vm.onDragover.apply(null, arguments);
  }, "dragleave": function($event) {
    $event.preventDefault();
    _vm.dragover = false;
  } } }, [_vm._t("default")], 2);
};
var _sfc_staticRenderFns$2 = [];
var __component__$2 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$2,
  _sfc_render$2,
  _sfc_staticRenderFns$2,
  false
);
const UploadDragger = __component__$2.exports;
const _sfc_main$1 = {
  inject: ["uploader"],
  components: {
    UploadDragger
  },
  props: {
    type: String,
    action: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: "file"
    },
    data: Object,
    headers: Object,
    withCredentials: Boolean,
    multiple: Boolean,
    accept: String,
    onStart: Function,
    onProgress: Function,
    onSuccess: Function,
    onError: Function,
    beforeUpload: Function,
    drag: Boolean,
    onPreview: {
      type: Function,
      default: function() {
      }
    },
    onRemove: {
      type: Function,
      default: function() {
      }
    },
    fileList: Array,
    autoUpload: Boolean,
    listType: String,
    httpRequest: {
      type: Function,
      default: upload
    },
    disabled: Boolean,
    limit: Number,
    onExceed: Function
  },
  data() {
    return {
      mouseover: false,
      reqs: {}
    };
  },
  methods: {
    isImage(str) {
      return str.indexOf("image") !== -1;
    },
    handleChange(ev) {
      const files = ev.target.files;
      if (!files) return;
      this.uploadFiles(files);
    },
    uploadFiles(files) {
      if (this.limit && this.fileList.length + files.length > this.limit) {
        this.onExceed && this.onExceed(files, this.fileList);
        return;
      }
      let postFiles = Array.prototype.slice.call(files);
      if (!this.multiple) {
        postFiles = postFiles.slice(0, 1);
      }
      if (postFiles.length === 0) {
        return;
      }
      postFiles.forEach((rawFile) => {
        this.onStart(rawFile);
        if (this.autoUpload) this.upload(rawFile);
      });
    },
    upload(rawFile) {
      this.$refs.input.value = null;
      if (!this.beforeUpload) {
        return this.post(rawFile);
      }
      const before = this.beforeUpload(rawFile);
      if (before && before.then) {
        before.then((processedFile) => {
          const fileType = Object.prototype.toString.call(processedFile);
          if (fileType === "[object File]" || fileType === "[object Blob]") {
            if (fileType === "[object Blob]") {
              processedFile = new File([processedFile], rawFile.name, {
                type: rawFile.type
              });
            }
            for (const p in rawFile) {
              if (rawFile.hasOwnProperty(p)) {
                processedFile[p] = rawFile[p];
              }
            }
            this.post(processedFile);
          } else {
            this.post(rawFile);
          }
        }, () => {
          this.onRemove(null, rawFile);
        });
      } else if (before !== false) {
        this.post(rawFile);
      } else {
        this.onRemove(null, rawFile);
      }
    },
    abort(file) {
      const {
        reqs
      } = this;
      if (file) {
        let uid = file;
        if (file.uid) uid = file.uid;
        if (reqs[uid]) {
          reqs[uid].abort();
        }
      } else {
        Object.keys(reqs).forEach((uid) => {
          if (reqs[uid]) reqs[uid].abort();
          delete reqs[uid];
        });
      }
    },
    post(rawFile) {
      const {
        uid
      } = rawFile;
      const options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: (e) => {
          this.onProgress(e, rawFile);
        },
        onSuccess: (res) => {
          this.onSuccess(res, rawFile);
          delete this.reqs[uid];
        },
        onError: (err) => {
          this.onError(err, rawFile);
          delete this.reqs[uid];
        }
      };
      const req = this.httpRequest(options);
      this.reqs[uid] = req;
      if (req && req.then) {
        req.then(options.onSuccess, options.onError);
      }
    },
    handleClick() {
      if (!this.disabled) {
        this.$refs.input.value = null;
        this.$refs.input.click();
      }
    },
    handleKeydown(e) {
      if (e.target !== e.currentTarget) return;
      if (e.keyCode === 13 || e.keyCode === 32) {
        this.handleClick();
      }
    }
  },
  render(h) {
    let {
      handleClick,
      drag,
      name,
      handleChange,
      multiple,
      accept,
      listType,
      uploadFiles,
      disabled,
      handleKeydown
    } = this;
    const data = {
      class: {
        "el-upload": true
      },
      on: {
        click: handleClick,
        keydown: handleKeydown
      }
    };
    data.class[`el-upload--${listType}`] = true;
    return h("div", helper._mergeJSXProps2([{}, data, {
      "attrs": {
        "tabindex": "0"
      }
    }]), [drag ? h("upload-dragger", {
      "attrs": {
        "disabled": disabled
      },
      "on": {
        "file": uploadFiles
      }
    }, [this.$slots.default]) : this.$slots.default, h("input", {
      "class": "el-upload__input",
      "attrs": {
        "type": "file",
        "name": name,
        "multiple": multiple,
        "accept": accept
      },
      "ref": "input",
      "on": {
        "change": handleChange
      }
    })]);
  }
};
const _sfc_render$1 = null;
const _sfc_staticRenderFns$1 = null;
var __component__$1 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false
);
const Upload$1 = __component__$1.exports;
function noop() {
}
const _sfc_main = {
  name: "ElUpload",
  mixins: [migrating.Migrating],
  components: {
    ElProgress,
    UploadList,
    Upload: Upload$1
  },
  provide() {
    return {
      uploader: this
    };
  },
  inject: {
    elForm: {
      default: ""
    }
  },
  props: {
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default() {
        return {};
      }
    },
    data: Object,
    multiple: Boolean,
    name: {
      type: String,
      default: "file"
    },
    drag: Boolean,
    dragger: Boolean,
    withCredentials: Boolean,
    showFileList: {
      type: Boolean,
      default: true
    },
    accept: String,
    type: {
      type: String,
      default: "select"
    },
    beforeUpload: Function,
    beforeRemove: Function,
    onRemove: {
      type: Function,
      default: noop
    },
    onChange: {
      type: Function,
      default: noop
    },
    onPreview: {
      type: Function
    },
    onSuccess: {
      type: Function,
      default: noop
    },
    onProgress: {
      type: Function,
      default: noop
    },
    onError: {
      type: Function,
      default: noop
    },
    fileList: {
      type: Array,
      default() {
        return [];
      }
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    listType: {
      type: String,
      default: "text"
      // text,picture,picture-card
    },
    httpRequest: Function,
    disabled: Boolean,
    limit: Number,
    onExceed: {
      type: Function,
      default: noop
    }
  },
  data() {
    return {
      uploadFiles: [],
      dragOver: false,
      draging: false,
      tempIndex: 1
    };
  },
  computed: {
    uploadDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    }
  },
  watch: {
    listType(type) {
      if (type === "picture-card" || type === "picture") {
        this.uploadFiles = this.uploadFiles.map((file) => {
          if (!file.url && file.raw) {
            try {
              file.url = URL.createObjectURL(file.raw);
            } catch (err) {
              console.error("[Element Error][Upload]", err);
            }
          }
          return file;
        });
      }
    },
    fileList: {
      immediate: true,
      handler(fileList) {
        this.uploadFiles = fileList.map((item) => {
          item.uid = item.uid || Date.now() + this.tempIndex++;
          item.status = item.status || "success";
          return item;
        });
      }
    }
  },
  methods: {
    handleStart(rawFile) {
      rawFile.uid = Date.now() + this.tempIndex++;
      let file = {
        status: "ready",
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0,
        uid: rawFile.uid,
        raw: rawFile
      };
      if (this.listType === "picture-card" || this.listType === "picture") {
        try {
          file.url = URL.createObjectURL(rawFile);
        } catch (err) {
          console.error("[Element Error][Upload]", err);
          return;
        }
      }
      this.uploadFiles.push(file);
      this.onChange(file, this.uploadFiles);
    },
    handleProgress(ev, rawFile) {
      const file = this.getFile(rawFile);
      this.onProgress(ev, file, this.uploadFiles);
      file.status = "uploading";
      file.percentage = ev.percent || 0;
    },
    handleSuccess(res, rawFile) {
      const file = this.getFile(rawFile);
      if (file) {
        file.status = "success";
        file.response = res;
        this.onSuccess(res, file, this.uploadFiles);
        this.onChange(file, this.uploadFiles);
      }
    },
    handleError(err, rawFile) {
      const file = this.getFile(rawFile);
      const fileList = this.uploadFiles;
      file.status = "fail";
      fileList.splice(fileList.indexOf(file), 1);
      this.onError(err, file, this.uploadFiles);
      this.onChange(file, this.uploadFiles);
    },
    handleRemove(file, raw) {
      if (raw) {
        file = this.getFile(raw);
      }
      let doRemove = () => {
        this.abort(file);
        let fileList = this.uploadFiles;
        fileList.splice(fileList.indexOf(file), 1);
        this.onRemove(file, fileList);
      };
      if (!this.beforeRemove) {
        doRemove();
      } else if (typeof this.beforeRemove === "function") {
        const before = this.beforeRemove(file, this.uploadFiles);
        if (before && before.then) {
          before.then(() => {
            doRemove();
          }, noop);
        } else if (before !== false) {
          doRemove();
        }
      }
    },
    getFile(rawFile) {
      let fileList = this.uploadFiles;
      let target;
      fileList.every((item) => {
        target = rawFile.uid === item.uid ? item : null;
        return !target;
      });
      return target;
    },
    abort(file) {
      this.$refs["upload-inner"].abort(file);
    },
    clearFiles() {
      this.uploadFiles = [];
    },
    submit() {
      this.uploadFiles.filter((file) => file.status === "ready").forEach((file) => {
        this.$refs["upload-inner"].upload(file.raw);
      });
    },
    getMigratingConfig() {
      return {
        props: {
          "default-file-list": "default-file-list is renamed to file-list.",
          "show-upload-list": "show-upload-list is renamed to show-file-list.",
          "thumbnail-mode": "thumbnail-mode has been deprecated, you can implement the same effect according to this case: http://element.eleme.io/#/zh-CN/component/upload#yong-hu-tou-xiang-shang-chuan"
        }
      };
    }
  },
  beforeDestroy() {
    this.uploadFiles.forEach((file) => {
      if (file.url && file.url.indexOf("blob:") === 0) {
        URL.revokeObjectURL(file.url);
      }
    });
  },
  render(h) {
    let uploadList;
    if (this.showFileList) {
      uploadList = h(UploadList, {
        "attrs": {
          "disabled": this.uploadDisabled,
          "listType": this.listType,
          "files": this.uploadFiles,
          "handlePreview": this.onPreview
        },
        "on": {
          "remove": this.handleRemove
        }
      }, [(props) => {
        if (this.$scopedSlots.file) {
          return this.$scopedSlots.file({
            file: props.file
          });
        }
      }]);
    }
    const uploadData = {
      props: {
        type: this.type,
        drag: this.drag,
        action: this.action,
        multiple: this.multiple,
        "before-upload": this.beforeUpload,
        "with-credentials": this.withCredentials,
        headers: this.headers,
        name: this.name,
        data: this.data,
        accept: this.accept,
        fileList: this.uploadFiles,
        autoUpload: this.autoUpload,
        listType: this.listType,
        disabled: this.uploadDisabled,
        limit: this.limit,
        "on-exceed": this.onExceed,
        "on-start": this.handleStart,
        "on-progress": this.handleProgress,
        "on-success": this.handleSuccess,
        "on-error": this.handleError,
        "on-preview": this.onPreview,
        "on-remove": this.handleRemove,
        "http-request": this.httpRequest
      },
      ref: "upload-inner"
    };
    const trigger = this.$slots.trigger || this.$slots.default;
    const uploadComponent = h("upload", helper._mergeJSXProps2([{}, uploadData]), [trigger]);
    return h("div", [this.listType === "picture-card" ? uploadList : "", this.$slots.trigger ? [uploadComponent, this.$slots.default] : uploadComponent, this.$slots.tip, this.listType !== "picture-card" ? uploadList : ""]);
  }
};
const _sfc_render = null;
const _sfc_staticRenderFns = null;
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Upload = __component__.exports;
const _Upload = Upload;
_Upload.install = function install(Vue) {
  Vue.component(_Upload.name, _Upload);
};
module.exports = _Upload;
