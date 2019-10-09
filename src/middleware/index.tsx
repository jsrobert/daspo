

const promiseMiddleware = (store: any) => (next: any) => (action: any) => {
    const inState = store.getState();
    next(action);
};

const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
    const inState = store.getState();
    next(action);
};

function isPromise(v: any) {
    return v && typeof v.then === 'function';
}
  
export { promiseMiddleware, localStorageMiddleware }