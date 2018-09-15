import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import PropTypes from "prop-types";

const Date = styled.p`
  display: block;
  font-size: 0.75rem !important;
  color: #999 !important;
  margin: 0 auto !important;
 
  padding: 0 1.5rem;

  @media only screen and (max-width: 700px) {
    padding: 0 1rem !important;
  }
`;

const PostDate = props => {
  const { date } = props;
  return <Date>Posted on {date}</Date>;
};

PostDate.propTypes = {
  date: PropTypes.string.isRequired
};

export default PostDate;
