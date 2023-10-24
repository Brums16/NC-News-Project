import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function SingleArticlePage() {

const [currentArticle, setCurrentArticle] = useState({})
const [comments, setComments] = useState([])

useEffect(()=> {
    fetchArticle().then((response) => response.json()).then(({article}) => {

        setCurrentArticle(article)
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
const upVote = () => {

}
const downVote = () => {

}

  return (
    <section className="single-article">
    <nav className="single-article-title">
    <div className="single-article-votes">
    <button onClick={upVote}>▲</button>
    <p>Votes: {currentArticle.votes}</p>
    <button onClick={downVote}>▼</button>
      </div>
      
    <h3>{currentArticle.title}</h3><a href="#comments">Comments: {currentArticle.comment_count}</a>
    </nav>
    <p>Posted at: {currentArticle.created_at} by {currentArticle.author}</p>  
    <img src={currentArticle.article_img_url} alt={`picture related to ${currentArticle.topic}`}/>
    <article>
    {currentArticle.body}
      </article>

    <h3>Comments</h3>
    <section className="comments-section" id="comments">
    {comments.map((comment) => {
              return (
                  <div key = {comment.article_id} className="single-comment">
                    <p>Posted at: {comment.created_at} by {comment.author}</p> <p>Votes: {comment.votes}</p>
                    <article>{comment.body}</article>
                  </div>
                  
              )
          })} 
          </section>
      </section>
  )
}

export default SingleArticlePage