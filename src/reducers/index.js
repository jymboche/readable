import {
    RECEIVE_CATEGORIES, RECEIVE_POSTS, RECEIVE_NEW_POST, CHANGE_CATEGORY, POST_VOTE,
    RECEIVE_SINGLE_POST, RECEIVE_COMMENTS, RECEIVE_COMMENT, RECEIVE_NEW_COMMENT, OPEN_COMMENT_MODAL, OPEN_POST_MODAL,
    CLOSE_POST_MODAL, CLOSE_COMMENT_MODAL, RECEIVE_POST_COMMENTS, DELETE_POST
} from '../actions/types';

const defaultState = {
    categories: [],
    posts: [],
    activeCategory: false,
    activePost: null,
    comments: [],
    commentModalOpen: null,
    postModalOpen: false,
    postModalEditing: false,
    activeComment: null,
    editingPost: null,
    numberPostComments: {}
};

function defaultReducer(state = defaultState, action) {

    switch(action.type) {
        case RECEIVE_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            };
        case  RECEIVE_POSTS:
            return {
                ...state,
                posts: action.posts
            };
        case RECEIVE_NEW_POST:

            let posts = state.posts.filter(post => (post.id !== action.post.id));
            posts.push(action.post);

            return {
                ...state,
                posts,
                postModalOpen: false,
                activePost: action.post
            };
        case CHANGE_CATEGORY:
            return {
                ...state,
                activeCategory: action.category
            };
        case POST_VOTE:
            return {
                ...state,
                posts: state.posts.map(post => post.id === action.post.id? action.post : post),
                activePost: state.activePost? action.post : null
            };
        case RECEIVE_SINGLE_POST:
            return {
                ...state,
                activePost: action.post
            };
        case RECEIVE_COMMENTS:
            return {
                ...state,
                comments: action.comments
            };

        case RECEIVE_COMMENT:
            return {
                ...state,
                comments: state.comments.map(comment => comment.id === action.comment.id? action.comment : comment)
            };
        case RECEIVE_NEW_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.comment],
                commentModalOpen: false
            };
        case OPEN_COMMENT_MODAL:
            let activeComment = null;
            if (action.commentId) {
                let match = state.comments.filter(comment => comment.id === action.commentId);
                if (match){
                    activeComment = match[0];
                }
            }

            return {
                ...state,
                commentModalOpen: true,
                activeComment: activeComment
            };
        case CLOSE_COMMENT_MODAL:
            return {
                ...state,
                commentModalOpen: false,
                activeComment: null
            };
        case OPEN_POST_MODAL:
            let editingPost = null;
            if (action.postId) {
                if (state.activePost && state.activePost.id === action.postId) {
                    editingPost = state.activePost;
                } else {
                    let match = state.posts.filter(post => post.id === action.postId);
                    if (match){
                        editingPost = match[0];
                    }
                }
            }

            return {
                ...state,
                postModalOpen: true,
                editingPost
            };
        case CLOSE_POST_MODAL:
            return {
                ...state,
                postModalOpen: false,
                editingPost: null
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
            };
        case RECEIVE_POST_COMMENTS:
            let obj = {};
            obj[action.postId] = action.comments.length;
            return {
                ...state,
                numberPostComments: {...state.numberPostComments, ...obj}
            };
        default :
            return state;
    }
}

export default defaultReducer;