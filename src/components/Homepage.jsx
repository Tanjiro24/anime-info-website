import { useState } from "react";
import { useGlobalContext } from "../context/global";
import { Popular } from "./Popular";
import { Upcoming } from "./Upcoming";
import { Airing } from "./Airing";
import styled from "styled-components";
import Loading from "../assets/loading.gif";

export function Homepage() {
  const {
    loading,
    handleSubmit,
    search,
    handleChange,
    getUpcomingAnime,
    getAiringAnime,
    getPopularAnime,
  } = useGlobalContext();

  const [rendered, setRendered] = useState("popular");

  // Fetch data when switching filters
  const handleFilterClick = (filter) => {
    setRendered(filter); // Update the state for rendering
    if (filter === "popular") getPopularAnime();
    if (filter === "airing") getAiringAnime();
    if (filter === "upcoming") getUpcomingAnime();
    handleChange({ target: { value: "" } }); // Clear the search input
  };

  const switchComponent = () => {
    switch (rendered) {
      case "popular":
        return <Popular rendered={rendered} />;
      case "airing":
        return <Airing rendered={rendered} />;
      case "upcoming":
        return <Upcoming rendered={rendered} />;
      default:
        return <Popular rendered={rendered} />;
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <img src={Loading} alt="Loading" />
      </div>
    );
  }

  return (
    <HomepageStyled>
      <header>
        <div className="logo">
          <h1>
            {rendered === "popular"
              ? "Popular Anime"
              : rendered === "airing"
              ? "Airing Anime"
              : "Upcoming Anime"}
          </h1>
        </div>
        <div className="search-container">
          <div className="filter-btn popular-filter">
            <button onClick={() => handleFilterClick("popular")}>
              Popular <i className="fas fa-fire"></i>
            </button>
          </div>
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="input-control">
              <input
                type="text"
                placeholder="Search Anime"
                value={search}
                onChange={handleChange}
              />
              <button type="submit">Search</button>
            </div>
          </form>
          <div className="filter-btn airing-filter">
            <button onClick={() => handleFilterClick("airing")}>
              Airing
            </button>
          </div>
          <div className="filter-btn upcoming-filter">
            <button onClick={() => handleFilterClick("upcoming")}>
              Upcoming
            </button>
          </div>
        </div>
      </header>
      {switchComponent()}
    </HomepageStyled>
  );
}

const HomepageStyled = styled.div`
  background-color: #141619;

  header {
    padding: 2rem 3rem;
    width: 60%;
    margin: 0 auto;
    transition: all 0.4s ease-in-out;

    @media screen and (max-width: 1530px) {
      width: 90%;
    }

    @media screen and (max-width: 768px) {
      width: 100%;
      padding: 1.5rem 2rem;
    }

    .logo {
      margin-bottom: 2rem;
      text-align: center;

      h1 {
        font-size: 3.5rem;
        font-family: myfont;
        background: linear-gradient(to right, #27ae60, #a855f7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        @media screen and (max-width: 768px) {
          font-size: 3rem;
        }

        @media screen and (max-width: 480px) {
          font-size: 2.5rem;
        }
      }
    }

    .search-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      @media screen and (max-width: 768px) {
        flex-direction: column;
        gap: 0.5rem;
      }
      
      @media screen and (max-width: 835px) {
        flex-direction: column;
        gap: 0.5rem;
      }

      button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.7rem 1.5rem;
        outline: none;
        border-radius: 30px;
        font-size: 1.2rem;
        background-color: #fff;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        font-family: inherit;
        border: 5px solid #e5e7eb;

        &:hover {
          background-color: #27ae60;
          color: #fff;
        }

        @media screen and (max-width: 768px) {
          padding: 0.5rem 1rem;
          font-size: 1rem;
        }
      }

      form {
        position: relative;
        width: 100%;

        .input-control {
          position: relative;
          transition: all 0.4s ease-in-out;

          input {
            width: 100%;
            padding: 0.7rem 1rem;
            border: none;
            outline: none;
            border-radius: 30px;
            font-size: 1.2rem;
            background-color: #fff;
            border: 5px solid #e5e7eb;
            transition: all 0.4s ease-in-out;

            @media screen and (max-width: 768px) {
              padding: 0.5rem 0.8rem;
              font-size: 1rem;
            }
          }
          button {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            padding: 0.7rem 1.2rem;
            border-radius: 0 30px 30px 0;
            background-color: #27ae60;
            color: #fff;
            border: none;
            cursor: pointer;
            transition: all 0.4s ease-in-out;

            &:hover {
              background-color: #a855f7;
            }

            @media screen and (max-width: 768px) {
              padding: 0.5rem 1rem;
            }
          }
        }
      }
    }
  }
`;
