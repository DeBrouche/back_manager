import "./index.css";

import axios from "axios";
import React, { Component } from "react";

import { Switch } from "antd";

import { Pswitch } from "../components/PSwitch";
import { SinglePlugin as SingleFile } from "../types/";

class Manager extends Component {
  state = {
    files: [],
    uid: "",
    showthum: false,
  };
  changes = (e: boolean, ev: Event) => {};
  statuschange = (
    type: string,
    pid: string,
    index: number,
    checked: boolean,
    ev: Event
  ) => {
    // console.log(e, index, checked, ev);
    // let  files : Array<SingleFile> = this.state.files;
    let { files }: { files: Array<SingleFile> } = this.state;
    let { status, uid, im_invoked } = this.state.files[index];
    console.log(!status, !im_invoked, uid, new Date());
    let request = {
      id: pid,
      type: type,
      res: false,
    };
    if (type === "status") {
      files[index].status = !status;
      request.res = !status;
    }
    if (type === "invoked") {
      files[index].im_invoked = !im_invoked;
      request.res = !im_invoked;
    }

    this.setState({
      files,
    });
    //请求改变
    console.log(request);
    axios
      .post("https://qcdnq7.api.cloudendpoint.cn/statuschange", request, {
        headers: {},
      })
      .then((res) => {
        console.log(res);
      });
  };
  componentDidMount() {
    //请求所有文件数据
    let files: Array<SingleFile>;

    axios
      .post("https://qcdnq7.fn.thelarkcloud.com/getFiles", {}, { headers: {} })
      .then((res) => {
        files = res.data.result.map((item: SingleFile) => ({
          _id: item._id,
          p_name: item.p_name,
          name: item.name,
          size: item.size + " Byte",
          description: item.description,
          url: item.url,
          // path: item.url.substring(item.url.lastIndexOf("_") + 1),
          status: item.status,
          im_invoked: item.im_invoked,
          uid: item.uid,
        }));
        // console.log(this);
        this.setState({
          files: files,
        });
        console.log(files);
      });

    this.setState({
      uid: "123",
    });
    //请求uid
    // axios
    //   .get("https://inspire.toutiao.com/proxy/api/auth_valid")
    //   .then((data) => {
    //     // 上传成功
    //     console.log(data.data.message);
    //     console.log(data.data.data.uid);
    //     this.setState({
    //       uid: data.data.data.uid,
    //     });
    //   })
    //   .catch((error) => {
    //     // 调用失败，进行错误处理
    //     console.log(error);
    //   });
  }

  myfile = () => {
    let files: Array<SingleFile>;

    axios
      .post(
        "https://qcdnq7.fn.thelarkcloud.com/getMyfile",
        { uid: this.state.uid },
        { headers: {} }
      )
      .then((res) => {
        files = res.data.result.map((item: SingleFile) => ({
          _id: item._id,
          p_name: item.p_name,
          name: item.name,
          size: item.size + " Byte",
          description: item.description,
          url: item.url,
          // path: item.url.substring(item.url.lastIndexOf("_") + 1),
          status: item.status,
          im_invoked: item.im_invoked,
          uid: item.uid,
          thum_url: item.thum_url,
        }));

        this.setState(
          {
            files: files,
            showthum: true,
          },
          () => {
            console.log(this.state);
          }
        );
        console.log(files);
      })
      .catch((e) => console.log(e));
  };
  idinput = React.createRef<HTMLInputElement>();
  setid = () => {
    let idin = this.idinput.current;
    if (idin) {
      this.setState({
        uid: idin.value,
      });
    }
  };
  render() {
    // console.log(this.state);
    return this.state.files.length === 0 ? (
      <div className="noinfo">对不起，没有信息</div>
    ) : (
      <div>
        <input
          type="text"
          ref={this.idinput}
          onChange={this.setid}
          placeholder="我的id"
        />
        <button className="showMine" onClick={this.myfile}>
          只显示我上传的
        </button>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th className={this.state.showthum ? "" : "hidden"}>插件图</th>
                <th>插件名称</th>
                <th>插件描述</th>
                <th>插件状态</th>
                <th>立即执行</th>
                <th>插件大小</th>
                <th>入口地址</th>
                <th>插件管理</th>
                <th>插件作者</th>
              </tr>
            </thead>

            <tbody>
              {this.state.files.map((file: SingleFile, index) => (
                <tr key={index}>
                  <th className={this.state.showthum ? "" : "hidden"}>
                    <img src={file.thum_url} alt="" className="thumimg" />
                  </th>
                  <th className="plug-name">{file.p_name}</th>
                  <th>{file.description}</th>
                  <th>
                    {/* <Pswitch show={file.status} /> */}

                    <Switch
                      checkedChildren="开启"
                      unCheckedChildren="关闭"
                      checked={file.status}
                      onChange={this.changes}
                      onClick={(checked, event) => {
                        this.statuschange(
                          "status",
                          file._id,
                          index,
                          checked,
                          event
                        );
                      }}
                    />
                  </th>
                  <th>
                    <Switch
                      checkedChildren="开启"
                      unCheckedChildren="关闭"
                      checked={file.im_invoked}
                      onChange={this.changes}
                      onClick={(checked, event) => {
                        this.statuschange(
                          "invoked",
                          file._id,
                          index,
                          checked,
                          event
                        );
                      }}
                    />
                  </th>
                  <th className="blue">{file.size}</th>
                  <th>
                    <a href={file.url}>{file.name}</a>
                  </th>
                  <th className="blue">
                    <span>编辑</span>
                    <span className="blank"></span>
                    <span>删除</span>
                  </th>
                  <th className="blue">{file.uid}</th>
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
