import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Topics() {

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
            <div className="topics">
                   {allTopics.map((topic) => {
                       return (
                           <section key = {topic.slug} className="topic-section">
                             <Link to={`/articles?topic=${topic.slug}`}>
                              
                                 <p>{topic.slug.toUpperCase()}</p>
                                 <p>{topic.description}</p>
         

                               
                               </Link>
                           </section>
                           
                       )
                   })} 
         
               </div>
               )
}

export default Topics