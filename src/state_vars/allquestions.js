import {atom} from "recoil";

export const allquestionsState = atom({
  key: 'allquestionsState',
  default: {
    isLoading: true,
    data: []}
});