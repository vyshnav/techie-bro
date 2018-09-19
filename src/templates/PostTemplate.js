import React from "react";
import ContentLoader, { Facebook } from "react-content-loader";
import PropTypes from "prop-types";
import Main from "../components/Main/";
import { connect } from "react-redux";
require("core-js/fn/array/find");
require("prismjs/themes/prism-okaidia.css");
import asyncComponent from "../components/common/AsyncComponent/";
import { setNavigatorPosition, setNavigatorShape } from "../state/store";
import { moveNavigatorAside } from "../utils/shared";
import Footer from "../components/Footer/";
import Seo from "../components/Seo";



const Post = asyncComponent(
  () =>
    import("../components/Post/")
      .then(module => {
        return module;
      })
      .catch(error => {}),
  <ContentLoader
    height={475}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb">    
    <rect x="75" y="13" rx="4" ry="4" width="100" height="13" /> 
    <rect x="75" y="37" rx="4" ry="4" width="50" height="8" /> 
    <rect x="0" y="70" rx="5" ry="5" width="400" height="400" />
  </ContentLoader>
);
class PostTemplate extends React.Component {
  moveNavigatorAside = moveNavigatorAside.bind(this);

  componentDidMount() {
    console.log("here");
    if (this.props.navigatorPosition === "is-featured") {
      this.moveNavigatorAside();
    }
  }

  render() {
    const { data, pathContext } = this.props;
    console.log(this.props);    
    const facebook = (((data || {}).site || {}).siteMetadata || {}).facebook;

    return (
      <Main>
        <Post post={data.post} slug={pathContext.slug} author={data.author} facebook={facebook} />
        {/*<Footer footnote={data.footnote} />*/}
        <Seo data={data.post} facebook={facebook} />
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
export const postQuery = graphql`
  query postQuery($slug: String!, $locale: String!) {
    post: contentfulPost(slug: { eq: $slug }, node_locale: { eq: $locale }) {
      title
      id
      slug
      node_locale
      metaDescription {
        metaDescription
      }
      publishDate(formatString: "MMMM DD, YYYY")
      publishDateISO: publishDate(formatString: "YYYY-MM-DD")
      tags {
        title
        id
        slug
        node_locale
      }
      heroImage {
        title
        sizes(maxWidth: 1800) {
          ...GatsbyContentfulSizes_withWebp_noBase64
        }
        ogimg: resize(width: 1800) {
          src
          width
          height
        }
      }
      body {
        childMarkdownRemark {
          html
          excerpt(pruneLength: 320)
        }
      }
    }
    allContentfulPost(
      limit: 1000
      sort: { fields: [publishDate], order: DESC }
      filter: { node_locale: { eq: $locale } }
    ) {
      edges {
        node {
          id
        }
        previous {
          slug
        }
        next {
          slug
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
`;
