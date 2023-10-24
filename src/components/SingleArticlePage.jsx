import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function SingleArticlePage() {

const [article, setArticle] = useState({})
const [comments, setComments] = useState([])
const [vote, setVote] = useState("none")

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
  event.preventDefault()
  setVote("up")
  changeVoteArticle(1).then((response) => response.json()).then((response) => console.log(response))
  let numVotes = article.votes
  setArticle({...article, votes: numVotes + 1})
}
const downVoteArticle = (event) => {
  event.preventDefault()
  setVote("down")
  changeVoteArticle(-1).then((response) => response.json()).then((response) => console.log(response))
  let numVotes = article.votes
  setArticle({...article, votes: numVotes - 1})
}

const upVoteComment = (event) => {
}

const downVoteComment = (event) => {

}

  return (
    <section className="single-article">
    <nav className="single-article-title">
    <div className="single-article-votes">
    <button onClick={upVoteArticle} type="submit" className='vote-button'>▲</button>
    <p>Votes: {article.votes}</p>
    <button onClick={downVoteArticle} type="submit" className='vote-button'>▼</button>
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
                        <button onClick={downVoteArticle} type="submit" className='vote-button'>▼</button>
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