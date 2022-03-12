import InspireCloud from "@byteinspire/js-sdk";
import axios from "axios";
import React, { Component } from "react";

import "./index.css";

const serviceId = "qcdnq7"; // 替换成你的 serviceId，可在后台「设置」页面获取
const fileUploadToken = "4b7e46f0-1a37-4337-8e18-2bc9acef2e24"; // 替换成你的客户端上传 token，可在后台「设置」页面获取
const inspirecloud = new InspireCloud({ serviceId });

class UpLoad extends Component {
  plugname_input = React.createRef<HTMLInputElement>();
  id_input = React.createRef<HTMLInputElement>();
  plugdes_input = React.createRef<HTMLTextAreaElement>();
  state = {
    url: "",
    uid: "",
    thumnail_url: "",
    thumnail_name: "",
    thumnail_size: "",
    plug_name: "",
    plug_des: "",
    thumnail_file: "",
    scripts_file: "",
    id_input: "",
  };
  setscripts = () => {
    const fileInputElement = document.getElementById(
      "fileInput"
    ) as HTMLInputElement;
    if (fileInputElement.files) {
      if (fileInputElement.files.length > 0) {
        const file = fileInputElement.files[0];
        this.setState({
          scripts_file: file,
        });
      }
    }
  };
  upLoadFiles = () => {
    // 获取到上传选择框
    const fileInputElement = document.getElementById(
      "fileInput"
    ) as HTMLInputElement;
    if (fileInputElement.files) {
      if (fileInputElement.files.length > 0) {
        const file = fileInputElement.files[0];

        // 最早的上传路线
        const filename = file.name;

        // 调用 JavaScript SDK 的 upload 方法实现上传，第二个参数为 File 对象
        inspirecloud.file
          .upload(filename, file, { token: fileUploadToken })
          .then((data) => {
            // 上传成功
            console.log("upload succeeded");
            console.log(data);
            console.log(data.url);
            return axios.post(
              "https://qcdnq7.fn.thelarkcloud.com/addPlugin",
              { url: data.url, uid: this.state.uid },
              { headers: {} }
            );
          })
          .then((adres) => {
            console.log(adres);
          })
          .catch((error) => {
            console.log(error);
            // 调用失败，进行错误处理
          });
      }
    }
  };
  choose_thumnail() {
    let fir_input = document.getElementById("thumnail");
    if (fir_input) {
      fir_input.click();
    }
    // document.getElementById("thumnail").click();
  }
  showfile = () => {
    let thiscom = this;
    let fir_input = document.getElementById("thumnail") as HTMLInputElement;
    console.log(fir_input.files);
    if (fir_input.files && window.webkitURL !== undefined) {
      // webkit or chrome
      let url = window.webkitURL.createObjectURL(fir_input.files[0]);
      let { name, size } = fir_input.files[0];
      console.log(url, name, size);
      thiscom.setState({
        thumnail_file: fir_input.files[0],
        thumnail_url: url,
        thumnail_name: name,
        thumnail_size: size,
      });
    }
  };
  setname = () => {
    let nameinput = this.plugname_input.current;
    if (nameinput) {
      console.log(nameinput.value);
      this.setState({
        plug_name: nameinput.value,
      });
    }
  };
  upload_plugin = () => {
    console.log(this.state);
    const formData = new FormData();
    formData.append("plug_name", this.state.plug_name);
    formData.append("plug_des", this.state.plug_des);
    formData.append("plug_thumnail", this.state.thumnail_file);
    formData.append("thumnail_name", this.state.thumnail_name);
    formData.append("scripts_file", this.state.scripts_file);
    formData.append("uid", this.state.id_input);
    // console.log(formData);
    inspirecloud
      .run("upload_plugin", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res));
  };
  showstate = () => {
    console.log(this.state);
  };
  componentDidMount() {
    this.setState({
      uid: "712931055244973",
    });
  }
  setid = () => {
    let input = this.id_input.current;
    if (input) {
      this.setState({
        id_input: input.value,
      });
    }
  };
  setdes = () => {
    let desinput = this.plugdes_input.current;
    if (desinput) {
      console.log(desinput.value);
      this.setState({ plug_des: desinput.value });
    }
  };
  test = () => {
    axios
      .post(
        "https://www.camptogo.com" +
          "/api/e9b849a515a84327b424af7ccdbf2949/mobile/miniapp/v1_0_0/wechat/mini/env/unlimited/get",
        {
          page: "pages/detail/detail",
          scene: "id=1",
          check_path: true,
          env_version: "trial",
        },
        {
          headers: {
            Authorization:
              "Basic TmdpbnhBdXRoVXNlcm5hbWUxNjM4MWVmYTA2OWE5MGNiZGU5OTg1NGM4MTE4MzAzNmE0YmQyZTQ3NzZlYjc3MGZhNjk3NDBmMWM1YzA2YWE0Ok5naW54QXV0aFBhc3N3b3JkZTA1ODhlM2IzYzViMjQwZmUzZjVmYjY1M2QyOTkwZjM0YjUyZWUwYjU5NWFjZjY1NTNhOTI0YjA3MTZjYjM2Ng==",
            "content-type": "application/json",
          },
        }
      )

      .then((adres) => {
        console.log(adres);
        let bytes = new Uint8Array(adres.data);
        let storeData = "";
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          storeData += String.fromCharCode(bytes[i]);
        }
        let imgUrl = "data:image/png;base64," + window.btoa(storeData);
        console.log(imgUrl);
      })
      .catch((error) => {
        console.log(error);
        // 调用失败，进行错误处理
      });
  };

  render() {
    return (
      <div className="inputs-wrapper">
        {/* 名称 */}
        <div className="des-input ">
          <div className="input-title">插件名称</div>

          <input
            ref={this.plugname_input}
            type="text"
            onChange={this.setname}
          />
        </div>
        {/* 脚本 */}
        <div className="testinput">
          <div className="input-title">js脚本</div>
          <input onChange={this.setscripts} type="file" id="fileInput" />
          <button className="hidden" onClick={this.upLoadFiles}>
            上传文件
          </button>
        </div>
        {/* 头像 */}
        <div className="thumnail-input">
          <div className="input-title">插件缩略图</div>
          <input
            className="hidden"
            type="file"
            id="thumnail"
            onChange={this.showfile}
            accept="image/*"
          />
          <div className="img-preview" onClick={this.choose_thumnail}>
            <div
              className={
                !(this.state.thumnail_url.length > 3) ? "unselected" : "hidden"
              }
            >
              <div className="p1 p11"></div>
              <div className="p1 p12"></div>
              <div className="p1 p13"></div>
              <div className="p1 p14"></div>
            </div>
            <div
              className={
                this.state.thumnail_url.length > 3 ? "prev-box" : "hidden"
              }
            >
              <img
                className={
                  this.state.thumnail_url.length > 3 ? "prev-box" : "hidden"
                }
                src={this.state.thumnail_url}
                alt="nothing a all"
                id="prev"
              />
            </div>
          </div>
          <div className="add-name">
            <p>点击选择图片</p>
            <p>{this.state.thumnail_name}</p>
          </div>
        </div>
        {/* 描述 */}
        <div className="des-input">
          <div className="input-title">插件描述</div>
          <div className="des-box">
            <textarea
              ref={this.plugdes_input}
              onChange={this.setdes}
              name="plug_des"
              id="des_input"
              cols={70}
              rows={5}
            ></textarea>
            <div className="asdasd">
              <input
                type="text"
                ref={this.id_input}
                onChange={this.setid}
                placeholder="设置用户id"
              />
            </div>
          </div>
        </div>
        <button className="buttonofmyown" onClick={this.showstate}>
          显示数据
        </button>
        <button className="buttonofmyown " onClick={this.upload_plugin}>
          上传插件
        </button>
        <button className="buttonofmyown " onClick={this.test}>
          获取test
        </button>
      </div>
    );
  }
}

export { UpLoad };
// const UpLoad = () => {

//     const upLoadFiles = () =>{

//         const serviceId = 'qcdnq7'; // 替换成你的 serviceId，可在后台「设置」页面获取
//         const fileUploadToken = '4b7e46f0-1a37-4337-8e18-2bc9acef2e24'; // 替换成你的客户端上传 token，可在后台「设置」页面获取

//         const inspirecloud = new InspireCloud({ serviceId });

//         // 获取到上传选择框
//         const fileInputElement = document.getElementById('fileInput') as HTMLInputElement;
//         if(fileInputElement.files){
//             if (fileInputElement.files.length > 0) {
//                 const file = fileInputElement.files[0];
//                 const filename = file.name;

//                 // 调用 JavaScript SDK 的 upload 方法实现上传，第二个参数为 File 对象
//                 inspirecloud.file.upload(filename, file, { token: fileUploadToken })
//                     .then((data) => {
//                     // 上传成功
//                     console.log("upload succeeded");

//                     console.log(data.url);
//                     })
//                     .catch((error) => {
//                     // 调用失败，进行错误处理
//                     });
//                 }

//         }

//     }

//     return (
//         <div>
//             <div>Upload page</div>
//             <input type="file" id="fileInput" />
//             <button onClick={() => upLoadFiles()}>上传文件</button>
//         </div>
//     )

// }
// export { UpLoad };
