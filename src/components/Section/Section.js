import React from 'react';
import { renderRoutes } from 'react-router-config';
import { object } from 'prop-types';
import { Header, Footer } from '../index';
import withDevice from './withDevice';
import './section.scss';

export const Section = ({ route: { routes } }) => (
  <>
    <Header />
    <section className="section">{renderRoutes(routes)}</section>
    <Footer />
  </>
);

Section.propTypes = {
  route: object,
};

Section.defaultProps = {
  route: object,
};

export default withDevice(Section);
