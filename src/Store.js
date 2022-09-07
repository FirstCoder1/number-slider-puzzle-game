import { useReducer, createContext } from "react";
export const StateContext = createContext();
export const DispatchContext = createContext();

export const Provider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "GET_RANDOM_POSITION":
        return Array.from(Array(9).keys()) //0~8
          .sort(() => Math.random() - 0.5); //random
      case "SWAP_POSITION": {
        const spacePos = state.indexOf(0);
        const selectedPos = state.indexOf(action.number);
        if (checkMovable(selectedPos, spacePos))
          return state.map((pos, index) => {
            if (index === selectedPos) return state[spacePos];
            if (index === spacePos) return state[selectedPos];
            return pos;
          });
        break;
      }
      default:
        return state;
    }
  };

  const checkMovable = (pos, posZero) => {
    const diff = Math.abs(posZero - pos);
    if (diff === 3 || diff === 1) return true;
    return false;
  };

  const [state, dispatch] = useReducer(reducer, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
