import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import styled from "styled-components";
import FacebookProvider, { Comments } from "react-facebook";
require("core-js/fn/array/find");

import comments from "../../images/comments.gif";
import config from "../../../content/meta/config";

const styles = theme => ({
  postComments: {
    margin: "3em 0 0",
    padding: "3em 0 0",
    borderTop: "1px solid #ddd"
  }
});

const Wrapper = styled.div`
  .fb-comments {
    span {
      background-image: url(${comments});
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      display: block;
      min-height: 200px;
    }
  }
  .fb-comments[fb-xfbml-state="rendered"] {
    span {
      background-image: none;
      padding: 0;
      min-height: 0;
    }
  }
`

const PostComments = props => {
  const { classes, slug, facebook } = props;

  return (
    <Wrapper id="post-comments" className={classes.postComments}>
      <FacebookProvider appId={facebook}>
        <Comments
          href={`${config.siteUrl}${slug}`}
          width="100%"
          colorScheme={props.theme.main.colors.fbCommentsColorscheme}
        />
      </FacebookProvider>
    </Wrapper>
  );
};

PostComments.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  facebook: PropTypes.object.isRequired
};

export default injectSheet(styles)(PostComments);
