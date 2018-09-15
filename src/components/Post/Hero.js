import React from "react";
import Img from "gatsby-image";
import styled from "styled-components";
import PropTypes from "prop-types";
import PostDate from "./PostDate";
import theme from "../../styles/theme";

const Wrapper = styled.section`
  position: relative;
  min-height: 300px;
  @media (max-width: ${theme.responsive.medium}) {
    min-height: 300px;
  }
`;
const BgImg = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 300px;

  height: auto;
  @media (min-width: ${theme.responsive.small}) {
    height: ${props => props.height || "auto"};
  }
  @media (max-width: ${theme.responsive.medium}) {
    min-height: 300px;
    max-height: 300px;
  }
  & > img {
    object-fit: ${props => props.fit || "cover"} !important;
    object-position: ${props => props.position || "50% 50%"} !important;
  }
  &:before {
    content: "";
    background: rgba(0, 0, 0, 0.25);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
`;
const HeaderBlock = styled.div`
  padding: 1.5rem 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  background: linear-gradient(180deg, transparent 0, rgba(0, 0, 0, 0.65) 70%);
  z-index: 1;
`;

const Title = styled.h1`
  margin: 0 auto !important;
  line-height: 1.3em; 
  font-size: 1.67rem !important;
  text-transform: capitalize !important;
  font-weight: 600;
  color: #ffffff !important;
  padding: 0 1.5rem;
  @media only screen and (max-width: 700px) {
    padding: 0 1rem !important;
  }

  @media screen and (min-width: 830px) {
    font-size: 2.5rem !important;
  }
`;

const Hero = props => {
  const { height, image, title, date } = props;
  console.log(props);
  return (
    <Wrapper>
      <BgImg height={height} sizes={image.sizes} backgroundColor={"#eeeeee"} />
      <HeaderBlock>
        <Title>{title}</Title>
        <PostDate date={date} />
      </HeaderBlock>
    </Wrapper>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default Hero;
