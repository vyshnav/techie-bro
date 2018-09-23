import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import PhoneIcon from "@material-ui/icons/Phone";


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  appBar: {
    position: "fixed",
    flexGrow: 1,
    zIndex: 9999,
    width: '100%',
    backgroundColor: theme.bars.colors.background,
    top: 60,
    right: 0,
    left: "auto",
    height: "40px",
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      top: 0,      
    },
    ".is-aside.closed &": {
      display: "none"
    }
  },
  appBarContainer: {
    backgroundColor: theme.bars.colors.background,
    borderBottom: `1px solid ${theme.base.colors.lines}`,
    boxShadow: "none"
  },
  tab: {
    minHeight: "40px"
  },
  labelContainer: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  label: {
    fontSize: "0.7rem",
    fontFamily: "inherit !important",
    textTransform: "capitalize !important"
  },
  tabs: {
    minHeight: 40
  },
});

class AppBarScrollable extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {    
    const category = event.target.innerText.trim();
    console.log(category);
    this.setState({ value });
    this.props.filterCategory(category);
  };

  render() {
    const { classes, categories } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.appBar}>
        <AppBar position="static" color="default" className={classes.appBarContainer}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
            classes={{
              root: classes.tabs // class name, e.g. `classes-nesting-label-x`
            }}
          >
            <Tab
              label="All"
              classes={{
                root: classes.tab,
                labelContainer: classes.labelContainer, 
                label: classes.label // class name, e.g. `classes-nesting-label-x`
              }}
            />
            {categories.map(category => (
              <Tab
                key={category.id}
                label={category.title}
                classes={{
                  root: classes.tab,
                  labelContainer: classes.labelContainer,
                  label: classes.label // class name, e.g. `classes-nesting-label-x`
                }}
              />
            ))}
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

AppBarScrollable.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  filterCategory: PropTypes.func.isRequired
};

export default injectSheet(styles)(AppBarScrollable);
