import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Link from "gatsby-link";
import IconButton from "@material-ui/core/IconButton";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import logoblack from "../../images/jpg/logoblack.jpg";
import logo from "../../images/jpg/logo.jpg";
import config from "../../../content/meta/config";

const styles = theme => ({
  header: {
    lineHeight: 1,
    position: "relative"
  },
  avatarLink: {
    willChange: "left, top",
    float: "left",
    display: "block",
    position: "relative",
    margin: "0 12px 0 0",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      margin: "0 20px 0 0"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      position: "absolute",
      top: "10px",
      left: "40%",
      marginLeft: "-30px",
      transition: "all .5s",
      transitionTimingFunction: "ease",
      ".navigator-in-transition-from.navigator-is-opened &": {
        left: "8%"
      },
      ".is-aside.open &": {
        left: "8%",
        top: "0"
      }
    }
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "5px",
    border: "none",
    transition: "all .3s",
    transitionTimingFunction: "ease",
    display: "inline-block",
    overflow: "hidden",
    "& img": {
      maxWidth: "100%"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      width: "44px",
      height: "44px"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      width: "100px",
      height: "100px"
    },
    "@media (hover: hover)": {
      "&:hover": {
        boxShadow:
          "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
        transition: "all .4s ease",
        transform: "translate3D(0,-1px,0) scale(1.02)"
      }
    }
  },
  logo: {
    width: "36px",
    height: "36px",
    borderRadius: "5px",
    border: "none",    
    display: "inline-block",
    overflow: "hidden",
    "& img": {
      maxWidth: "100%"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      width: "44px",
      height: "44px"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      width: "100%",
      height: "65px"      
    },    
  },
  title: {
    willChange: "transform, left, top",
    fontSize: `${theme.info.fonts.boxTitleSize}em`,
    margin: 0,
    float: "left",
    transitionTimingFunction: "ease",
    "& small": {
      display: "block",
      fontSize: ".6em",
      marginTop: ".3em"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      fontSize: `${theme.info.fonts.boxTitleSizeM}em`
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      fontSize: `${theme.info.fonts.boxTitleSizeL}em`,
      position: "absolute",
      top: "85px",
      textAlign: "center",
      left: "50%",
      transform: "translate(-50%)",
      transition: "all .5s",
      ".is-aside.open &": {
        left: "60%",
        top: `${1.9 - theme.info.fonts.boxTitleSizeL}em`,
        textAlign: "left"
      }
    }
  },
  expand: {
    position: "absolute",
    top: "10px",
    right: "-25px",
    display: "none",
    color: theme.info.colors.text,
    ".is-aside.open &": {
      display: "block"
    }
  }
});

const InfoHeader = props => {
  const { classes, avatarOnClick, expandOnClick, navigatorPosition, navigatorShape } = props;
  return (
    <header className={classes.header}>
      <Link className={classes.avatarLink} onClick={avatarOnClick} to="/" title="back to Home page">
        
          {navigatorPosition === "is-featured" && navigatorShape === "open" || navigatorPosition === "is-aside" && navigatorShape === "closed"? <div className={classes.avatar} ><img src={logoblack} alt="" /></div> : <div className={classes.logo}><img src={logo} alt="" /></div>}
        
      </Link>
      <IconButton
        aria-label="Expand the box"
        className={classes.expand}
        onClick={expandOnClick}
        title="Expand the box"
      >
        <ExpandMoreIcon />
      </IconButton>
    </header>
  );
};

InfoHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  avatarOnClick: PropTypes.func.isRequired,
  expandOnClick: PropTypes.func.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
  navigatorShape: PropTypes.string.isRequired
};

export default injectSheet(styles)(InfoHeader);
