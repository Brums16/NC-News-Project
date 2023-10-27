

export const fetchArticles = (topic, sortBy, order) => {
    return fetch(`https://nc-news-z0zw.onrender.com/api/articles${topic ? `?topic=${topic}` : ""}${sortBy ? topic ? `&sort_by=${sortBy}`: `?sort_by=${sortBy}` : ""}${order ? sortBy ? `&order=${order}` : topic ? `&order=${order}` : `?order=${order}` : ""}`)
    }

export const fetchArticle = (articleid) => {
    return fetch(`https://nc-news-z0zw.onrender.com/api/articles/${articleid}`)
    }

export const fetchComments = (articleid) => {
    return fetch(`https://nc-news-z0zw.onrender.com/api/articles/${articleid}/comments`)
    }

export const changeVoteArticle = (articleid, value) => {
    return fetch(`https://nc-news-z0zw.onrender.com/api/articles/${articleid}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inc_votes: value}),
    })
}

export const postComment = (articleid, user, newComment) => {
    return fetch(`https://nc-news-z0zw.onrender.com/api/articles/${articleid}/comments`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({username: user.name, body: newComment}),
    })
}