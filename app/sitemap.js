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
      url: `${baseUrl}/bio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${baseUrl}/content`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${baseUrl}/certifications`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${baseUrl}/resume/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${baseUrl}/resume/fr`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    }
  ];
  const contentPages = (await listContent({ parseFrontmatter: true })).map(
    ({ slug, last_update, date }) => ({
      url: `${baseUrl}/content/${slug}`,
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
