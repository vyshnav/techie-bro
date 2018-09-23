import React from "react";
import injectSheet from "react-jss";
import { MuiThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import withRoot from "../withRoot";

import theme from "../styles/theme";
import globals from "../styles/globals";

import { setFontSizeIncrease, setIsWideScreen } from "../state/store";

import asyncComponent from "../components/common/AsyncComponent/";
import Loading from "../components/common/Loading/";
import Navigator from "../components/Navigator/";
import ActionsBar from "../components/ActionsBar/";
import InfoBar from "../components/InfoBar/";
import LayoutWrapper from "../components/LayoutWrapper/";

import { isWideScreen, timeoutThrottlerHandler } from "../utils/helpers";

const InfoBox = asyncComponent(
  () =>
    import("../components/InfoBox/")
      .then(module => {
        return module;
      })
      .catch(error => {}),
  <Loading
    overrides={{ width: `${theme.info.sizes.width}px`, height: "100vh", right: "auto" }}
    afterRight={true}
  />
);

class Layout extends React.Component {
  timeouts = {};
  categories = [];

  componentDidMount() {
    this.props.setIsWideScreen(isWideScreen());
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.resizeThrottler, false);
    }
  }

  componentWillMount() {
    if (typeof localStorage !== "undefined") {
      const inLocal = +localStorage.getItem("font-size-increase");

      const inStore = this.props.fontSizeIncrease;

      if (inLocal && inLocal !== inStore && inLocal >= 1 && inLocal <= 1.5) {
        this.props.setFontSizeIncrease(inLocal);
      }
    }

    this.getCategories();
  }

  getCategories = () => {
    console.log(this.props);
    this.categories = this.props.data.posts.edges.reduce((list, edge, i) => {
      const category = edge.node.category;
      if (category && !~list.indexOf(category)) {
        return list.concat(edge.node.category);
      } else {
        return list;
      }
    }, []);
    console.log(this.categories);
  };

  resizeThrottler = () => {
    return timeoutThrottlerHandler(this.timeouts, "resize", 500, this.resizeHandler);
  };

  resizeHandler = () => {
    this.props.setIsWideScreen(isWideScreen());
  };

  render() {
    console.log(this.props);
    const { children, data } = this.props;

    // TODO: dynamic management of tabindexes for keybord navigation
    return (
      <LayoutWrapper>
        {children()}
        <Navigator posts={data.posts.edges} categories={this.categories}/>       
        <ActionsBar categories={this.categories} />
        <InfoBar />        
        {this.props.isWideScreen && <InfoBox />}
      </LayoutWrapper>
    );
  }
}

Layout.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  setIsWideScreen: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired,
  fontSizeIncrease: PropTypes.number.isRequired,
  setFontSizeIncrease: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    pages: state.pages,
    isWideScreen: state.isWideScreen,
    fontSizeIncrease: state.fontSizeIncrease
  };
};

const mapDispatchToProps = {
  setIsWideScreen,
  setFontSizeIncrease
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(injectSheet(globals)(Layout)));

//eslint-disable-next-line no-undef
export const guery = graphql`
  query Layout {
    posts: allContentfulPost(
      limit: 1000
      sort: { fields: [publishDate], order: DESC }
      filter: { node_locale: { eq: "en-US" } }
    ) {
      edges {
        node {
          title
          metaDescription {
            metaDescription
          }
          id
          node_locale
          slug
          publishDate(formatString: "MMMM DD, YYYY")
          heroImage {
            title
            sizes(maxWidth: 1800) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
          category {
            id
            title
            slug
          }
          body {
            childMarkdownRemark {
              html
              excerpt(pruneLength: 200)
            }
          }
        }
      }
    }   
  }
`;


