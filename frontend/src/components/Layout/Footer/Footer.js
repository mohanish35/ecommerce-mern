import React from "react"
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/appstore.png"
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App For Andoir and iOS</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="appstore" />
      </div>

      <div className="midFooter">
        <h1>Ecommerce</h1>
        <p>Quality is our priority</p>
        <p>Copyright 2022 &copy; Mohanish Mankar</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a target="_blank" href="https://github.com/mohanish35">
          GitHub
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/mohanish-mankar-695055140/"
        >
          LinkedIn
        </a>
        <a target="_blank" href="https://www.instagram.com/mohanish_96">
          Instagram
        </a>
      </div>
    </footer>
  )
}

export default Footer
