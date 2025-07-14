import Link from 'next/link';
import css from "./Home.module.css"
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  description:
    "The page you're looking for doesn't exist",
  openGraph: {
    title: 'Page not found',
    description:
      "The page you're looking for doesn't exist",
    images: [
      {
        url: '/not-found.jpeg',
        width: 1200,
        height: 630,
        alt: 'page not found',
      },
    ],
    // url: 'https://08-zustand-zeta.vercel.app/not-found',
  },
};

export default function NotFound() {
  return (
    <div>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        <Link href="/">Go back home</Link>
    </div>
  );
};

