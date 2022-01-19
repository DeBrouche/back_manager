import InspireCloud from "@byteinspire/js-sdk";
import axios from "axios";
import { Component } from "react";

import "./index.css";

class UpLoad extends Component {
  state = {
    url: "",
    uid: "",
    thumnail_url: "",
    thumnail_name: "",
    thumnail_size: "",
  };
  upLoadFiles = () => {
    const serviceId = "qcdnq7"; // 替换成你的 serviceId，可在后台「设置」页面获取
    const fileUploadToken = "4b7e46f0-1a37-4337-8e18-2bc9acef2e24"; // 替换成你的客户端上传 token，可在后台「设置」页面获取

    const inspirecloud = new InspireCloud({ serviceId });

    // 获取到上传选择框
    const fileInputElement = document.getElementById(
      "fileInput"
    ) as HTMLInputElement;
    if (fileInputElement.files) {
      if (fileInputElement.files.length > 0) {
        const file = fileInputElement.files[0];
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
        thumnail_url: url,
        thumnail_name: name,
        thumnail_size: size,
      });
    }
  };
  componentDidMount() {
    this.setState({
      uid: "712931055244973",
    });
  }

  render() {
    return (
      <div className="inputs-wrapper">
        {/* 名称 */}
        <div className="des-input ">
          <div className="input-title">插件名称</div>
        </div>
        {/* 脚本 */}
        <div className="testinput">
          <div className="input-title">js脚本</div>
          <input type="file" id="fileInput" />
          <button onClick={this.upLoadFiles}>上传文件</button>
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
            <p>{}</p>
          </div>
        </div>
        {/* 描述 */}
        <div className="des-input">
          <div className="input-title">插件描述</div>
        </div>
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
