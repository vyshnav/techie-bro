import React from "react";
import PropTypes from "prop-types";

import Article from "../Main/Article";
import List from "../Navigator/List";

const Tags = props => {
  const { tags, title, linkOnClick, expandOnClick , categories} = props;

  //console.log(htmlAst);
  console.log(tags);
  return (
    <Article>
      <List title={title} tags={tags} tagPage={"tag"} categories={categories} linkOnClick={linkOnClick} expandOnClick={expandOnClick}/>
    </Article>
  );
};

Tags.propTypes = {
  tags: PropTypes.object.isRequired,
  
};

export default Tags;
