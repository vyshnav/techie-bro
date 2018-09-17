import React from "react";
import PropTypes from "prop-types";

import Article from "../Main/Article";
import PostHeader from "./PostHeader";
import Content from "../Main/Content";
import PostFooter from "./PostFooter";
import TagList from "./TagList";
import Hero from "./Hero";

const Post = props => {
  const { post, author, slug, facebook } = props;

  //console.log(htmlAst);
  console.log(post);

  return (
    <Article>
      <Hero title={post.title} date={post.publishDate} image={post.heroImage} height={"50vh"} />      
      <PostHeader subTitle={post.metaDescription}/>
      {post.tags && <TagList tags={post.tags} />}
      <Content html={post.body.childMarkdownRemark.html} />
      <PostFooter author={author} post={post} slug={slug} facebook={facebook} />
    </Article>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  facebook: PropTypes.object.isRequired
};

export default Post;
