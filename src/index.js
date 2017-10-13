import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import {browserHistory, IndexRoute, Router} from 'react-router'
import {routerMiddleware, routerReducer, syncHistoryWithStore} from 'react-router-redux'
import Route from 'react-router/es/Route';
import PostList from './components/PostList';
import SinglePost from './components/SinglePost';

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(browserHistory)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const store = createStore(
    combineReducers({
        routing: routerReducer,
        app: reducer
    }),
    composeEnhancers(
        applyMiddleware(thunk, middleware)
    )
);

const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={PostList} />
                <Route path="/:category/posts" component={PostList}/>
                <Route path="/posts/:id" component={SinglePost} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();