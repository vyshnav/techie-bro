import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import theme from "../../styles/theme";

const List = styled.ul`
  padding: 0 1.5rem;  
  max-width: ${theme.sizes.maxWidthCentered};
`

const Tag = styled.span`
  padding: .4833em .1em !important;
  font-weight: 300 !important;
  margin-right: .14285714em;
  a {
    opacity: 1 !important;
    text-transform: capitalize;
    margin: 0;
    text-decoration: none !important;
    color: #046fc2 !important;
    font-size: .85714286rem;
    font-weight: 300 !important;  
    &:hover{      
      color: #044d86 !important;
    } 
  }
`

const TagList = props => {
  return (
    <List>
      {props.tags.map(tag => (
        <Tag key={tag.id}>
          <Link to={`/tag/${tag.slug}/`}>#{tag.title}</Link>
        </Tag>
      ))}
    </List>
  )
}

export default TagList
