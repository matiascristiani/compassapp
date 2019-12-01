import {createStore, applyMiddleware} from 'redux';
import Reducers from './reducers'
// import thunk from 'redux-thunk'
// , applyMiddleware(thunk)

	
export default configureStore = () => {
    let store = createStore(Reducers)
    return store
}
