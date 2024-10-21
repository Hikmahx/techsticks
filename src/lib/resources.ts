import accessibility from '@/resources/accessibility';
import ai from '@/resources/ai';
import blog from '@/resources/blog';
import community from '@/resources/community';
import design from '@/resources/design';
import testing from '@/resources/testing';
import webDevelopment from '@/resources/web-development';
import { Resource } from './types';

export function generateSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

const resourcesWithSlugs = [
  accessibility,
  ai,
  blog,
  community,
  design,
  testing,
  webDevelopment,
].map((resource) => ({
  ...resource,
  slug: generateSlug(resource.name),
}));

export function getAllResources() {
  return resourcesWithSlugs;
}

// Filter resources based on search, tags, sortBy, and level
export function filterResources(
  {
    search = '',
    tags = [],
    sortBy = 'title',
    level = '',
  }: {
    search?: string;
    tags?: string[];
    sortBy?: 'title' | 'date';
    level?: string;
  },
  resourcesList: Resource[] = getAllResources()
) {
  let filteredResources = resourcesList;

  if (search) {
    filteredResources = filteredResources
      .map((section) => ({
        ...section,
        resources: section.resources.filter((resource) =>
          resource.title.toLowerCase().includes(search.toLowerCase())
        ),
      }))
      .filter((section) => section.resources.length > 0); 
  }

  // Tags filter (resources should have all tags in the list)
  if (tags.length > 0) {
    console.log('>');
    filteredResources = filteredResources
      .map((section) => ({
        ...section,
        resources: section.resources.filter((resource) =>
          tags.every((tag) => resource.tags.includes(tag))
        ),
      }))
      .filter((section) => section.resources.length > 0);
  }

  // Level filter
  if (level) {
    filteredResources = filteredResources
      .map((section) => ({
        ...section,
        resources: section.resources.filter(
          (resource) => resource.level.toLowerCase() === level.toLowerCase()
        ),
      }))
      .filter((section) => section.resources.length > 0);
  }

  // Sort by title/date
  if (sortBy === 'title') {
    filteredResources = filteredResources.map((section) => ({
      ...section,
      resources: section.resources.sort((a, b) =>
        a.title.localeCompare(b.title)
      ),
    }));
  } else if (sortBy === 'date') {
    filteredResources = filteredResources.map((section) => ({
      ...section,
      resources: section.resources.sort(
        (a, b) =>
          new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
      ),
    }));
  }

  return filteredResources;
}

// Query string for filters
export function createFilterQueryString({
  search = '',
  tags = [],
  sortBy = 'title',
  level = '',
}: {
  search?: string;
  tags?: string[];
  sortBy?: 'title' | 'date';
  level?: string;
}) {
  const query = new URLSearchParams();

  if (search) query.set('search', search);
  if (tags.length > 0) query.set('tags', tags.join(','));
  if (sortBy) query.set('sortBy', sortBy);
  if (level) query.set('level', level);

  return query.toString();
}
