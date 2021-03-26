import React from 'react';
import './footer.scss';
import ArrowDownIcon from '../../assets/icons/arrow_down.svg';

const Footer = () => (
  <div className="footer">
    <div className="footer__container">
      <div className="footer__icons">
        <ArrowDownIcon className="footer__svg-component" />
        <div className="footer__svg-bg" />
      </div>
      <div className="footer__large-svg" />
      <div>Footer</div>
    </div>
  </div>
);

export default Footer;
