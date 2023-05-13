import React, { createContext, useContext, useReducer } from 'react'
const cartStateContext = createContext();
const cartDispatch = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, { id: action.id, foodname: action.foodname, imgsrc: action.imgsrc, price: action.price, qty: action.qty, size: action.size }]

    case "REMOVE":
      const newarray = [...state];
      newarray.splice(action.index, 1);
      return newarray;

    case "UPDATE":
      let arr = [...state]
      arr.find((food, index) => {
        if (food.id === action.id) {
          console.log(food.qty, parseInt(action.qty), action.price + food.price)
          arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
        }
        return arr
      })
      return arr

    case "DROP":
      let emptyArr = [];
      return emptyArr
    default: console.log("error occur")
  }
}

export const ContextReducer = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [])
  return (
    <div>
      <cartDispatch.Provider value={dispatch}>
        <cartStateContext.Provider value={state}>
          {children}
        </cartStateContext.Provider>
      </cartDispatch.Provider>
    </div>
  )
}
export const useCart = () => useContext(cartStateContext)
export const useDispatch = () => useContext(cartDispatch)

