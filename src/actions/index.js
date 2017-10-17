import {push} from 'react-router-redux';

import {
    addPost, getCategories, getPosts, postVote, requestAddComment, requestComments, requestCommentVote,
    requestDeleteComment,
    requestDeletePost,
    requestSinglePost, requestUpdateComment, requestUpdatePost
} from '../utils/api';

import {
    CHANGE_CATEGORY, CLOSE_COMMENT_MODAL, CLOSE_POST_MODAL, DELETE_POST, OPEN_COMMENT_MODAL, OPEN_POST_MODAL, POST_VOTE,
    RECEIVE_CATEGORIES, RECEIVE_COMMENT, RECEIVE_COMMENTS, RECEIVE_NEW_COMMENT, RECEIVE_NEW_POST, RECEIVE_POST_COMMENTS,
    RECEIVE_POSTS,
    RECEIVE_SINGLE_POST
} from './types';



const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
});

const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

const receivePost = post => ({
    type: RECEIVE_NEW_POST,
    post
});

const updateActiveCategory = category => ({
    type: CHANGE_CATEGORY,
    category: category
});

const updatePostVoteScore = post => ({
    type: POST_VOTE,
    post
});

const receiveSinglePost = post => ({
    type: RECEIVE_SINGLE_POST,
    post
});

const deletePost = postId => ({
    type: DELETE_POST,
    postId
});

const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
});

const receivePostComments = (postId, comments) => ({
    type: RECEIVE_POST_COMMENTS,
    postId,
    comments
});

const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment: comment
});

const receiveNewComment = comment => ({
    type: RECEIVE_NEW_COMMENT,
    comment: comment
});

export const openCommentModal = (commentId) => ({
    type: OPEN_COMMENT_MODAL,
    commentId
});

export const closeCommentModal = () => ({
    type: CLOSE_COMMENT_MODAL
});

export const openPostModal = (postId) => ({
    type: OPEN_POST_MODAL,
    postId
});

export const closePostModal = () => ({
    type: CLOSE_POST_MODAL
});

export function categoriesFetchAll() {
    return (dispatch) => {
        getCategories()
            .then( res => {
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                return res;
            })
            .then(res=>res.json())
            .then(data => dispatch(receiveCategories(data.categories)));
    }
}

export function postsFetchAll(category) {
    return (dispatch) => {
        getPosts(category)
            .then(res => {
                if (!res.ok) {
                    throw Error(res.statusText);
                }

                return res;
            })
            .then(res=>res.json())
            .then(data=>dispatch(receivePosts(data)));
    }
}

export const postsAdd = post => dispatch =>
        addPost(post)
            .then(res => {
                if (!res.ok) {
                    throw Error(res.statusText);
                }

                return res;
            })
            .then( res => res.json() )
            .then( data => dispatch(receivePost(data)) )
            .then( (action) => dispatch(push(`/posts/${action.post.id}`)) );

export function changeCategory(category) {
    return (dispatch) => {
        getPosts(category)
            .then(res=>{
                if (!res.ok) {
                    throw Error(res.statusText);
                }

                return res;
            })
            .then( res => res.json() )
            .then( data => {
                updateActiveCategory();
                return dispatch(receivePosts(data))
            });
    }
}

export function handlePostVote(postId, option) {
    return (dispatch) => {
        postVote(postId, option)
            .then(res=>{
                if (!res.ok) {
                    throw Error(res.statusText);
                }

                return res;
            })
            .then( res => res.json() )
            .then( data => dispatch(updatePostVoteScore(data)) );
    }
}

export const fetchSinglePost = postId => dispatch =>
    requestSinglePost(postId)
        .then(res=>{
            if (!res.ok) {
                throw Error(res.statusText);
            }

            return res;
        })
        .then( res => res.json() )
        .then( post => dispatch(receiveSinglePost(post)) );


export const fetchComments = postId => dispatch =>
    requestComments(postId)
        .then(res=>{
            if (!res.ok) {
                throw Error(res.statusText);
            }

            return res;
        })
        .then( res => res.json() )
        .then( comments => dispatch(receiveComments(comments)) );

export const fetchPostComments = postId => dispatch =>
    requestComments(postId)
        .then(res=>{
            if (!res.ok) {
                throw Error(res.statusText);
            }

            return res;
        })
        .then( res => res.json() )
        .then( comments => dispatch(receivePostComments(postId, comments)) );

export const handleCommentVote = (commentId, option) => dispatch =>
    requestCommentVote(commentId, option)
        .then( res => {
            if (!res.ok) {
                throw Error(res.statusText);
            }

            return res;
        })
        .then( res => res.json() )
        .then( comment => dispatch(receiveComment(comment)) );

export const handleAddComment = (comment) => dispatch =>
    requestAddComment(comment)
        .then(res=>{
            if (!res.ok) {
                throw Error(res.statusText);
            }

            return res;
        })
        .then( res => res.json() )
        .then( comment => dispatch(receiveNewComment(comment)) );


export const handleUpdatePost = post => dispatch =>
    requestUpdatePost(post)
        .then(res=>{
            if (!res.ok) {
                throw Error(res.statusText);
            }

            return res;
        })
        .then( res => res.json() )
        .then( post => dispatch(receivePost(post)) )
        .then( () => dispatch(closePostModal));

export const handleDeletePost = postId => dispatch =>
    requestDeletePost(postId)
        .then(res=>{
            if (!res.ok) {
                throw Error(res.statusText);
            }

            return res;
        })
        .then( res => res.json() )
        .then( () => dispatch(push("/")) )
        .then( () => dispatch(deletePost(postId)));

export const handleDeleteComment = (commentId, postId) => dispatch =>
    requestDeleteComment(commentId)
        .then(res=>{
            if (!res.ok) {
                throw Error(res.statusText);
            }

            return res;
        })
        .then( res => res.json() )
        .then( () => dispatch(fetchComments(postId)) );

export const handleUpdateComment = comment => dispatch =>
    requestUpdateComment(comment)
        .then(res=>{
            if (!res.ok) {
                throw Error(res.statusText);
            }

            return res;
        })
        .then( res => res.json() )
        .then( comment => dispatch(receiveComment(comment)) )
        .then( () => dispatch(closeCommentModal()) );