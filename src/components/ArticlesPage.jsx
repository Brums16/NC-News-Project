import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { UserContext } from '../contexts/user'

function ArticlesPage() {
 
const [allArticles, setAllArticles] = useState([])
const {user, setUser} = useContext(UserContext)
const [searchParams, setSearchParams] = useSearchParams()

const topic = searchParams.get("topic")
let sortBy = searchParams.get("sort_by")

useEffect(()=> {
    fetchArticles().then((response) => response.json()).then(({articles}) => {
        setAllArticles(articles)
    })
}, [searchParams, topic, sortBy])

const fetchArticles = () => {
    return fetch(`https://nc-news-z0zw.onrender.com/api/articles${topic ? `?topic=${topic}` : ""}${sortBy ? topic ? `&sort_by=${sortBy}`: `?sort_by=${sortBy}` : ""}`)
    }

const changeSorting = (event) => {
    event.preventDefault()
    window.location.href= topic ? `?topic=${topic}&sort_by=${event.target.value}`: `?sort_by=${event.target.value}`
} 


  return (
    <><p>On the articles page</p>
    <form>
  <label htmlFor="sort-by">Sort by:</label>
  <select id="sort-by" name="sort-by" onChange={changeSorting} value={sortBy}>
    <option value="created_at">Date</option>
    <option value="comment_count">Comment Count</option>
    <option value="votes">Votes</option>
  </select>     
</form>
    <div className="articles">
          {allArticles.map((article) => {
              return (
                  <div key = {article.article_id} className="article-section-small">
                    <Link to={`/articles/${article.article_id}`}>
                        <div className="article-section-small-topic-author">
                        <p>In {article.topic} | Posted by {article.author} at {article.created_at}</p>
                            </div>
                      <div className="article-section-small-title-img">
                        <h3>{article.title}</h3>
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