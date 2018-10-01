import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import {
  FacebookShareButton,
  GooglePlusShareButton,
  WhatsappShareButton,
  TwitterShareButton, 
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  WhatsappIcon
} from "react-share";


import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

import { Share, Clear }  from "@material-ui/icons";

import config from "../../../content/meta/config";

const styles = theme => ({
  share: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      flexDirection: "row"
    }
  },
  speedDial: {
    position: "fixed",
    bottom: "65px",
    padding: "0.5rem",
    zIndex: 99999
  },
  fab: {
    background: "linear-gradient(87deg,#f5365c 0,#f56036 100%)!important",
  },
  links: {
    display: "flex",
    flexDirection: "row",
    "& .SocialMediaShareButton": {
      margin: "0 .8em",
      cursor: "pointer"
    }
  },
  label: {
    fontSize: "1.2em",
    margin: "0 1em 1em",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      margin: "0 1em"
    }
  }
});




class PostShare extends React.Component {

  state = {
    open: false,
    hidden: false,
  };

  handleClick = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  handleOpen = () => {
    if (!this.state.hidden) {
      this.setState({
        open: true,
      });
    }
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  actions = [];
  componentWillMount() {

  const { post, slug } = this.props;
    const { title } = post;
    const { excerpt } = post.body.childMarkdownRemark;
    const url = config.siteUrl + config.pathPrefix + slug;
    console.log(url);
    const iconSize = 40;

  this.actions = [

  { icon: <TwitterShareButton url={url} title={title}>
            <TwitterIcon round size={iconSize} />
          </TwitterShareButton>, name: 'Twitter' },
  { icon: <GooglePlusShareButton url={url}>
            <GooglePlusIcon round size={iconSize} />            
          </GooglePlusShareButton>, name: 'GooglePlus' },
  { icon: <FacebookShareButton url={url} aria-label="Facebook share">
            <FacebookIcon round size={iconSize} />
          </FacebookShareButton>, name: 'Facebook' },
  { icon: <WhatsappShareButton url={url} title={title} description={excerpt}>
            <WhatsappIcon round size={iconSize} />            
          </WhatsappShareButton>, name: 'Whatsapp' },
  
  ];
  }

  render() {
    const { classes } = this.props;
    const { hidden, open } = this.state;
    
    const filter = count => (count > 0 ? count : "");

    

    return (
      <div className={classes.share}>
        <SpeedDial
          ariaLabel="Share post!"
          className={classes.speedDial}
          classes={{ fab: classes.fab }}
          // hidden={hidden}
          icon={<SpeedDialIcon icon={<Share />} openIcon={<Clear />} />}
          onBlur={this.handleClose}
          onClick={this.handleClick}
          onClose={this.handleClose}
          onFocus={this.handleOpen}
          onMouseEnter={this.handleOpen}
          onMouseLeave={this.handleClose}
          open={open}
        >
          {this.actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={this.handleClick}
            />
          ))}
        </SpeedDial>
      </div>
    );
  }
}

PostShare.propTypes = {
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired
};

export default injectSheet(styles)(PostShare);
