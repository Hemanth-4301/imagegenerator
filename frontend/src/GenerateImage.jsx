import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import 

function GenerateImage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]); // State for search history

  const doRefresh = () => {
    window.location.reload();
  };

  const generateImage = async (searchPrompt) => {
    setLoading(true); // Start loading
    try {
      const currentPrompt = searchPrompt || prompt;
      const response = await axios.post(
        "https://imagegenerator-whou.onrender.com/",
        // "http://localhost:5000/generate-image",
        {
          prompt: currentPrompt,
        }
      );
      setImageUrl(response.data.imageUrl);

      if (!searchPrompt) {
        setHistory([...history, currentPrompt]); // Add to history only if it's a new prompt
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert(error);
    } finally {
      setLoading(false); // Stop loading after the request finishes
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          padding: "10px",
          marginTop: "0",
          fontFamily: "serif",
          textWrap: "wrap",
          overflow: "hidden",
        }}
      >
        <button class="button" data-text="Awesome">
          <span class="actual-text">&nbsp;Image&nbsp;Generator&nbsp;</span>
          <span aria-hidden="true" class="hover-text">
            &nbsp;Image&nbsp;Generator&nbsp;
          </span>
        </button>
      </h1>

      <textarea
        style={{
          height: "10rem",
          lineHeight: "1.5rem",
          margin: "0 2rem",
          borderRadius: "10px",
          paddingLeft: "10px",
          paddingTop: "10px",
          fontFamily: "monospace",
          fontSize: "1.1rem",
        }}
        type="text"
        placeholder="Enter a description"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button
          onClick={doRefresh}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "2px solid black",
          }}
        >
          Clear all
        </button>
        <button
          onClick={() => generateImage()}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "2px solid black",
          }}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </div>

      {loading && (
        /* From Uiverse.io by gustavofusco */
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="200px"
            width="200px"
            viewBox="0 0 200 200"
            class="pencil"
          >
            <defs>
              <clipPath id="pencil-eraser">
                <rect height="30" width="30" ry="5" rx="5"></rect>
              </clipPath>
            </defs>
            <circle
              transform="rotate(-113,100,100)"
              stroke-linecap="round"
              stroke-dashoffset="439.82"
              stroke-dasharray="439.82 439.82"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              r="70"
              class="pencil__stroke"
            ></circle>
            <g transform="translate(100,100)" class="pencil__rotate">
              <g fill="none">
                <circle
                  transform="rotate(-90)"
                  stroke-dashoffset="402"
                  stroke-dasharray="402.12 402.12"
                  stroke-width="30"
                  stroke="hsl(223,90%,50%)"
                  r="64"
                  class="pencil__body1"
                ></circle>
                <circle
                  transform="rotate(-90)"
                  stroke-dashoffset="465"
                  stroke-dasharray="464.96 464.96"
                  stroke-width="10"
                  stroke="hsl(223,90%,60%)"
                  r="74"
                  class="pencil__body2"
                ></circle>
                <circle
                  transform="rotate(-90)"
                  stroke-dashoffset="339"
                  stroke-dasharray="339.29 339.29"
                  stroke-width="10"
                  stroke="hsl(223,90%,40%)"
                  r="54"
                  class="pencil__body3"
                ></circle>
              </g>
              <g transform="rotate(-90) translate(49,0)" class="pencil__eraser">
                <g class="pencil__eraser-skew">
                  <rect
                    height="30"
                    width="30"
                    ry="5"
                    rx="5"
                    fill="hsl(223,90%,70%)"
                  ></rect>
                  <rect
                    clip-path="url(#pencil-eraser)"
                    height="30"
                    width="5"
                    fill="hsl(223,90%,60%)"
                  ></rect>
                  <rect height="20" width="30" fill="hsl(223,10%,90%)"></rect>
                  <rect height="20" width="15" fill="hsl(223,10%,70%)"></rect>
                  <rect height="20" width="5" fill="hsl(223,10%,80%)"></rect>
                  <rect
                    height="2"
                    width="30"
                    y="6"
                    fill="hsla(223,10%,10%,0.2)"
                  ></rect>
                  <rect
                    height="2"
                    width="30"
                    y="13"
                    fill="hsla(223,10%,10%,0.2)"
                  ></rect>
                </g>
              </g>
              <g
                transform="rotate(-90) translate(49,-30)"
                class="pencil__point"
              >
                <polygon
                  points="15 0,30 30,0 30"
                  fill="hsl(33,90%,70%)"
                ></polygon>
                <polygon
                  points="15 0,6 30,0 30"
                  fill="hsl(33,90%,50%)"
                ></polygon>
                <polygon
                  points="15 0,20 10,10 10"
                  fill="hsl(223,10%,10%)"
                ></polygon>
              </g>
            </g>
          </svg>
        </div>
      )}

      {imageUrl && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "2rem 0",
          }}
        >
          <img
            src={imageUrl}
            alt="Generated AI"
            style={{
              width: "500px",
              height: "500px",
              borderRadius: "10px",
              border: "2px solid black",
            }}
          />
        </div>
      )}

      {/* Display Search History */}
      {history.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "2rem",
          }}
        >
          <h3 style={{ textAlign: "center" }}>Search History</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {history.map((item, index) => (
              <li
                key={index}
                onClick={() => generateImage(item)} // Click to regenerate image
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "blue",
                  margin: "5px 0",
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GenerateImage;
