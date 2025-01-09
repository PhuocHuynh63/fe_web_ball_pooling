import { RootState } from "../../redux/store";

export const selectHello = (state: RootState) => state.global.global;