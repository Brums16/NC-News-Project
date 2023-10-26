import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../contexts/user'

function SingleArticlePage() {

const [article, setArticle] = useState({})
const [comments, setComments] = useState([])
const [vote, setVote] = useState("available")
const [newComment, setNewComment] = useState("")
const {user, setUser} = useContext(UserContext)


useEffect(()=> {
    fetchArticle().then((response) => response.json()).then(({article}) => {
        setArticle(article)
    })

    fetchComments().then((response)=> response.json()).then(({comments}) => {
      setComments(comments)
  })    
}, [newComment])


const {articleid} = useParams()
const fetchArticle = () => {
    return fetch(`https://nc-news-z0zw.onrender.com/api/articles/${articleid}`)
    }
const fetchComments = () => {
  return fetch(`https://nc-news-z0zw.onrender.com/api/articles/${articleid}/comments`)
  }
const changeVoteArticle = (value) => {
  return fetch(`https://nc-news-z0zw.onrender.com/api/articles/${articleid}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inc_votes: value}),
  })
}
const postComment = () => {
  return fetch(`https://nc-news-z0zw.onrender.com/api/articles/${articleid}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username: user.name, body: newComment}),
  })
}

const deleteComment = (id) => {
  return fetch(`https://nc-news-z0zw.onrender.com/api/comments/${id}`, 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }


const upVoteArticle = (event) => {
  event.preventDefault()
  let numVotes = article.votes
  if (user.votesOnArticles[articleid] === 1){
    setArticle({...article, votes: numVotes - 1})
    changeVoteArticle(-1).then(({status}) => status === 200 ? setUser({...user, votesOnArticles: {...user.votesOnArticles, [articleid]: 0}}) : setVote("unavailable"))
    return
  }
  setArticle({...article, votes: numVotes + 1})
  changeVoteArticle(1).then(({status}) => status === 200 ? setUser({...user, votesOnArticles: {...user.votesOnArticles, [articleid]: 1}}) : setVote("unavailable"))
}
const downVoteArticle = (event) => {
  event.preventDefault()
  let numVotes = article.votes
  if (user.votesOnArticles[articleid] ===  -1){
    setArticle({...article, votes: numVotes + 1})
    changeVoteArticle(1).then(({status}) => status === 200 ? setUser({...user, votesOnArticles: {...user.votesOnArticles, [articleid]: 0}}) : setVote("unavailable"))
    return
  }
  setArticle({...article, votes: numVotes - 1})
  changeVoteArticle(-1).then(({status}) => status === 200 ? setUser({...user, votesOnArticles: {...user.votesOnArticles, [articleid]: -1}}) : setVote("unavailable"))
  
}

const changeNewComment = (event) => {
  setNewComment(event.target.value)
}

const submitNewComment = (event) => {
  event.preventDefault()
  if (newComment.length === 0){
    return
  }
  setNewComment("")
  postComment(newComment) 
}

const upVoteComment = (event) => {
}

const downVoteComment = (event) => {

}

const removeComment = (event) => {
  event.preventDefault()
  const filteredComments = comments.filter((comment)=>{
    return comment.comment_id !== Number(event.target.id)})
  setComments(filteredComments)
  deleteComment(Number(event.target.id))
    //optimistic render and remove the comment onclick
    // delete the comment from the user object in usercontext
    //send delete request to server to delete the comment

    

}

  return (
    <section className="single-article">
    <nav className="single-article-title">
    <div className="single-article-votes">
    <button onClick={upVoteArticle} type="submit" className = {user.votesOnArticles[articleid] === 1 ? "vote-button-clicked" : "vote-button-unclicked"}>▲</button>
    {vote === "unavailable" ? <p>Voting unavailable at this time</p> : <p>Votes: {article.votes}</p> }
    <button onClick={downVoteArticle} type="submit" className={user.votesOnArticles[articleid] === -1 ? "vote-button-clicked" : "vote-button-unclicked"}>▼</button>
      </div>
      
    <h3>{article.title}</h3><a href="#comments">Comments: {article.comment_count}</a>
    </nav>
    <p>Posted at: {article.created_at} by {article.author}</p> 
    <img src={article.article_img_url} alt={`picture related to ${article.topic}`}/>
    <article>
    {article.body}
      </article>

    <h3>Comments</h3>
    <section className="comments-section" id="comments">
    <form>
        <label htmlFor="newComment"></label>
        <input type="text" id="newComment" onChange={changeNewComment} value={newComment} placeholder='Add a comment...'/>
        <button type="submit" onClick={submitNewComment} className='plus-button'>+</button>
    </form>
    {comments.map((comment) => {
              return (
                  <div key = {comment.comment_id} className="single-comment">
                    <p className="single-comment-title">Posted at: {comment.created_at} by {comment.author}</p> 
                    <section className = "single-comment-content">
                      <div> 
                        <button onClick={upVoteComment} type="submit" className='vote-button'>▲</button>
                        <p>Votes: {comment.votes}</p>
                        <button onClick={downVoteComment} type="submit" className='vote-button'>▼</button>
                      </div>
                    <article>{comment.body}</article>
                    {comment.author === user.name ? <button id = {comment.comment_id} onClick={removeComment} type="submit" className='remove-comment-button'>Delete</button> : ""}
                    </section>
                  </div>
                  
              )
          })} 
          
          </section>
      </section>
  )
}

export default SingleArticlePage