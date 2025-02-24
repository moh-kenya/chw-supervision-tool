'use client';

import { type ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './landing.module.css';
import { CoatOfArms } from './components/Logo';

export default function Home(): ReactElement {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image
            src={CoatOfArms}
            alt="Coat of Arms"
            width={60}
            height={60}
            priority
          />
        </div>
        <nav className={styles.nav}>
          <Link href="/login" className={styles.loginButton}>
            Login
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Ministry of Health Kenya
            <span className={styles.highlight}>Integrated Supervision Tool</span>
          </h1>
          <p className={styles.description}>
            Empowering community health workers through effective supervision and support
          </p>
          <Link href="/login" className={styles.ctaButton}>
            Get Started
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p> {new Date().getFullYear()} Ministry of Health Kenya. All rights reserved.</p>
      </footer>
    </div>
  );
}
