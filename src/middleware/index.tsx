

const promiseMiddleware = (store: any) => (next: any) => (action: any) => {
    const inState = store.getState();
    next(action);
};

const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
    const inState = store.getState();
    next(action);
};

const dataFormattingMiddleware = (store: any) => (next: any) => (action: any) => {
    const inState = store.getState();
    console.log("dataFormattingMiddleware called.");
    next(action);
};

function isPromise(v: any) {
    return v && typeof v.then === 'function';
}
  
export { promiseMiddleware, localStorageMiddleware, dataFormattingMiddleware }