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

  return (
    <>
    <h3>{currentArticle.title}</h3>
    <p>Posted at: {currentArticle.created_at} by {currentArticle.author}</p> <p>Votes: {currentArticle.votes}</p> <a href="#comments">Comments: {currentArticle.comment_count}</a>
    <img src={currentArticle.article_img_url} />
    <p>
    {currentArticle.body}
      </p>

    <h3>Comments</h3>
    <section className="comments-section" id="comments">
    {comments.map((comment) => {
              return (
                  <div key = {comment.article_id} className="single-comment">
                    <p>Posted at: {comment.created_at} by {comment.author}</p> <p>Votes: {comment.votes}</p> <p></p>
                    <p>{comment.body}</p>
                  </div>
                  
              )
          })} 
          </section>
      </>
  )
}

export default SingleArticlePage