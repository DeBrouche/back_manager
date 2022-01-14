import "./index.css";

import axios from "axios";
import React, { Component } from "react";

class Manager extends Component {
  state = {
    files: [
      { filename: "1", filesize: "2", fileurl: "2", filepath: "a" },

      { filename: "11", filesize: "12", fileurl: "22", filepath: "a" },
    ],
    uid: "",
  };
  componentDidMount() {
    //请求所有文件数据
    let files: Array<SingleFile>;
    interface SingleFile {
      name: string;
      size: string;
      url: string;
    }
    axios
      .post("https://qcdnq7.fn.thelarkcloud.com/getFiles", {}, { headers: {} })
      .then((res) => {
        files = res.data.result.map((item: SingleFile) => ({
          filename: item.name,
          filesize: item.size + " Byte",
          fileurl: item.url,
          filepath: item.url.substr(item.url.lastIndexOf("_") + 1),
        }));

        this.setState({
          files: files,
        });
        console.log(files);
      });

    //请求uid
    axios
      .get("https://inspire.toutiao.com/proxy/api/auth_valid")
      .then((data) => {
        // 上传成功
        console.log(data.data.message);
        console.log(data.data.data.uid);
        this.setState({
          uid: data.data.data.uid,
        });
      })
      .catch((error) => {
        // 调用失败，进行错误处理
        console.log(error);
      });
  }

  myfile = () => {
    let files: Array<SingleFile>;
    interface SingleFile {
      name: string;
      size: string;
      url: string;
    }
    axios
      .post(
        "https://qcdnq7.fn.thelarkcloud.com/getMyfile",
        { uid: this.state.uid },
        { headers: {} }
      )
      .then((res) => {
        files = res.data.result.map((item: SingleFile) => ({
          filename: item.name,
          filesize: item.size + " Byte",
          // fileurl:item.url.substr(item.url.lastIndexOf("_") + 1)
          fileurl: item.url,
        }));

        this.setState({
          files: files,
        });
        console.log(files);
      })
      .catch((e) => console.log(e));
  };

  render() {
    return (
      <div>
        <button className="showMine" onClick={this.myfile}>
          只显示我上传的
        </button>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>插件名称</th>
                <th>插件描述</th>
                <th>插件状态</th>
                <th>立即执行</th>
                <th>插件大小</th>
                <th>入口地址</th>
                <th>插件管理</th>
              </tr>
            </thead>

            <tbody>
              {this.state.files.map((file, index) => (
                <tr key={index}>
                  <th>{file.filename}</th>
                  <th>暂未添加</th>
                  <th>
                    <div className="switch-cell">
                      <div className="switch"></div>
                    </div>
                  </th>
                  <th>
                    <div className="switch-cell">
                      <div className="switch"></div>
                    </div>
                  </th>
                  <th className="blue">{file.filesize}</th>
                  <th>
                    <a href={file.fileurl}>{file.filepath}</a>
                  </th>
                  <th className="blue">
                    <span>编辑</span>
                    <span className="blank"></span>
                    <span>删除</span>
                  </th>
                </tr>
                // <div key={index}>文件名：{file.filename}__文件大小：{file.filesize}__ 下载地址： <a href={file.fileurl }>{file.fileurl}</a></div>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export { Manager };
