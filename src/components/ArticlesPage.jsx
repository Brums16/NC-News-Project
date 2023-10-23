import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function ArticlesPage() {
 
const [allArticles, setAllArticles] = useState([])

useEffect(()=> {
    console.log("in the useeffect")
    fetchArticles().then((response) => response.json()).then(({articles}) => {
        console.log(articles, "articles in useeffect")
        setAllArticles(articles)
    })
}, [])

const fetchArticles = () => {
    console.log("in fetch articles")
    return fetch('https://nc-news-z0zw.onrender.com/api/articles')
    }



console.log(allArticles, "allArticles")

  return (
    <><p>On the articles page</p>
    <div className="articles">
          {allArticles.map((article) => {
              return (
                  <div key = {article.article_id} className="article-section-small">
                        <div className="article-section-small-topic-author">
                        <p>In {article.topic} | Posted by {article.author}</p>
                            </div>
                      <div className="article-section-small-title-img">
                        <p>{article.title}</p>
                        <img className = "article-img-small" src={article.article_img_url}></img>
                        </div>
                      
                      <p>Comments: {article.comment_count} Votes: {article.votes}</p>
                  </div>
              )
          })} 

      </div>
      </>
  )
}

export default ArticlesPage