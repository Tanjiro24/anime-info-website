import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        text-decoration: none;
        font-family: 'Inter', sans-serif;
    }
    
  @font-face {
    font-family: myfont;
    src: url(/cool.otf);
  }

    body{
        color: #6c7983;
        font-size: 1.2rem;
        &::-webkit-scrollbar{
            width: 7px;
        }
        &::-webkit-scrollbar-thumb{
            background-color: #27AE60;
            border-radius: 10px;
        }
        &::-webkit-scrollbar-track{
            background-color: #EDEDED;
        }
    }
    .loading-animation {
    font-size: 1.5rem;
    color: #555;
    /* You can use spinner styles or animation here */
  }

  .loading {
    display: flex; /* Centers the content horizontally and vertically */
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full height of the viewport */
    background-color: #111; /* Light background color for better visibility */
    overflow: hidden; /* Prevents scroll during loading */
}

.loading img {
    width: 100px; /* Default size for the loading image */
    height: auto; /* Maintains aspect ratio */
    animation: spin 1.5s linear infinite; /* Optional spinner animation */
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .loading img {
        width: 80px; /* Slightly smaller on smaller screens */
    }
}

@media (max-width: 480px) {
    .loading img {
        width: 60px; /* Smaller size for very small screens */
    }
}

/* Optional spinner effect */
/* @keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
} */

`;
