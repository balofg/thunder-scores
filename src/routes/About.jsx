import * as React from "react";

const AboutRoute = () => (
  <div className="section">
    <div className="container">
      <div className="title">About</div>

      <div className="content">
        <p>
          Made by Barney to let his friends drunkenly play cards, lifting from
          them the burden of the complex calculations needed for the spectacular
          game of <strong>Thunder</strong>.
        </p>

        <p>Also, for statistics and stuff.</p>

        <a className="button" href="#/">
          <span className="icon">
            <i className="fas fa-arrow-left" />
          </span>
          <span>Back</span>
        </a>
      </div>
    </div>
  </div>
);

export default AboutRoute;
