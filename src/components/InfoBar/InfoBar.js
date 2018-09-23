import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Link from "gatsby-link";
import { connect } from "react-redux";

import { setNavigatorPosition } from "../../state/store";
import { featureNavigator, moveNavigatorAside } from "./../../utils/shared";

import config from "../../../content/meta/config";
import logo from "../../images/jpg/logo.jpg";
import TopMenu from "./TopMenu";

const styles = theme => ({
  infoBar: {
    position: "absolute",
    background: theme.bars.colors.white,
    top: 0,
    left: 0,
    width: "100%",
    height: `${theme.bars.sizes.infoBar}px`,
    zIndex: 9999,
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      display: "none"
    },
    "&.is-aside.open": {
      borderBottom: `1px solid ${theme.base.colors.lines}`
    }
  },
  title: {
    float: "left",
    margin: "10px 0 0 15px",
    color: theme.bars.colors.text,
    "& small": {
      display: "block",
      fontSize: ".65em",
      margin: "2px 0 0 0"
    }
  },
  avatarLink: {
    display: "block",
    float: "left",
    margin: "10px 0 0 calc(0.1rem + 10px)"
  },
  avatar: {
    width: "120px",
    borderRadius: "0",
    border: "none",
    height: "40px"
  }
});

class InfoBar extends React.Component {
  homeLinkOnClick = featureNavigator.bind(this);
  pageLinkOnClick = moveNavigatorAside.bind(this);

  render() {
    const { classes, navigatorPosition, navigatorShape} = this.props;

    return (
      <aside className={`${classes.infoBar} ${navigatorPosition ? navigatorPosition : ""} 
        ${navigatorShape ? navigatorShape : ""}`}>
        <Link to="/" className={classes.avatarLink} onClick={this.homeLinkOnClick}>
          <Avatar alt={config.infoTitle} src={logo} className={classes.avatar} />
        </Link>       
        <TopMenu          
          homeLinkOnClick={this.homeLinkOnClick}
          pageLinkOnClick={this.pageLinkOnClick}
        />
      </aside>
    );
  }
}

InfoBar.propTypes = {
  classes: PropTypes.object.isRequired,
  pages: PropTypes.array.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
  navigatorShape: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    navigatorPosition: state.navigatorPosition,
    navigatorShape: state.navigatorShape
  };
};

const mapDispatchToProps = {
  setNavigatorPosition,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(InfoBar));
