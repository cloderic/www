import listContent from './content/utils/listContent';
import getBaseUrl from './getBaseUrl';

export default async function sitemap() {
  const baseUrl = getBaseUrl();
  const basePages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: new URL(`/bio`, baseUrl),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: new URL(`/content`, baseUrl),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: new URL(`/certifications`, baseUrl),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: new URL(`/resume/en`, baseUrl),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: new URL(`/resume/fr`, baseUrl),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    }
  ];
  const contentPages = (await listContent({ parseFrontmatter: true })).map(
    ({ slug, last_update, date }) => ({
      url: new URL(`/content/${slug}`, baseUrl),
      lastModified: last_update
        ? last_update.toJSDate()
        : date
        ? date.toJSDate()
        : new Date(),
      changeFrequency: 'yearly',
      priority: 1
    })
  );
  return [...basePages, ...contentPages];
}
