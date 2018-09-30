import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

import styled from 'styled-components'
import { forceCheck } from "react-lazyload";

import { connect } from "react-redux";
import ListHeader from "./ListHeader";
import SpringScrollbars from "../SpringScrollbars";
import ListItem from "./ListItem";

import { setCategoryFilter } from "../../state/store";

const styles = theme => ({
  posts: {
    position: "absolute",
    left: 0,
    top: "100px",
    bottom: "60px",
    width: "100%",
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      top: "40px",
      bottom: "0px",
      ".is-aside.closed &": {
        top: 0,
        bottom: 0
      },
      ".is-aside.open &": {
        top: 40,
        bottom: 0
      }
    },
    "&.tag": {
      top: "60px",
    }
  },
  inner: {
    padding: `1.3rem  calc(0.1rem + 17px) 1.3rem calc(0.1rem + 17px)`,
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      padding: `2rem  calc(1rem + 17px) 2rem calc(1rem + 17px)`,
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      padding: `2rem  calc(1rem + 17px) 2rem calc(1rem + 17px)`,
      left: `${theme.info.sizes.width}px`,
      ".moving-featured &, .is-aside &": {
        padding: "0"
      }
    }
  },
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    ".is-aside.closed &, .moving-featured.closed &": {
      display: "none"
    }
  }
});

const Title = styled.h1`
  font-size: 2em;
  text-transform: capitalize;
  font-weight: 600;
  text-align: center;
  margin: 0 0 3rem 0;
  margin: 1rem 0 0;
  line-height: 1.2;
  span {
    margin: 0 0 0 0.25em;
  } 
`

class List extends React.Component {


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.categoryFilter !== this.props.categoryFilter) {
      setTimeout(forceCheck, 300);
    }
  }

  

  render() {
    const {
      classes,
      posts,
      activePost,
      tags,
      categories,
      title,
      linkOnClick,
      expandOnClick,
      categoryFilter,
      navigatorPosition, 
      navigatorShape, 
      isWideScreen,
      tagPage,
    } = this.props;

    console.log(this.props);
    return (
      <div className={`${classes.posts} ${tagPage ? tagPage : ""}`}>
        <SpringScrollbars forceCheckOnScroll={true} isNavigator={true}>
          {title && <Title small>#{title}</Title> }
          
         
          <div className={classes.inner}>
            <ListHeader
              expandOnClick={expandOnClick}
              categoryFilter={categoryFilter}
              navigatorShape={navigatorShape}
              activePost={activePost}
            />
            <ul className={classes.list}>
              {posts &&
                posts.map(({ node: post}, index) => (
                  <ListItem
                    key={index}
                    post={post}
                    linkOnClick={linkOnClick}
                    categoryFilter={categoryFilter}
                  />
                ))}
                {tags &&
                tags.map((post, index) => (
                  <ListItem
                    key={index}
                    post={post}
                    linkOnClick={linkOnClick}
                    categoryFilter={categoryFilter}
                  />
                ))}
            </ul>
          </div>
        </SpringScrollbars>
      </div>
    );
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired,  
  linkOnClick: PropTypes.func.isRequired,
  expandOnClick: PropTypes.func.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
  navigatorShape: PropTypes.string.isRequired,
  categoryFilter: PropTypes.string.isRequired,
  setCategoryFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    navigatorPosition: state.navigatorPosition,
    navigatorShape: state.navigatorShape,
    isWideScreen: state.isWideScreen,
    categoryFilter: state.categoryFilter
  };
};

const mapDispatchToProps = {
  setCategoryFilter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(List));
