import { Component } from "react";

import { Pswitch } from "../components/PSwitch/index";

type Props = {
  match: {
    params: {
      show: string;
    };
  };
};
class TestPage extends Component<Props> {
  state = {
    show: false,
  };
  toggle = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  componentDidMount() {
    console.log(this.props.match.params.show);
    this.setState({
      show: this.props.match.params.show === "true" ? true : false,
    });
  }
  render() {
    // let { show } = this.props.match.params;
    // console.log(show);
    // let showtonext = show === "true" ? true : false;
    // console.log(showtonext);
    // console.log(typeof show, typeof showtonext);
    return (
      <div className="ok">
        <div className="ad">sad</div>
        sadadsd
        <div className="switch-container" onClick={this.toggle}>
          <Pswitch show={this.state.show} />
        </div>
      </div>
    );
  }
}
export { TestPage };
