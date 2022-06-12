import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

library.add(faHeart);

function Footer() {
  return (
    <div
      style={{
        height: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
        backgroundColor: "black",
      }}
    >
      <p style={{ color: "rgb(37, 141, 252)" }}> BlindSide Project </p>
    </div>
  );
}

export default Footer;
