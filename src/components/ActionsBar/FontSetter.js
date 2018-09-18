import injectSheet from "react-jss";
import PropTypes from "prop-types";
import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { connect } from "react-redux";

//import { MenuItem, MenuList } from "@material-ui/core/Menu";
import { Manager, Target, Popper } from "react-popper";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import IconButton from "@material-ui/core/IconButton";
import FormatSizeIcon from "@material-ui/icons/FormatSize";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  fontSizeSetter: {
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {}
  },
  open: {
    color: theme.bars.colors.icon
  },
  popperClose: {
    pointerEvents: "none"
  },
  paper: {    
    width: "500px"   
  },
  dialogContent:  {    
    overflow: "hidden"
  },
});

class FontSetter extends React.Component {
  state = {
    anchorEl: null,
    open: false,
    fontSize: 16.6
  };

  componentDidMount() {
    const fontSize = this.props.fontSizeIncrease;
    console.log(this.state.fontSize);
    console.log(this.props.fontSizeIncrease);
    this.setState({
      fontSize: +(fontSize * 100) - 100
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timeout); 
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    if (!this.state.open) {
      return;
    }

    this.timeout = setTimeout(() => {
      this.setState({ open: false });
    });
  };

  handleSetting = e => {
     
    const val = e.target
    console.log(val);
    const factor = +(e+ 100) / 100;
    this.props.increaseFont(factor);
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, open } = this.state;
    const style = { margin: 25 };
    const marks = {      
      0: "Aa",
      16.6: "",
      33.2: "",
      50: {
        label: <strong>Aa</strong>,
      },
    };

    return (
      <nav className={classes.fontSizeSetter}>
        <Manager>
          <Target>
            <IconButton
              aria-label="Increase font size"
              aria-owns={anchorEl ? "long-menu" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              title="Change font size"
              className={classes.open}
            >
              <FormatSizeIcon />
            </IconButton>
          </Target>
          {/*<Popper
            placement="bottom-end"
            eventsEnabled={open}
            className={classNames({ [classes.popperClose]: !open })}
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow in={open} id="font-menu-list" style={{ transformOrigin: "0 0 0" }}>
                <Paper>
                  <MenuList role="menu">
                    <MenuItem onClick={this.handleSetting}>150%</MenuItem>
                    <MenuItem onClick={this.handleSetting}>125%</MenuItem>
                    <MenuItem onClick={this.handleSetting}>100%</MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>*/}
          <Dialog            
            classes={{
                paper: classes.paper, // class name, e.g. `classes-nesting-label-x`
            }}
            open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Select Font Size"}
            </DialogTitle>
            <DialogContent classes={{
                root: classes.dialogContent, // class name, e.g. `classes-nesting-label-x`
            }}>              
              <div style={style}>
              <Slider marks={marks} min={0} max={50} step={null} onChange={this.handleSetting} defaultValue={this.state.fontSize} />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Disagree
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Manager>
      </nav>
    );
  }
}

FontSetter.propTypes = {
  classes: PropTypes.object.isRequired,
  increaseFont: PropTypes.func.isRequired,
  fontSizeIncrease: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    fontSizeIncrease: state.fontSizeIncrease
  };
};

export default connect(mapStateToProps)(injectSheet(styles)(FontSetter));
