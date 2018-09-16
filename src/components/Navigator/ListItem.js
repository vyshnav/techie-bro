import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import LazyLoad from "react-lazyload";
import Img from "gatsby-image";

const styles = theme => ({
  listItem: {
    margin: "0 0 .7em 0",
    transition: "height 1s",
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,.1)!important",

    position: "relative",
    borderRadius: "5px",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      margin: "0 0 1.5rem 0",
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      ".moving-featured &, .is-aside &": {
        margin: "0 0 0 0",
        marginBottom: "0 !important",
        border: "none !important",
        borderBottom: "1px solid rgba(0,0,0,.1) !important",
        "@media (hover: hover)": {
          "&:hover": {
            background: "linear-gradient(87deg,#f5365c 0,#f56036 100%)!important",
            transition: "all .4s ease"
          }
        }
      },
      marginBottom: "0.5rem!important"
    },
    "@media (hover: hover)": {
      "&:hover": {
        boxShadow: "0 1px 1px hsla(0,3%,67%,.1)",
        transition: "all .4s ease"      
      }
    }
  },
  listLink: {
    display: "flex",
    alignContent: "center",    
    justifyContent: "flex-start",
    flexDirection: "row",   
    color: theme.navigator.colors.postsListItemLink,
    "@media (hover: hover)": {
      "&:hover": {
        color: theme.navigator.colors.postsListItemLinkHover
      }
    },
    ".moving-featured &, .is-aside &": {
      "@media (hover: hover)": {
        "&:hover": {
          color: theme.navigator.colors.asidePostsListItemLinkHover
        }
      }
    }
  },
  listItemPointer: {
    borderRight: "1px solid rgba(0,0,0,.1)!important",
    backgroundColor: "#e2e2e2",
    position: "relative",
    flexShrink: 0,
    overflow: "hidden",
    borderRadius: "0px",
    width: "60px",
    height: "60px",
    margin: "0",
    transition: "all .5s",


    width: "100%",
    height: "100%",
    borderRadius: "5px",
    "& img": {
      width: "100%",
      height: "100%"
    },
    "& .card__image": {
      height: "100%"
    },
    "& .gatsby-image-wrapper": {
      position: "relative",
      top: 0,
      left: 0,
      width: "100%",
      height: "25vh !important",
      borderRadius: "5px",
      overflow: "hidden",

      
       [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
        borderRadius: 0,
        borderTopLeftRadius: "5px",
        borderBottomLeftRadius: "5px",
       }
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      marginRight: ".5em",
      width: "80px",
      height: "80px"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      marginRight: ".8em",
      width: "300px",
      height: "100%",
      transition: "all .3s",
      transitionTimingFunction: "ease",
      borderRadius: 0,
      ".moving-featured &, .is-aside &": {
        width: "100px",
        height: "100px",
        marginRight: "0",
        borderRadius: "5px",
        margin: "0.51rem",
        borderRight: "none !important"
      }
    }
  },
  listItemText: {
    margin: "0 0 0 1.5em",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "1rem 0",



    padding: "1.5rem",
    position: "absolute",
    width: "100%",
    bottom: 0,
    background: "linear-gradient(180deg,transparent 0,rgba(0,0,0,0.65) 70%)",
    zIndex: 1,
    margin: 0,
    borderRadius: "5px",
    color: "#ffffff",
    "& h1": {
      lineHeight: 1.15,
      fontWeight: 600,
      letterSpacing: "-0.03em",
      margin: 0,
      fontSize: `${theme.navigator.sizes.postsListItemH1Font}em`,
      [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
        fontSize: `${theme.navigator.sizes.postsListItemH1Font *
          theme.navigator.sizes.fontIncraseForM}em`
      },
      [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
        fontSize: `${theme.navigator.sizes.postsListItemH1Font *
          theme.navigator.sizes.fontIncraseForL}em`,
        ".moving-featured &, .is-aside &": {
          fontSize: "0.87em",
          fontWeight: 900,
          lineHeight: "1.3em"
        }
      }
    },
    "& h2": {
      lineHeight: 1.2,
      display: "block",
      fontSize: `${theme.navigator.sizes.postsListItemH2Font}em`,
      margin: ".3em 0 0 0",
      [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
        fontSize: `${theme.navigator.sizes.postsListItemH2Font *
          theme.navigator.sizes.fontIncraseForM}em`
      },
      [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
        fontSize: `${theme.navigator.sizes.postsListItemH2Font *
          theme.navigator.sizes.fontIncraseForL}em`,
        ".moving-featured &, .is-aside &": {
          display: "none"
        }
      }
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      position: "relative !important"
    },

    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      position: "relative !important",
      background: "none !important",
      ".moving-featured &, .is-aside &": {
        margin: "0 0 0 .5em"
      }
    }
  }
});

class ListItem extends React.Component {
  state = {
    hidden: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.categoryFilter !== this.props.categoryFilter) {
      const category = this.props.post.node.frontmatter.category;
      const categoryFilter = this.props.categoryFilter;

      if (categoryFilter === "all posts") {
        this.setState({ hidden: false });
      } else if (category !== categoryFilter) {
        this.setState({ hidden: true });
      } else if (category === categoryFilter) {
        this.setState({ hidden: false });
      }
    }
  }

  render() {
    const { classes, post, linkOnClick } = this.props;
    console.log(post);

    return (
      <li
        className={`${classes.listItem} `}
        style={{ display: `${this.state.hidden ? "none" : "block"}` }}
        key={post.node.slug}
      >
        <Link
          activeClassName="active"
          className={classes.listLink}
          to={`/${post.node.slug}/`}
          onClick={linkOnClick}
        >
          <div className={`${classes.listItemPointer} pointer`}>
            <Img
              outerWrapperClassName="card__image"
              sizes={post.node.heroImage.sizes}
              alt={post.node.heroImage.title}
              style={{
                background: `'#ffffff'}`,
                height: "100%"
              }}
            />
          </div>
          <div className={classes.listItemText}>
            <h1>{post.node.title}</h1>
            {post.node.metaDescription.metaDescription && (
              <h2>{post.node.metaDescription.metaDescription}</h2>
            )}
          </div>
        </Link>
      </li>
    );
  }
}

ListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  linkOnClick: PropTypes.func.isRequired,
  categoryFilter: PropTypes.string.isRequired
};

export default injectSheet(styles)(ListItem);
