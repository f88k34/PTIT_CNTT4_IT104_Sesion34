import type { Student } from "../../utils/types";
import type { Action } from "../../utils/types";

const initialState:Student[] = [
    {
        id:"1",
        name:"Nguyen Van A",
        age:1 ,
        gender: "Nam",
        birthday: "23-02-2006",
        hometown: "HN",
        address: "HN"
    },
]

const reducerStudent = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'UPDATE':
      return state.map((student) =>
        student.id === action.payload.id ? action.payload : student
      );
    case 'DELETE':
      return state.filter((student) => student.id !== action.payload);
    default:
      return state;
  }
};
export default reducerStudent;