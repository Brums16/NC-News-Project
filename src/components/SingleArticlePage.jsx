import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function SingleArticlePage() {

const [article, setArticle] = useState({})
const [comments, setComments] = useState([])
const [vote, setVote] = useState(0)

useEffect(()=> {
    fetchArticle().then((response) => response.json()).then(({article}) => {
        setArticle(article)
    })

    fetchComments().then((response)=> response.json()).then(({comments}) => {
      setComments(comments)
  })

    
}, [])


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

const upVoteArticle = (event) => {
  if (vote ===  1){
    console.log("already upvoted")
    return
  }
  event.preventDefault()
  changeVoteArticle(1).then(({status}) => status === 200 ? setVote((currentVote)=> currentVote + 1) : setVote("unavailable"))
  let numVotes = article.votes
  setArticle({...article, votes: numVotes + 1})
}
const downVoteArticle = (event) => {
  if (vote ===  -1){
    console.log("already downvoted")
    return
  }
  event.preventDefault()
  changeVoteArticle(-1).then(({status}) => status === 200 ? setVote((currentVote)=> currentVote - 1) : setVote("unavailable"))
  let numVotes = article.votes
  setArticle({...article, votes: numVotes - 1})
}

// only issue remaining with votes is user being able to refresh the page then vote again, will handle this with usercontext later

const upVoteComment = (event) => {
}

const downVoteComment = (event) => {

}

  return (
    <section className="single-article">
    <nav className="single-article-title">
    <div className="single-article-votes">
    <button onClick={upVoteArticle} type="submit" className = {vote === 1 ? "vote-button-clicked" : "vote-button-unclicked"}>▲</button>
    {vote === "unavailable" ? <p>Voting unavailable at this time</p> : <p>Votes: {article.votes}</p> }
    <button onClick={downVoteArticle} type="submit" className={vote === -1 ? "vote-button-clicked" : "vote-button-unclicked"}>▼</button>
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
                    </section>
                  </div>
                  
              )
          })} 
          </section>
      </section>
  )
}

export default SingleArticlePage