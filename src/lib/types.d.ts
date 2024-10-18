export interface Resource {
    slug: string;
    name: string;
    icon?: string;
    resources: ResourceItem[];
  }
  
  export interface ResourceItem {
    title: string;
    link: string;
    description: string;
    imageUrl?: string;
    dateAdded: string;
    level: string;
    subsection: string;
    tags: string[];
  }