export function reducer(state = { rows: [] }, action: any) {
  switch (action.type) {
    case '[App] Load State':
      return { ...state, ...action.payload };
    case '[App] Update Rows':
      return { ...state, rows: action.payload };
    default:
      return state;
  }
}