import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import SearchPost from "./SearchPost";
import { bookmarkRepo } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import Pagination from "./Pagination";
import SkeletonPost from "./SkeletonPost";

const Search = () => {
  const storageData = JSON.parse(localStorage.getItem("bookedData"));
  const [searchData, setSearchData] = useState([]);
  const [bookedData, setBookedData] = useRecoilState(bookmarkRepo);
  const [isLoaded, setIsLoaded] = useState(null);
  const [limit, setLimit] = useState(5); // 한 페이지에 보여줄 데이터 수
  const [page, setPage] = useState(1); // 현재 페이지
  const offset = (page - 1) * limit; // 데이터가 시작하는 위치

  const bookRepo = async (repo) => {
    const storageData = await JSON.parse(localStorage.getItem("bookedData"));

    if (storageData.length === 4) {
      alert("Repository는 최대 4개까지 등록할 수 있습니다.");
    } else {
      const exist = storageData.find(
        (repoName) =>
          repoName.name === repo.name && repoName.login === repo.login
      );
      if (exist) {
        alert("이미 등록한 Repository입니다.");
      } else {
        setBookedData([...bookedData, repo]);
      }
    }
  };

  console.log(searchData)

  useEffect(() => {
    if (storageData) setBookedData(storageData);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookedData", JSON.stringify(bookedData));
  }, [bookedData]);

  return (
    <Container>
      <SearchBar setData={setSearchData} setIsLoaded={setIsLoaded} />
      {isLoaded !== null &&
        (isLoaded ? (
          <>
            {searchData.slice(offset, offset + limit).map((item) => (
              <SearchPost
                key={item.id}
                url={item.html_url}
                title={item.name}
                description={item.description}
                avatar={item.owner.avatar_url}
                updated={item.updated_at}
                button="등록"
                onClick={() =>
                  bookRepo({
                    name: item.name,
                    login: item.owner.login,
                    description: item.description,
                    updated: item.updated_at,
                    avatar: item.owner.avatar_url,
                  })
                }
              />
            ))}
            {searchData.length === 0 ? (
              <Empty>검색결과가 없습니다.</Empty>
            ) : (
              <Pagination
                total={searchData.length}
                limit={limit}
                page={page}
                setPage={setPage}
              />
            )}
          </>
        ) : (
          <>
            {Array.from([1, 2, 3, 4, 5], (el) => (
              <SkeletonPost key={el} />
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
  padding: 30px 50px 0px 50px;
  box-sizing: border-box;
`;

const Empty = styled.p`
  font-size: 22px;
  font-weight: 600;
  color: #ff8080;
  display: flex;
  justify-content: center;
  height: calc(100vh - 250px);
  align-items: center;
`;

export default React.memo(Search);
