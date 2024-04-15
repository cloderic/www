import 'highlight.js/styles/default.css';
import './globals.css';
import Link from '../components/link';

export const metadata = {
  title: {
    template: '%s | cloderic.com',
    default: 'cloderic.com' // a default is required when creating a template
  },
  description: `Clodéric Mars - AI Product Engineer, Tech Leader, Public Speaker, humming from Paris`,
  authors: [{ name: 'Clodéric Mars' }],
  siteUrl: 'https://www.cloderic.com',
  keywords: ['ai', 'tech', 'public speaking']
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-white/30 mx-auto my-0 px-16 py-8 w-fit min-h-screen drop-shadow-2xl backdrop-blur-sm">
          <div className="max-w-prose">{children}</div>
        </div>
        <footer className="mt-6 mb-2 text-center text-xs text-slate-500">
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
    </html>
  );
}
