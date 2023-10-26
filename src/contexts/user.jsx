import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({name: "cooljmessy", avatar_url: "https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002", 
  articles: [8,10,35,17], comments: [9
,22
,23
,33
,45
,49
,50
,59
,61
,68
,71
,74
,80
,89
,92
,93
,113
,120
,121
,122
,123
,128
,129
,131
,132
,139
,141
,148
,153
,154
,155
,159
,164
,166
,174
,175
,183
,188
,190
,194
,196
,206
,207
,211
,219
,220
,225
,230
,239
,242
,251
,256
,264
,286
,288
,292
,293
,295
,297], votesOnArticles: {}, votesOnComments: {}});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};