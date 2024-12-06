import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/global";
import styled from "styled-components";
import { Sidebar } from "./Sidebar";
import { useState, useEffect } from "react";

export function Airing({ rendered }) {
  const { airingAnime, isSearch, searchResults } = useGlobalContext();
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

  const renderAnimeList = (animeList) => {
    return animeList?.map((anime) => (
      <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title || "Anime image"}
        />
      </Link>
    ));
  };

  const conditionalRender = () => {
    if (isSearch) {
      return renderAnimeList(searchResults);
    }
    if (rendered === "airing") {
      return renderAnimeList(airingAnime);
    }
    return null;
  };

  return (
    <AiringStyled>
      <div className="airing-anime">{conditionalRender()}</div>
      <Sidebar />
      {isVisible && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          ↑
        </div>
      )}
    </AiringStyled>
  );
}

const AiringStyled = styled.div`
  display: flex;

  .airing-anime {
    margin-top: 2rem;
    padding: 2rem 1rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 1rem;
    background-color: #141619;
    border-top: 5px solid #27ae60;

    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      padding: 2rem 0.5rem;
    }

    @media screen and (max-width: 480px) {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      padding: 1.5rem 0.5rem;
      grid-gap: 1.5rem;
    }

    a {
      height: 500px;
      border-radius: 7px;
      border: 5px solid #fff;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
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
        border-radius: 5px;
      }
    }
  }

  .scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: #4cd586;
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
    background-color: #27ae60;
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
