import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function SingleArticlePage() {

const [currentArticle, setCurrentArticle] = useState({})

useEffect(()=> {
    console.log("in the useeffect")
    fetchArticles().then((response) => 

    response.json()).then(({article}) => {
        console.log(article, "article in useeffect")
        setCurrentArticle(article)
    })
}, [])


const {articleid} = useParams()
const fetchArticles = () => {
    console.log("in fetch articles")
    return fetch(`https://nc-news-z0zw.onrender.com/api/articles/${articleid}`)
    }

  return (
    <>
    {/* SOME HREF ELEMENT HERE TO JUMP TO COMMENTS SECTION */}
    <h3>{currentArticle.title}</h3>
    <p>Posted at: {currentArticle.created_at} Votes: {currentArticle.votes} Comments: {currentArticle.comment_count}</p>
    <img src={currentArticle.article_img_url} />
    <p>
    {currentArticle.body}
      </p></>
  )
}

export default SingleArticlePage