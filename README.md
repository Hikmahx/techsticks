# Techsticks

![techstick logo](/public/logo-lg.svg)

Building tech knowledge, one stick at a time

## Table of Contents

- [Introduction](#introduction)
  - [Objectives](#objectives)
- [Features](#features)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
  - [Adding Resources](#adding-resources)
  - [Note](#note)
  - [Example](#example)
- [Tech Stack](#tech-stack)
- [Support](#support)
- [License](#license)

## Introduction

Tech Sticks is an open-source, collaborative tech resource platform where users can discover and contribute valuable resources across various fields, including design, AI, blogs, testing, accessibility, and more.

### Objectives

- Enable beginner-friendly/first-time contributions to an open-source project.
- Get resources on all aspects of tech.

## Features

- **Tech Resource Categories**: Explore curated resources across multiple fields such as:

  - **Design**: Fonts, icons, stock photos, tools, articles, tutorials, etc.
  - **AI**: AI tools, libraries, articles, and more.
  - **Blogs**: Discover the best blogs and articles in the tech industry.
  - **Communities & Tools**: Access resources to improve your development workflow.

(More categories to be included in the future.)

## Getting Started

To get started with Tech Sticks, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Hikmahx/techsticks.git
   ```
2. **Navigate into the project directory**:
   ```bash
   cd techsticks
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Open in browser**:
   Visit `http://localhost:3000` to view the site in your browser.

## How to Contribute

Here's how you can contribute:

1. **Fork the repository** on GitHub.
2. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes** and push to the branch:
   ```bash
   git commit -m "Add a new feature"
   git push origin feature/your-feature-title
   ```
4. **Open a Pull Request** and it will be reviewed.

### Adding Resources

- Make sure to add new resources in the appropriate `resources` file (e.g., `design.js`, `ai.js`).

```js
{
  title: "",            // Title of the resource
  link: "",             // URL to the resource
  description: "",      // Brief description of what the resource offers 
  imageUrl: "",         // A main image from the website (optional)
  dateAdded: "",        // Date when the resource was added (date string)
  level: "",            // Difficulty level ('any', 'beginner', 'intermediate', 'advanced')
  subsection: "",       // Subsection: Specific to each file (check file for available subsections)
  tags: [],             // Additional tags for categorization (optional, max 5)
}
```

### Note:

- Always check the comment at the top of each `.js` file you intend to contribute to for any additional information.
- You must choose from the predefined subsections & tags and can only add a new one if no suitable option exists.
- If you are adding more than one feature, add them all in a single pull request.
- You cannot add more than three features to a file in a single pull request.
- Make sure that none of the new resource objects you are adding are already included in any of the available files.
- If the resource you want to add fits into multiple categories, place it in the one with the highest priority and list the other applicable categories as tags. Ensure the tags are ordered by priority, from highest to lowest.

### Example

- **Branch**:

  - **Single Resource**:

    ```bash
    git checkout -b feature/add-tailwindcss
    ```

  - **Multiple Resources**:

    ```bash
    git checkout -b feature/add-tailwindcss-reactjs
    ```

- **Resource Object**:

  ```js
  const frameworks = [
  ...
   {
      title: "React",
      link: "https://reactjs.org/",
      description: "JavaScript library for building user interfaces.",
      imageUrl: "https://reactjs.org/logo-og.png",
      dateAdded: "2024-10-08",
      level: "beginner",
      subsection: "Frontend",
   },
   ...
  ]
  ```

## Tech Stack

Tech Sticks is built using the following technologies:

- [Next.js](https://nextjs.org/) - React framework for SSR and SSG
- [Tailwindcss](https://tailwindcss.com/) - Utility-first CSS framework
- [Typescript](https://www.typescript.org/) - A typed superset of JavaScript
- [shadcn/ui](https://ui.shadcn.com/) – Customizable UI components with Radix and Tailwind
- [Figma](https://www.figma.com) - UI design tool

## Support

Don't forget to star ⭐️ this repo.

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.
