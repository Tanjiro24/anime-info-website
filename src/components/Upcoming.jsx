import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/global";
import styled from "styled-components";
import { Sidebar } from "./Sidebar";
import { useState, useEffect } from "react";

export function Upcoming({ rendered }) {
  const { upcomingAnime, isSearch, searchResults } = useGlobalContext();
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const conditionalRender = () => {
    if (!isSearch && rendered === "upcoming") {
      return upcomingAnime?.map((anime) => (
        <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
          <img src={anime.images.jpg.large_image_url} alt="" />
          <h4 className="sm">{anime.title}</h4>
        </Link>
      ));
    } else {
      return searchResults?.map((anime) => (
        <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
          <img src={anime.images.jpg.large_image_url} alt="" />
          <h4 className="sm">{anime.title}</h4>
        </Link>
      ));
    }
  };

  return (
    <UpcomingStyled>
      <div className="upcoming-anime">{conditionalRender()}</div>
      <Sidebar />
      {isVisible && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          ↑
        </div>
      )}
    </UpcomingStyled>
  );
}

const UpcomingStyled = styled.div`
  display: flex;

  .upcoming-anime {
    margin-top: 2rem;
    padding: 2rem 1rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    row-gap: 5rem;
    column-gap: 3rem;
    background-color: #141619;
    border-top: 5px solid #27ae60;

    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      padding: 2rem 0.5rem;
    }

    @media screen and (max-width: 480px) {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      padding: 1.5rem 0.5rem;
      grid-gap: 7.5rem;
    }

    a {
      height: 450px;
      /* border-radius: 7px; */
      border: 5px solid #fff;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
      }

      .sm {
        font-size: 1rem;
        color: white;
        font-weight: bold;
        margin-top: 5px;
      }

      @media screen and (max-width: 768px) {
        height: 400px;
      }

      @media screen and (max-width: 480px) {
        height: 300px;
      }

      img {
        width: 100%;
        height: 100%;
        /* border-radius: 5px; */
      }
    }
  }

  .scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: #27ae60;
    color: white;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    z-index: 1000;
    transition: opacity 0.3s, transform 0.3s;
    /* opacity: 0; */
    transform: translateY(0px);
  }

  .scroll-to-top:hover {
    background-color: #1f8e50;
  }

  .scroll-to-top.show {
    opacity: 1;
    transform: translateY(0);
  }

  @media screen and (max-width: 768px) {
    .scroll-to-top {
      width: 45px;
      height: 45px;
      font-size: 20px;
      bottom: 15px;
      right: 15px;
    }
  }

  @media screen and (max-width: 480px) {
    .scroll-to-top {
      width: 40px;
      height: 40px;
      font-size: 18px;
      bottom: 10px;
      right: 10px;
    }
  }
`;
