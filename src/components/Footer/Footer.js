import React from 'react';
import './footer.scss';
import ArrowDownIcon from '../../assets/icons/arrow_down.svg';

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__icons">
        <ArrowDownIcon className="footer__svg-component" />
        <div className="footer__svg-bg" />
      </div>
      <div>Footer</div>
    </div>
  </footer>
);

export default Footer;
