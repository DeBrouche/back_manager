import axios from 'axios';
import React, { Component } from 'react';

class MyPlugins extends Component {
  state = {
    files: [
      { filename: '1', filesize: '2', fileurl: '2', filepath: 'a' },

      { filename: '11', filesize: '12', fileurl: '22', filepath: 'a' },
    ],
    uid: '',
  };
  componentDidMount() {
    //请求所有文件数据
    let files: Array<SingleFile>;
    interface SingleFile {
      name: string;
      size: string;
      url: string;
    }
    axios.post('https://qcdnq7.fn.thelarkcloud.com/getFiles', {}, { headers: {} }).then((res) => {
      files = res.data.result.map((item: SingleFile) => ({
        filename: item.name,
        filesize: item.size + ' Byte',
        fileurl: item.url,
        filepath: item.url.substr(item.url.lastIndexOf('_') + 1),
      }));

      this.setState({
        files: files,
      });
      console.log(files);
    });

    //请求uid
    axios
      .get('https://inspire.toutiao.com/proxy/api/auth_valid')
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
      .post('https://qcdnq7.fn.thelarkcloud.com/getMyfile', { uid: this.state.uid }, { headers: {} })
      .then((res) => {
        files = res.data.result.map((item: SingleFile) => ({
          filename: item.name,
          filesize: item.size + ' Byte',
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
        my page
        <br />
        <button onClick={this.myfile}>只显示我上传的</button>
        <table>
          <thead>
            <tr>
              <th>文件名</th>
              <th>文件大小</th>
              <th>下载地址</th>
            </tr>
          </thead>

          <tbody>
            {this.state.files.map((file, index) => (
              <tr key={index}>
                <th>{file.filename}</th>
                <th>{file.filesize}</th>
                <th>
                  <a href={file.fileurl}>{file.filepath}</a>
                </th>
              </tr>
              // <div key={index}>文件名：{file.filename}__文件大小：{file.filesize}__ 下载地址： <a href={file.fileurl }>{file.fileurl}</a></div>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export { MyPlugins };
