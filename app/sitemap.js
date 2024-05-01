import listContent from './content/utils/listContent';
import getBaseUrl from './getBaseUrl';

const PRIORITY_MAIN_CONTENT = 1;
const PRIORITY_SECONDARY_CONTENT = 0.5;
const PRIORITY_HIDDEN_CONTENT = 0;

export default async function sitemap() {
  const baseUrl = getBaseUrl();
  const basePages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: PRIORITY_MAIN_CONTENT
    },
    {
      url: new URL(`/bio`, baseUrl),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: PRIORITY_MAIN_CONTENT
    },
    {
      url: new URL(`/content`, baseUrl),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: PRIORITY_SECONDARY_CONTENT
    },
    {
      url: new URL(`/resume/en`, baseUrl),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: PRIORITY_MAIN_CONTENT
    },
    {
      url: new URL(`/resume/fr`, baseUrl),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: PRIORITY_MAIN_CONTENT
    }
  ];
  const contentPages = (await listContent({ parseFrontmatter: true })).map(
    ({ slug, last_update, date, hidden = false }) => ({
      url: new URL(`/content/${slug}`, baseUrl),
      lastModified: last_update
        ? last_update.toJSDate()
        : date
        ? date.toJSDate()
        : new Date(),
      changeFrequency: 'yearly',
      priority: hidden ? PRIORITY_HIDDEN_CONTENT : PRIORITY_SECONDARY_CONTENT
    })
  );
  return [...basePages, ...contentPages];
}
