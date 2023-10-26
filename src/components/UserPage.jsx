import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../contexts/user'


function UserPage() {
  
  const {user, setUser} = useContext(UserContext)
  return (
    <div>
          <p>Welcome to your user page {user.name}</p>
          <img src={user.avatar_url}></img>
    <p>Your articles: {user.articles.join(",")}</p>
    <p>Your comments: {user.comments.join(",")}</p>
    <p>Your votes on articles: {JSON.stringify(user.votesOnArticles)}</p>
    <p>Your votes on comments: {JSON.stringify(user.votesOnComments)}</p>
    </div>
  )
}

export default UserPage