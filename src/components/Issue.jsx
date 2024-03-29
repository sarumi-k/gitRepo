import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import IssuePost from "./IssuePost";
import Pagination from "./Pagination";
import SkeletonIssue from "./SkeletonIssue";

const Issue = () => {
  const [bookedData, setBookedData] = useState([])
  const [isLoaded, setIsLoaded] = useState(null);
  const [issues, setIssues] = useState([]);
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  console.log(issues)

  const searchIssues = async (githubId, repoName) => {
    setIsLoaded(false);
    const url = `https://api.github.com/repos/${githubId}/${repoName}/issues`;
    await axios
      .get(url)
      .then((res) => {
        setIssues((body) => (body ? [...body, ...res.data] : [res.data]));
        setIsLoaded(true);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    bookedData.map((value) => searchIssues(value.login, value.name));
  }, [bookedData]);

  useEffect(() => {
    setBookedData(JSON.parse(localStorage.getItem("bookedData")))
  }, []);

  return (
    <Container>
      {isLoaded !== null &&
        (isLoaded ? (
          <>
            <PostBox>
              {issues.slice(offset, offset + limit).map((item) => (
                <IssuePost
                  key={item.id}
                  url={item.html_url}
                  description={item.repository_url.slice(29)}
                  title={item.title}
                  avatar={item.user.avatar_url}
                  updated={item.updated_at}
                />
              ))}
            </PostBox>
            {issues.length === 0 ? (
              <Empty>Issue가 없습니다.</Empty>
            ) : (
              <Pagination
                total={issues.length}
                limit={limit}
                page={page}
                setPage={setPage}
              />
            )}
          </>
        ) : (
          <>
            {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9], (el) => (
              <SkeletonIssue key={el} />
            ))}
          </>
        ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 150px);
  background: #fdf6f0;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const PostBox = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;
`;
const Empty = styled.p`
  font-size: 22px;
  font-weight: 600;
  color: #ff8080;
  display: flex;
  align-items: center;
`;

export default Issue;
