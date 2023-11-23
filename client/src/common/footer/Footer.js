import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container-footer">
          <div className="back-home">
            <h3>Second hand bargains</h3>
            <div className="link">
              <Link>Page d'accueil</Link>
              <Link>Aller en haut</Link>
            </div>
          </div>
          <div className="about-contact-us">
            <div className="box">
              <h3>À propos de nous</h3>
              <div className="link">
                <Link>Notre application</Link>
                <Link>Termes et conditions</Link>
                <Link>Politique de confidentialité</Link>
              </div>
            </div>

            <div className="box">
              <h3>Nous contacter</h3>
              <ul>
                <li>2 Résidence Du Val, 91120 PALAISEAU</li>
                <li>Email: htran@gmail.com</li>
                <li>Phone: +33 1123 456 780</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
