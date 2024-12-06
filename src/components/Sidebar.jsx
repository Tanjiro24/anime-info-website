import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context/global";

export function Sidebar() {
  const { popularAnime } = useGlobalContext();

  const sorted = popularAnime?.sort((a, b) => {
    return b.score - a.score;
  });

  return (
    <SidebarStyled>
      <h3>Top 5 Popular</h3>
      <div className="anime">
        {sorted?.slice(0, 5).map((anime) => {
          return (
            <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
              <img src={anime.images.jpg.large_image_url} alt="" />
              <h4>{anime.title}</h4>
            </Link>
          );
        })}
      </div>
    </SidebarStyled>
  );
}

const SidebarStyled = styled.div`
  margin-top: 2rem;
  background-color: #141619;
  border-top: 5px solid #27ae60;
  padding: 2rem;

  @media screen and (max-width: 768px) {
    padding: 2rem 1rem;
  }

  @media screen and (max-width: 480px) {
    padding: 1rem 0.5rem;
  }

  .anime {
    display: flex;
    flex-direction: column;
    width: 150px;

    @media screen and (max-width: 768px) {
      width: 120px;
    }

    @media screen and (max-width: 480px) {
      width: 100px;
    }

    img {
      width: 100%;
      border-radius: 5px;
      border: 5px solid #27ae60;
    }

    a {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      color: #fff;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      h4 {
        font-size: 1.1rem;

        @media screen and (max-width: 768px) {
          font-size: 1rem;
        }

        @media screen and (max-width: 480px) {
          font-size: 0.9rem;
        }
      }
    }

    a:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }
  }
`;
