import React from "react";
import { navigateTo } from "gatsby-link";
import find from 'lodash/find'
import ContentLoader, { Facebook } from "react-content-loader";
import PropTypes from "prop-types";
import Main from "../components/Main/";
import { connect } from "react-redux";
require("core-js/fn/array/find");
require("prismjs/themes/prism-okaidia.css");
import asyncComponent from "../components/common/AsyncComponent/";
import { setNavigatorPosition, setNavigatorShape , setScrollToTop} from "../state/store";
import { moveNavigatorAside } from "../utils/shared";
import Footer from "../components/Footer/";
import Seo from "../components/Seo";

import SwipeableViews from "react-swipeable-views";
import { bindKeyboard } from "react-swipeable-views-utils";





const Post = asyncComponent(
  () =>
    import("../components/Post/")
      .then(module => {
        return module;
      })
      .catch(error => {}),
  /*<ContentLoader
    height={600}
    width={400}
    speed={0.4}
    primaryColor="#d3d3d3"
    secondaryColor="#e3e3e3">
    
    <rect x="-0.93" y="0.27" rx="0" ry="0" width="405.72" height="352.01" /> 
    
    <rect x="29.5" y="382.27" rx="0" ry="0" width="270" height="17" /> 
    <rect x="28.5" y="424.27" rx="0" ry="0" width="155" height="13" /> 
    <rect x="28.5" y="463.27" rx="0" ry="0" width="330" height="17" />
  

    
    <rect x="29" y="520" rx="3" ry="3" width="340" height="6.4" /> 
    <rect x="29" y="546" rx="3" ry="3" width="350" height="6.4" /> 
    <rect x="29" y="568" rx="3" ry="3" width="201" height="6.4" />
  </ContentLoader>*/

  
);






class PostTemplate extends React.Component {
  moveNavigatorAside = moveNavigatorAside.bind(this);

  state = {
    swipeIndex: 0,
  }

  componentDidMount() {
    console.log("here");
    if (this.props.navigatorPosition === "is-featured") {
      this.moveNavigatorAside();
      this.props.setScrollToTop(true);
    }
  } 

  componentWillMount() {
    console.log("componentWillMount");
    if (this.props.navigatorPosition === "is-featured") {
      this.moveNavigatorAside();
    }

    if (this.postIndex.previous !== null && this.postIndex.next !== null) {
      this.setState({
        swipeIndex: 1
      });
    } else if (this.postIndex.previous !== null && this.postIndex.next == null) {
      this.setState({
        swipeIndex: 1
      });
    } else if (this.postIndex.previous == null && this.postIndex.next !== null) {
      this.setState({
        swipeIndex: 0
      });
    }
  }

  postIndex = find(
    this.props.data.allContentfulPost.edges,
    ({ node: post }) => post.id === this.props.data.post.id
  );

  handleChangeIndex = index => {
    console.log(this.postIndex);
    const oldIndex = this.state.swipeIndex;

    if (index < oldIndex) {
      if (this.postIndex.previous){
        console.log(index);
        console.log(this.state.swipeIndex);
        console.log(this.postIndex.previous);
        navigateTo(`/${this.postIndex.previous.slug}/`);          
      }
    } else if (index > oldIndex) {
      console.log(index);
      console.log(this.state.swipeIndex);
      if (this.postIndex.next) {
        console.log(this.postIndex.next);
        navigateTo(`/${this.postIndex.next.slug}/`);
      }
    }
  };

  render() {
    const { data, pathContext } = this.props;
    console.log(this.postIndex);
    console.log(this.props);

    const facebook = (((data || {}).site || {}).siteMetadata || {}).facebook;
    
    return (
      <Main>
        {this.postIndex.previous !== null &&
          this.postIndex.next !== null && (
            <SwipeableViews
              index={this.state.swipeIndex}
              onChangeIndex={this.handleChangeIndex}              
            >
              <Post
                post={this.postIndex.previous}
                slug={pathContext.slug}
                author={data.author}
                facebook={facebook}
              />
              <Post
                post={data.post}
                slug={pathContext.slug}
                author={data.author}
                facebook={facebook}
              />
              <Post
                post={this.postIndex.next}
                slug={pathContext.slug}
                author={data.author}
                facebook={facebook}
              />
            </SwipeableViews>
          )}
        {this.postIndex.previous == null && (
          <SwipeableViews 
          index={this.state.swipeIndex}
          onChangeIndex={this.handleChangeIndex}
          >                      
            <Post
              post={data.post}
              slug={pathContext.slug}
              author={data.author}
              facebook={facebook}
            />
             <Post
              post={this.postIndex.next}
              slug={pathContext.slug}
              author={data.author}
              facebook={facebook}
            />                      
          </SwipeableViews>
          )}
        {this.postIndex.next == null && (
          <SwipeableViews 
          index={this.state.swipeIndex}
          onChangeIndex={this.handleChangeIndex}
          >            
              <Post
                post={this.postIndex.previous}
                slug={pathContext.slug}
                author={data.author}
                facebook={facebook}
              />            
            <Post
              post={data.post}
              slug={pathContext.slug}
              author={data.author}
              facebook={facebook}
            />                     
          </SwipeableViews>
          )}  
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
  isWideScreen: PropTypes.bool.isRequired,
  setScrollToTop: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    navigatorPosition: state.navigatorPosition,
    isWideScreen: state.isWideScreen
  };
};

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape,
  setScrollToTop,
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
        next {
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
