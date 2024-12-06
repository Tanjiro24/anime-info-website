import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context/global";

export function Gallery() {
  const { getAnimePictures, pictures } = useGlobalContext();
  const { id } = useParams();

  // State for selected image index
  const [index, setIndex] = useState(0);

  // Handle image selection
  const handleImageClick = (i) => {
    setIndex(i);
  };

  // Fetch pictures on component mount or ID change
  useEffect(() => {
    getAnimePictures(id);
  }, []);

  return (
    <GalleryStyled>
      <div className="back">
        <Link to="/">
          <i className="fas fa-arrow-left"></i>
          Back to Home
        </Link>
      </div>
      <div className="big-image">
        <img
          src={pictures[index]?.jpg.image_url}
          alt={`Anime picture ${index + 1}`}
        />
      </div>
      <div className="small-images">
        {pictures?.map((picture, i) => (
          <div
            className="image-con"
            onClick={() => handleImageClick(i)}
            key={i}
          >
            <img
              src={picture?.jpg.image_url}
              alt={`Thumbnail ${i + 1}`}
              style={{
                border: i === index ? "3px solid #27AE60" : "3px solid #e5e7eb",
                filter: i === index ? "grayscale(0)" : "grayscale(60%)",
                transform: i === index ? "scale(1.1)" : "scale(1)",
                transition: "all 0.3s ease-in-out",
              }}
            />
          </div>
        ))}
      </div>
    </GalleryStyled>
  );
}

const GalleryStyled = styled.div`
  background-color: #141619;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .back {
    position: absolute;
    top: 2rem;
    left: 2rem;
    @media screen and (max-width: 768px) {
      top: 0.4rem;
      left: 3rem;
    }
    @media screen and (max-width: 480px) {
      top: 0.5rem;
      left: 1rem;
    }

    a {
      font-weight: 600;
      text-decoration: none;
      color: #eb5757;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      @media screen and (max-width: 480px) {
        font-size: 0.9rem;
      }
    }
  }

  .big-image {
    display: inline-block;
    padding: 2rem;
    margin: 2rem 0;
    background-color: #2f2f33;
    border-radius: 7px;
    border: 5px solid #27ae60;

    img {
      width: 350px;
      max-width: 100%;

      @media screen and (max-width: 768px) {
        width: 300px;
      }

      @media screen and (max-width: 480px) {
        width: 100%;
      }
    }
  }

  .small-images {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    width: 80%;
    padding: 2rem;
    border-radius: 7px;
    background-color: #2f2f33;
    border: 5px solid #27ae60;

    @media screen and (max-width: 768px) {
      width: 90%;
      padding: 1.5rem;
    }

    img {
      width: 6rem;
      height: 6rem;
      object-fit: cover;
      cursor: pointer;
      border-radius: 5px;

      @media screen and (max-width: 480px) {
        width: 4rem;
        height: 4rem;
      }
    }
  }
`;
