import React from "react";
import styled from "styled-components";

const RepositoryPost = ({
  avatar,
  title = "Title",
  description,
  onClick,
  button,
}) => {
  return (
    <Box>
      <div className="box-avatar">
        <img src={avatar} alt="avatar" />
      </div>
      <div className="box-content">
        <div className="box-title">{title}</div>
        {description !== undefined ? (
          <div className="box-sub">{description}</div>
        ) : null}
      </div>
      <div className="box-button">
        <button onClick={onClick}>{button}</button>
      </div>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 22.2%;
  padding: 15px;
  box-sizing: border-box;
  background-color: #eeeeee;
  margin-bottom: 1px;
  :hover {
    background-color: #ffecec;
  }
  div {
    margin: 0 12px;
  }
  img {
    width: 70px;
    border-radius: 100px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  button {
    border: 0px;
    background-color: #ff8080;
    border-radius: 3px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    color: #fff;
    width: 50px;
    height: 30px;
    font-weight: 700;
    cursor: pointer;
  }
  .box-content {
    width: 290px;
  }
  .box-title {
    height: 40px;
    font-weight: 900;
    font-size: 22px;
    color: #ff8080;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .box-sub {
    font-size: small;
    color: #757575;
    opacity: 0.6;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .box-button {
    margin-left: auto;
    cursor: pointer;
  }
`;

export default RepositoryPost;
