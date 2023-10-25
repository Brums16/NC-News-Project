import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {

const [allTopics, setAllTopics] = useState([])


useEffect(()=> {
    fetchTopics().then((response) => response.json()).then(({topics}) => {
        setAllTopics(topics)
    })
}, [])

const fetchTopics = () => {
    return fetch('https://nc-news-z0zw.onrender.com/api/topics')
    }

  
  return (
   <div className="topics-in-navbar">
          {allTopics.map((topic) => {
              return (
                  <div key = {topic.slug} className="topic-section-small">
                    <Link to={`/articles?topic=${topic.slug}`}>
                      <div className="topic-section-small-title-img">
                        <p>{topic.slug.toUpperCase()}</p>

                        </div>
                      
                      </Link>
                  </div>
                  
              )
          })} 

      </div>
      )
}

export default Navbar