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
    height={600}
    width={400}
    speed={0.}
    primaryColor="#d3d3d3"
    secondaryColor="#e3e3e3">
    
    <rect x="-0.93" y="0.27" rx="0" ry="0" width="405.72" height="352.01" /> 
    
    <rect x="29.5" y="382.27" rx="0" ry="0" width="270" height="17" /> 
    <rect x="28.5" y="424.27" rx="0" ry="0" width="155" height="13" /> 
    <rect x="28.5" y="463.27" rx="0" ry="0" width="330" height="17" />
  

    
    <rect x="29" y="520" rx="3" ry="3" width="340" height="6.4" /> 
    <rect x="29" y="546" rx="3" ry="3" width="350" height="6.4" /> 
    <rect x="29" y="568" rx="3" ry="3" width="201" height="6.4" />
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
