import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

const styles = theme => ({
  article: {
    background: theme.main.colors.background,
    padding: "3.76rem 0",
    "& strong, & b": {
      letterSpacing: "-.02em"
    },
    "& a": {
      fontWeight: "bold",
      letterSpacing: "-.02em",
      textDecoration: "underline",
      transition: "0.3s",
      "&:hover": {
        color: theme.base.colors.linkHover
      }
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      padding: "0",
      margin: `0 auto`
    }
  }
});

const Article = props => {
  const { children, classes } = props;

  return <article className={classes.article}>{children}</article>;
};

Article.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default injectSheet(styles)(Article);
