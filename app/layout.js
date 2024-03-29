import 'highlight.js/styles/default.css';
import './globals.css';

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
      </body>
    </html>
  );
}
