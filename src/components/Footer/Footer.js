import React, { Component } from 'react';
import { Container } from './../../elements';
import styles from './Footer.scss';

export default class Footer extends Component {
  render() {
    return (
      <div className={styles.footer}>
        <Container>
          {'Footer'}
        </Container>
      </div>
    );
  }
}
