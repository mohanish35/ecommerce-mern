import React from "react"
import "./About.css"
import { Button, Typography, Avatar } from "@material-ui/core"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import InstagramIcon from "@mui/icons-material/Instagram"

const About = () => {
  const visitLinkedIn = () => {
    window.location = "https://www.linkedin.com/in/mohanish-mankar-695055140/"
  }
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://media-exp1.licdn.com/dms/image/C4E03AQEkZs_VdUMr3w/profile-displayphoto-shrink_800_800/0/1594814518067?e=1675296000&v=beta&t=FhekeoKw4K64DQxcFEFbPRFl3qeFbp3eEOuiaIDrMGA"
              alt="Founder"
            />
            <Typography>Mohanish Mankar</Typography>
            <Button onClick={visitLinkedIn} color="primary">
              Visit LinkedIn
            </Button>
            <span>This is a sample wesbite made by Mohanish Mankar.</span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.linkedin.com/in/mohanish-mankar-695055140/"
              target="blank"
            >
              <LinkedInIcon className="linkedinSvgIcon" />
            </a>

            <a href="https://instagram.com/mohanish_96" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
