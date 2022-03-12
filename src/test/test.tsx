import "./test.css";
import React from "react";

class Bulb {
  constructor(ind: number) {
    this.index = ind;
    this.switch = Math.random() > 0.5 ? true : false;
  }

  index: number;
  switch: boolean;
}

const Bulbs = () => {
  //   const bulbar: Bulb[] = [new Bulb(1), new Bulb(2)];
  const [bulbs, setBulbs] = React.useState([
    { index: 1, switch: true },
    { index: 2, switch: false },
    { index: 3, switch: false },
    { index: 4, switch: true },
    { index: 5, switch: true },
    { index: 6, switch: false },
    { index: 7, switch: true },
    { index: 8, switch: false },
    { index: 9, switch: true },
    { index: 10, switch: true },
  ]);
  const resetBulbs = () => {
    let bulbar = [];
    console.log("reset");
    for (let i = 0; i < 10; i++) {
      let cur = new Bulb(i + 1);
      bulbar[i] = cur;
    }
    console.log(bulbar);
    setBulbs(bulbar);
  };
  const clickb = (ind: number) => {
    console.log(ind);
    console.log(bulbs);
    let old = [...bulbs];
    console.log(old);
    if (ind === 1) {
      old[0].switch = !old[0].switch;
      old[1].switch = !old[1].switch;
      old[9].switch = !old[9].switch;
    } else if (ind === 10) {
      old[0].switch = !old[0].switch;
      old[8].switch = !old[8].switch;
      old[9].switch = !old[9].switch;
    } else {
      old[ind].switch = !old[ind].switch;
      old[ind - 2].switch = !old[ind - 2].switch;
      old[ind - 1].switch = !old[ind - 1].switch;
    }

    setBulbs(old);
  };
  //   const pushswticht = (ind: number) => {};

  return (
    <div>
      <div>烧脑的灯泡游戏</div>
      <div>目标：关上所有的灯泡！</div>
      <div className="main">
        {bulbs.map((e) => (
          <div
            onClick={() => clickb(e.index)}
            className={(e.switch ? `light ` : "") + (" bb bb" + e.index)}
          >
            灯泡{e.index}
          </div>
        ))}
      </div>
      <button onClick={resetBulbs}>随机灯泡</button>
    </div>
  );
};
export { Bulbs };
