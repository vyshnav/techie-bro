import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { forceCheck } from "react-lazyload";

import { setNavigatorPosition, setNavigatorShape, setCategoryFilter } from "../../state/store";
import { moveNavigatorAside } from "./../../utils/shared";
import List from "./List";



const styles = theme => ({
  navigator: {
    transform: "translate3d(0, 0, 0)",
    willChange: "left, top, bottom, width",
    background: theme.navigator.colors.background,
    position: "absolute",
    top: 0,
    left: 0,
    height: "100vh",
    transitionTimingFunction: "cubic-bezier(0, 0.85, 0.13, 1.01)",
    transition: "left .5s",
    width: "100%",
    zIndex: 1,
    [`@media (max-width: ${theme.mediaQueryTresholds.L - 1}px)`]: {
      "&.is-aside": {
        left: "-100%",
      },
      "&.is-featured": {
        left: 0
      }
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      "&.is-featured": {
        transition: "left .9s",
        width: `calc(100vw - ${theme.info.sizes.width}px - ${theme.bars.sizes.actionsBar}px)`,
        left: `${theme.info.sizes.width}px`,
        top: 0
      },
      "&.is-aside": {
        transition: "none, bottom 0.4s",
        left: 0,
        width: `${theme.info.sizes.width - 1}px`,
        zIndex: 1,
        top: "auto",
        "&.closed": {
          bottom: `calc(-100% + 100px + ${theme.navigator.sizes.closedHeight}px)`,
          height: `calc(100% - 100px)`,
          zIndex: 99999,
        },
        "&.open": {
          bottom: 0,
          height: `calc(100% - 100px)`,
          zIndex: 99999,
        },
        "&::after": {
          content: `""`,
          position: "absolute",
          top: 0,
          left: theme.base.sizes.linesMargin,
          right: theme.base.sizes.linesMargin,
          height: 0,
          borderTop: `1px solid ${theme.base.colors.lines}`
        }
      },
      "&.moving-aside": {
        transition: "left 0.3s",
        transitionTimingFunction: "cubic-bezier(0, 1, 0, 1)",
        left: `calc(-100vw + ${2 * theme.info.sizes.width + 60}px)`,
        width: `calc(100vw - ${theme.info.sizes.width}px - 60px)`,
        top: 0
      },
      "&.resizing-aside": {
        transition: "none",
        width: `${theme.info.sizes.width - 1}px`,
        top: "auto",
        left: 0,
        "&.closed": {
          bottom: `calc(-100% + 100px)`,
          height: `calc(100% - 100px)`
        },
        "&.open": {
          bottom: `calc(-100% + 100px)`,
          height: `calc(100% - 100px)`
        }
      },
      "&.moving-featured": {
        transition: "bottom .3s",

        bottom: "-100%",
        top: "auto",
        left: 0,
        zIndex: 1,
        width: `${theme.info.sizes.width - 1}px`
      },
      "&.resizing-featured": {
        transition: "none",
        top: 0,
        bottom: "auto",
        left: `calc(-100vw + ${2 * theme.info.sizes.width + 60}px)`,
        width: `calc(100vw - ${theme.info.sizes.width}px - 60px)`
      }
    }
  }
});

class Navigator extends React.Component {
  linkOnClick = moveNavigatorAside.bind(this);

  expandOnClick = e => {
    this.props.setNavigatorShape("open");
    setTimeout(forceCheck, 600);
  };

  render() {
    const { classes, posts, navigatorPosition, navigatorShape, categoryFilter, categories } = this.props;
    console.log(this.props);
    return (
      <nav
        className={`${classes.navigator} ${navigatorPosition ? navigatorPosition : ""} ${
          navigatorShape ? navigatorShape : ""
        } `}
      >       
        <List
          posts={posts}
          categories={categories}
          navigatorPosition={navigatorPosition}
          navigatorShape={navigatorShape}
          linkOnClick={this.linkOnClick}
          expandOnClick={this.expandOnClick}
          categoryFilter={categoryFilter}          
        />
      </nav>
    );
  }
}

Navigator.propTypes = {
  posts: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
  navigatorShape: PropTypes.string.isRequired,
  setNavigatorPosition: PropTypes.func.isRequired,
  setNavigatorShape: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired,
  categoryFilter: PropTypes.string.isRequired,
  setCategoryFilter: PropTypes.func.isRequired
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
  setNavigatorPosition,
  setNavigatorShape,
  setCategoryFilter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(Navigator));
