import * as actions from '../actions'
// Reusable reducer utility functions

const updateObject = (oldObject: any, newValues: any) => {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return {...oldObject, newValues}
}
  
const updateItemInArray = (array: [], itemId: any, updateItemCallback: Function) => {
  const updatedItems = array.map( (item: any) => {
    if (item.id !== itemId) {
      // Since we only want to update one item, preserve all others as they are now
      return item
    }

    // Use the provided callback to create an updated item
    const updatedItem = updateItemCallback(item)
    return updatedItem
  })
  return updatedItems
}
  
const createReducer = (initialState: any, handlers: any) => {
  return (state = initialState, action: any) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
  
// Handler for a specific case ("case reducer")
const setVisibilityFilter = (visibilityState: any, action: any) => {
  // Technically, we don't even care about the previous state
  return action.filter
}
  
// Handler for an entire slice of state ("slice reducer")
const visibilityReducer = createReducer('SHOW_ALL', {
  SET_VISIBILITY_FILTER: setVisibilityFilter
})

const actionReducer = createReducer({}, actions);


const testReducer = (reducer: any) => {
  return reducer;
}
