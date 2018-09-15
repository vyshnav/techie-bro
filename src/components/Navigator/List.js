import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { forceCheck } from "react-lazyload";

import ListHeader from "./ListHeader";
import SpringScrollbars from "../SpringScrollbars";
import ListItem from "./ListItem";

const styles = theme => ({
  posts: {
    position: "absolute",
    left: 0,
    top: "60px",
    bottom: "60px",
    width: "100%",
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      top: 0,
      bottom: 0
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
      linkOnClick,
      expandOnClick,
      categoryFilter,
      navigatorShape,
      removeFilter
    } = this.props;

    return (
      <div className={classes.posts}>
        <SpringScrollbars forceCheckOnScroll={true} isNavigator={true}>
          <div className={classes.inner}>
            <ListHeader
              expandOnClick={expandOnClick}
              categoryFilter={categoryFilter}
              navigatorShape={navigatorShape}
              removeFilter={removeFilter}
            />
            <ul className={classes.list}>
              {posts &&
                posts.map((post, i) => (
                  <ListItem
                    key={i}
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
  posts: PropTypes.array.isRequired,
  linkOnClick: PropTypes.func.isRequired,
  expandOnClick: PropTypes.func.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
  navigatorShape: PropTypes.string.isRequired,
  categoryFilter: PropTypes.string.isRequired,
  removeFilter: PropTypes.func.isRequired
};

export default injectSheet(styles)(List);
