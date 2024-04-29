import Link from '../../../components/link';

export const metadata = {
  title: 'CV',
  alternates: {
    canonical: '/resume/fr'
  }
};

export default async function ResumeFr({}) {
  return (
    <p>
      🚧 En contruction, en attendant la version{' '}
      <Link href="/resume/en">Anglaise</Link> est disponible.
    </p>
  );
}
