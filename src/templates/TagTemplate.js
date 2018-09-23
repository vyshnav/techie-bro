import React from "react";
import PropTypes from "prop-types";
import Main from "../components/Main/";
import { connect } from "react-redux";
require("core-js/fn/array/find");
require("prismjs/themes/prism-okaidia.css");

import { setNavigatorPosition, setNavigatorShape } from "../state/store";
import { moveNavigatorAside } from "../utils/shared";
import Tags from "../components/Tags/";

class PostTemplate extends React.Component {
  moveNavigatorAside = moveNavigatorAside.bind(this);

  linkOnClick = moveNavigatorAside.bind(this);

  categories = [];

  expandOnClick = e => {
    this.props.setNavigatorShape("open");
    setTimeout(forceCheck, 600);
  };

  componentDidMount() {
    console.log("here");
    if (this.props.navigatorPosition === "is-featured") {
      this.moveNavigatorAside();
    }
  }

  componentWillMount() {
    this.getCategories();
  }

  getCategories = () => {
    console.log(this.props);
    this.categories = this.props.data.categories.edges.reduce((list, edge, i) => {
      const category = edge.node;
      if (category && !~list.indexOf(category)) {
        return list.concat(edge.node);
      } else {
        return list;
      }
    }, []);
    console.log(this.categories);
  };

  render() {
    const { data, pathContext } = this.props;
    console.log(this.props);
    const facebook = (((data || {}).site || {}).siteMetadata || {}).facebook;

    return (
      <Main>
        <Tags
          title={data.tags.title}
          tags={data.tags.post}
          linkOnClick={this.linkOnClick}
          expandOnClick={this.expandOnClick}
          categories={this.categories}
        />
        {/*<Footer footnote={data.footnote} />*/}
      </Main>
    );
  }
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pathContext: PropTypes.object.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
  setNavigatorPosition: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    navigatorPosition: state.navigatorPosition,
    isWideScreen: state.isWideScreen
  };
};

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostTemplate);

//eslint-disable-next-line no-undef
export const query = graphql`
  query tagQuery($slug: String!) {
    tags: contentfulTag(slug: { eq: $slug }) {
      title
      id
      slug
      post {
        id
        title
        slug
        node_locale
        metaDescription {
          metaDescription
        }
        publishDate(formatString: "MMMM DD, YYYY")
        heroImage {
          title
          sizes(maxWidth: 1800) {
            ...GatsbyContentfulSizes_withWebp_noBase64
          }
        }
        body {
          childMarkdownRemark {
            html
            excerpt(pruneLength: 80)
          }
        }
      }
    }
    categories: allContentfulCategory {
      edges {
        node {
          id
          title
          slug
          node_locale
        }
      }
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`