// import { Resource } from './types';
import accessibility from './accessibility';
import ai from './ai';
import blog from './blog';
import community from './community';
import design from './design';
import testing from './testing';
import webDevelopment from './web-development';

function generateSlug(name){
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
].map(resource => ({
  ...resource,
  slug: generateSlug(resource.name),
}));

export function getAllResources() {
  return resourcesWithSlugs;
}

export default resourcesWithSlugs;