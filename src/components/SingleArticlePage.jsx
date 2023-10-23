import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

function SingleArticlePage() {

    const {articleid} = useParams()

  return (
    <p>On the SingleArticlePage for {articleid}</p>
  )
}

export default SingleArticlePage