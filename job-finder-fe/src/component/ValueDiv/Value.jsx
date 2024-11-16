import React from "react";
import simple from "../../assets/card1.jpeg";
import simple2 from "../../assets/card2.png";
import simple3 from "../../assets/card3.png";
import "./Value.css";

const Value = () => {
  return (
    <div className="value-value">
    <div className="value-card-div">
        <div className="value-card-element1">
            <div className="value-card-element2">
                <div className="value-img-div">
                    <img src={simple} alt="" />
                </div>
                <span className="value-span-div">Simplicity</span>
            </div>
            <p className="value-desc">
                Things being made beautiful simple are at the heart of everything we do.
            </p>
        </div>
        <div className="value-card-element1">
            <div className="value-card-element2">
                <div className="value-img-div">
                    <img src={simple3} alt="" />
                </div>
                <span className="value-span-div">Simplicity</span>
            </div>
            <p className="value-desc">
                We believe in making things better for everyone, even if just by a little bit!
            </p>
        </div>
        <div className="value-card-element1">
            <div className="value-card-element2">
                <div className="value-img-div">
                    <img src={simple2} alt="" />
                </div>
                <span className="value-span-div">Simplicity</span>
            </div>
            <p className="value-desc">
                We work on the basis of creating trust, which can be nurtured through authenticity and transparency.
            </p>
        </div>
    </div>
    <div className="value-started">
        <div>
            <h1 className="value-h1tag">Ready to switch a Career</h1>
            <h2 className="value-h2tag">Let's get Started!</h2>
        </div>
        <button className="value-started-btn">Get Started</button>
    </div>
</div>

  );
};

export default Value;
