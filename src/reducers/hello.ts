
import { EnthusiasmActionType } from '../actions/Enthusiasm';
import { HelloStoreState } from '../model/Hello';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../constants';

let initialState: HelloStoreState = {
  enthusiasmLevel: 0,
  languageName: 'eng'
}

const enthusiasm = (state: HelloStoreState = initialState, action: EnthusiasmActionType): HelloStoreState => {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case DECREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
    default:
      return state;
  }
}

export default enthusiasm;
