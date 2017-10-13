const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';

let token = localStorage.token;

if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token
};

export const getCategories = () => fetch(`${api}/categories`, { headers });

export const getPosts = category => {
    const prefix = category? `${category}/` : '';
    return fetch(`${api}/${prefix}posts`, {headers});
};

export const addPost = (post) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers,
        body: JSON.stringify(post)
    });

export const postVote = (id, option) =>
    fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({option})
    });

export const requestSinglePost = id =>
    fetch(`${api}/posts/${id}`, {
        method: 'GET',
        headers
    });

export const requestComments = postId =>
    fetch(`${api}/posts/${postId}/comments`, {
        method: 'GET',
        headers
    });

export const requestCommentVote = (commentId, option) =>
    fetch(`${api}/comments/${commentId}`, {
        method: "POST",
        headers,
        body: JSON.stringify({option})
    });

export const requestAddComment = (comment) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers,
        body: JSON.stringify(comment)
    });

export const requestUpdatePost = (post) =>
    fetch(`${api}/posts/${post.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({title: post.title, body: post.body})
    });

export const requestDeletePost = (postId) =>
    fetch(`${api}/posts/${postId}`, {
        method: 'DELETE',
        headers
    });

export const requestUpdateComment = (comment) =>
    fetch(`${api}/comments/${comment.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({body: comment.body})
    });

export const requestDeleteComment = (commentId) =>
    fetch(`${api}/comments/${commentId}`, {
        method: 'DELETE',
        headers
    });