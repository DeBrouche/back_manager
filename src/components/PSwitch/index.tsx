import "./index.css";

type props = {
  show: boolean;
};
const Pswitch = (props: props) => {
  let show = props.show;
  console.log(show);
  // console.log("true");
  // console.log("false");
  // console.log(props);
  return (
    <div className={(show ? "true" : "false") + " switch-cell"}>
      <div className="switch-but">
        <div className="in"></div>
      </div>
    </div>
  );
};

export { Pswitch };
