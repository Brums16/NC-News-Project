import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function ArticlesPage() {
 
const [allArticles, setAllArticles] = useState([])

useEffect(()=> {
    fetchArticles().then((response) => response.json()).then(({articles}) => {
        setAllArticles(articles)
    })
}, [])

const fetchArticles = () => {
    return fetch('https://nc-news-z0zw.onrender.com/api/articles')
    }


  return (
    <><p>On the articles page</p>
    <div className="articles">
          {allArticles.map((article) => {
              return (
                  <div key = {article.article_id} className="article-section-small">
                    <Link to={`/articles/${article.article_id}`}>
                        <div className="article-section-small-topic-author">
                        <p>In {article.topic} | Posted by {article.author}</p>
                            </div>
                      <div className="article-section-small-title-img">
                        <p>{article.title}</p>
                        <img className = "article-img-small" src={article.article_img_url}></img>
                        </div>
                      
                      <p>Comments: {article.comment_count} Votes: {article.votes}</p>
                      </Link>
                  </div>
                  
              )
          })} 

      </div>
      </>
  )
}

export default ArticlesPage