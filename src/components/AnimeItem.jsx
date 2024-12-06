import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

export function AnimeItem() {
  const { id } = useParams();

  // State
  const [anime, setAnime] = useState({});
  const [characters, setCharacters] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Destructure anime
  const {
    title,
    synopsis,
    trailer,
    duration,
    aired,
    season,
    images,
    rank,
    score,
    scored_by,
    popularity,
    status,
    rating,
    source,
  } = anime;

  // Scroll-to-top functionality
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

  // Fetch anime based on ID
  const getAnime = async (animeId) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
      const data = await response.json();
      setAnime(data.data);
    } catch (error) {
      console.error("Error fetching anime:", error);
    }
  };

  // Fetch characters
  const getCharacters = async (animeId) => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime/${animeId}/characters`
      );
      const data = await response.json();
      setCharacters(data.data);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  // Initial render
  useEffect(() => {
    getAnime(id);
    getCharacters(id);
  }, [id]);

  return (
    <AnimeItemStyled>
      <h1>{title}</h1>
      <div className="details">
        <div className="detail">
          <div className="image">
            <img src={images?.jpg.large_image_url} alt={title} />
          </div>
          <div className="anime-details">
            <p>
              <span>Aired:</span>
              <span>{aired?.string}</span>
            </p>
            <p>
              <span>Rating:</span>
              <span>{rating}</span>
            </p>
            <p>
              <span>Rank:</span>
              <span>{rank}</span>
            </p>
            <p>
              <span>Score:</span>
              <span>{score}</span>
            </p>
            <p>
              <span>Scored By:</span>
              <span>{scored_by}</span>
            </p>
            <p>
              <span>Popularity:</span>
              <span>{popularity}</span>
            </p>
            <p>
              <span>Status:</span>
              <span>{status}</span>
            </p>
            <p>
              <span>Source:</span>
              <span>{source}</span>
            </p>
            <p>
              <span>Season:</span>
              <span>{season}</span>
            </p>
            <p>
              <span>Duration:</span>
              <span>{duration}</span>
            </p>
          </div>
        </div>
        <p className="description">
          {showMore ? synopsis : synopsis?.substring(0, 450) + "..."}
          <button onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show Less" : "Read More"}
          </button>
        </p>
      </div>
      <h3 className="title">Trailer</h3>
      <div className="trailer-con">
        {trailer?.embed_url ? (
          <iframe
            src={trailer?.embed_url}
            title="Anime Trailer"
            width="800"
            height="450"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <h3>Trailer not available</h3>
        )}
      </div>
      <h3 className="title">Characters</h3>
      <div className="characters">
        {characters?.map((character, index) => {
          const { role } = character;
          const { images, name, mal_id } = character.character;
          return (
            <Link to={`/character/${mal_id}`} key={index}>
              <div className="character">
                <img src={images?.jpg.image_url} alt={name} />
                <h5>{name}</h5>
                <p>{role}</p>
              </div>
            </Link>
          );
        })}
      </div>
      {isVisible && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          ↑
        </div>
      )}
    </AnimeItemStyled>
  );
}

const AnimeItemStyled = styled.div`
  padding: 3rem 5rem; /* Reduced padding for smaller screens */
  background-color: #141619;

  h1 {
    display: inline-block;
    font-size: 3rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
    background: linear-gradient(to right, #a855f7, #27ae60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.4s ease-in-out;
    &:hover {
      transform: skew(-3deg);
    }
  }

  .title {
    display: inline-block;
    margin: 3rem 0;
    font-size: 2rem;
    cursor: pointer;
    background: linear-gradient(to right, #a855f7 23%, #27ae60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .description {
    margin-top: 2rem;
    color: #6c7983;
    line-height: 1.7rem;

    button {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 1.2rem;
      color: #27ae60;
      font-weight: 600;
    }
  }

  .trailer-con {
    display: flex;
    justify-content: center;
    align-items: center;

    iframe {
      outline: none;
      border: 5px solid #27ae60;
      padding: 1.5rem;
      border-radius: 10px;
      background-color: #2f2f33;
      max-width: 100%; /* Ensure responsiveness */
    }
  }

  .details {
    background-color: #2f2f33;
    border-radius: 20px;
    padding: 2rem;
    border: 5px solid #27ae60;

    .detail {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;

      img {
        border-radius: 7px;
        width: 100%; /* Ensure images fit their container */
      }
    }

    .anime-details {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        display: flex;
        gap: 1rem;
      }

      p span:first-child {
        font-weight: 600;
        color: #fff;
      }
    }
  }

  .characters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 2rem;
    background-color: #2f2f33;
    padding: 2rem;
    border-radius: 20px;
    border: 5px solid #27ae60;

    .character {
      padding: 0.4rem 0.6rem;
      border-radius: 7px;
      background-color: #141619;
      transition: all 0.4s ease-in-out;

      img {
        width: 100%;
      }

      h5 {
        padding: 0.5rem 0;
        color: #fff;
      }

      p {
        color: #27ae60;
      }

      &:hover {
        transform: translateY(-5px);
      }
    }
  }

  /* Responsive adjustments */
  @media (max-width: 1200px) {
    padding: 3rem 3rem;

    h1 {
      font-size: 2.5rem;
    }

    .title {
      font-size: 1.8rem;
    }

    .details {
      padding: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    padding: 2rem;

    h1 {
      font-size: 2rem;
    }

    .title {
      font-size: 1.5rem;
    }

    .characters {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
  }

  @media (max-width: 480px) {
    padding: 1.5rem;

    h1 {
      font-size: 1.5rem;
    }

    .title {
      font-size: 1.2rem;
    }

    .details {
      padding: 1rem;
    }

    .characters {
      grid-template-columns: 1fr;
    }
    .anime-details {
      gap: 10px;
    }
    .details .detail {
      display: block;
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
