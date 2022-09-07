import { createContext } from "react";
import { makeAutoObservable } from "mobx";

export const StateContext = createContext();
export const DispatchContext = createContext();

class Store {
  state = [];
  constructor() {
    makeAutoObservable(this);
  }

  getRandomPosition() {
    this.state = Array.from(Array(9).keys()) //0~8
      .sort(() => Math.random() - 0.5); //random
  }

  swapPosition(number) {
    const spacePos = this.state.indexOf(0);
    const selectedPos = this.state.indexOf(number);
    if (this.checkMovable(selectedPos, spacePos))
      this.state = this.state.map((pos, index) => {
        if (index === selectedPos) return this.state[spacePos];
        if (index === spacePos) return this.state[selectedPos];
        return pos;
      });
  }

  checkMovable(pos, posZero) {
    const diff = Math.abs(posZero - pos);
    if (diff === 3 || diff === 1) return true;
    return false;
  }

  get isWin() {
    if (this.state && this.state.length > 0)
      return this.state?.reduce(
        (pre, cur, index) => pre && (cur === index + 1 || cur === 0),
        true
      );
    return false;
  }
}

const store = new Store();

export default store;
