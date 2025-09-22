import { combineReducers } from "redux";
import reducerStudent from "../reducer/reducerStudent";

const rootReducer = combineReducers({
    student:reducerStudent
})

export default rootReducer;