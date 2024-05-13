import './globals.css';
import Link from '../components/link';
import getBaseUrl from './getBaseUrl';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Urbanist } from 'next/font/google';

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist'
});

export const metadata = {
  metadataBase: getBaseUrl(),
  title: {
    template: '%s | cloderic.com',
    default: 'cloderic.com | Professional AI builder, amateur musician' // a default is required when creating a template
  },
  description: `Clodéric Mars is an AI Product Engineer and Tech Leader with a strong focus on building AIs that work alongside humans, outside of work he's also playing music`,
  authors: [{ name: 'Clodéric Mars' }],
  siteUrl: 'https://www.cloderic.com',
  keywords: ['ai', 'tech', 'public speaking', 'human-ai collaboration'],
  twitter: {
    site: '@cloderic',
    creator: '@cloderic'
  },
  alternates: {
    canonical: '/'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body>
        <div className="bg-white/30 mx-auto my-0 px-2 py-4 md:px-8 md:py-8 w-fit min-h-screen drop-shadow-2xl print:drop-shadow-none backdrop-blur-sm">
          {children}
        </div>
        <footer className="mt-6 mb-2 text-center text-xs text-slate-500 print:hidden">
          <p>
            The content on this website, of which Clodéric Mars is the author,
            is licensed under a{' '}
            <Link
              href="https://creativecommons.org/licenses/by/4.0/"
              className="text-xs text-slate-600"
            >
              Creative Commons Attribution 4.0 International license
            </Link>
            .
          </p>
          <p>
            The sources of this website, of which Clodéric Mars is the author,
            are licensed under a{' '}
            <Link
              href="https://choosealicense.com/licenses/mit/"
              className="text-xs text-slate-600"
            >
              MIT License
            </Link>{' '}
            and are available on{' '}
            <Link
              href="https://github.com/cloderic/www"
              className="text-xs text-slate-600"
            >
              Github
            </Link>
            .
          </p>
        </footer>
      </body>
      {process.env.GA_ID != null ? (
        <GoogleAnalytics gaId={process.env.GA_ID} />
      ) : null}
    </html>
  );
}
