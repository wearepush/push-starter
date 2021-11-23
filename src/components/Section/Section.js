import React from 'react';
import { useOutlet } from 'react-router-dom';
import { Header, Footer } from '../index';
import withDevice from './withDevice';
import './section.scss';

export const Section = () => {
  const outlet = useOutlet();
  return (
    <>
      <Header />
      <section className="section">{outlet}</section>
      <Footer />
    </>
  );
};

Section.propTypes = {};

Section.defaultProps = {};

export default withDevice(Section);
