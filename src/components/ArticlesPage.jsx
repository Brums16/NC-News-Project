import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { UserContext } from '../contexts/user'
import commentIcon from '../images/comment.png'
import { fetchArticles } from '../utils/apicalls'


function ArticlesPage() {
 
const [allArticles, setAllArticles] = useState([])
const {user, setUser} = useContext(UserContext)
const [searchParams, setSearchParams] = useSearchParams()
const [topic, setTopic] = useState(searchParams.get("topic"))
const [sortBy, setSortBy] = useState(searchParams.get("sort_by"))
const [order, setOrder] = useState(searchParams.get("order"))




useEffect(()=> {
  if (sortBy !== null){
    setSearchParams({sortBy: sortBy})
  }
  if (order !==null){
    setSearchParams({order: order})
  }
  if (sortBy !==null && order !==null){
    setSearchParams({sortBy: sortBy, order: order})
  }
  fetchArticles(topic, sortBy, order).then((response) => 
    response.json()).then(({articles}) => {
    setAllArticles(articles)
})
}, [topic, sortBy, order])

const changeSorting = (event) => {
    event.preventDefault()
    setSortBy(event.target.value)
    setOrder("desc")
    
} 

const changeOrder = (event) => {
  event.preventDefault()
  if (order === "asc"){
    setOrder("desc")
  }
  else {
    setOrder("asc")
  }
}

  return (

    <><form>
      <label htmlFor="sort-by">Sort by:</label>
      <select id="sort-by" name="sort-by" onChange={changeSorting} value={sortBy ? sortBy : "Date"}>
        <option value="created_at">Date</option>
        <option value="comment_count">Comment Count</option>
        <option value="votes">Votes</option>
      </select>
      <button onClick={changeOrder}>↑↓</button>
    </form><div className="articles">

        {allArticles.map((article) => {
          return (
            <div key={article.article_id} className="article-section-small">
              <Link to={`/articles/${article.article_id}`}>
                <div className="article-section-small-div-section">
                  <p>In {article.topic} | Posted by {article.author} at {article.created_at}</p>
                </div>
                <div className="article-section-small-div-section">
                  <h3>{article.title}</h3>
                  <img className="article-img-small" src={article.article_img_url}></img>
                </div>

                <p className="article-section-small-div-section">  ↑↓ {article.votes} <img src={commentIcon} style={{height: "1.5vh"}}/> {article.comment_count}</p>
              </Link>
            </div>

          )
        })}
        

      </div></>

  )
}

export default ArticlesPage