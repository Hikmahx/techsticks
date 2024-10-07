import designResources from '../resources/design';
import aiResources from '../resources/ai';
import blogResources from '../resources/blog';

const ResourcesPage = () => {
  return (
    <div>
      <h1>Resources</h1>
      
      <h2>Design Resources</h2>
      {Object.keys(designResources).map((category) => (
        <div key={category}>
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <ul>
            {designResources[category].map((resource, index) => (
              <li key={index}>
                <a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.title}</a>
                <p>{resource.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
      
      <h2>AI Resources</h2>
      {Object.keys(aiResources).map((category) => (
        <div key={category}>
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <ul>
            {aiResources[category].map((resource, index) => (
              <li key={index}>
                <a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.title}</a>
                <p>{resource.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <h2>Blog Resources</h2>
      {Object.keys(blogResources).map((category) => (
        <div key={category}>
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <ul>
            {blogResources[category].map((resource, index) => (
              <li key={index}>
                <a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.title}</a>
                <p>{resource.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ResourcesPage;
