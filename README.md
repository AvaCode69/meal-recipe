# The Meal recipe

The Meal recipe is a **Responsive** web application for searching food recipes.

I recently completed a brief assessment project for a company. While I didn't invest lots of time into it, I'm aware there's room for improvement. The company requested that I utilize state management using Pinia and the Composition API in Vue.js. Additionally, They asked me not to use pre-made CSS designs but to create my own custom styles and They also didn't provide any UX design or layers (such as Figma or PSD or ... files ).

I've also written some unit tests by jest for certain components that you can review.

I'm happy to chat more during an interview. We can talk about how I can make the project even better and fix any areas that need improvement.

The most important features of the app are the search capability by:

- Meal name
- Ingredients

It also shows the list of **categories** and **areas** in the side-bar for easy access. :

- Meal Category: Easily browse meals by categories like breakfast, chicken , dessert .

- Meal Area (Country): Discover diverse culinary experiences by exploring meals from different regions and countries .

## Demo

https://the-meals-recipe.netlify.app

## Install the application

```sh
npm install
```

### Compile and Start the application for development environment

```sh
npm run dev
```

### Running tests

```sh
npm run test:unit
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Architecture

### Folder structure

**src** - Contains the source code for the project, it consist of the following sub-folders:
**assets**: Images and css files.
**components**: The definitions of the reusable components in the project.
**pages**: The project pages.
**router**: The single page that handles multiple routes.
**utils**: API calls and related configurations.
**store**: Implementation for state management.
**composables**:stores reusable logic written using the Composition API, making it easier to organize and reuse complex logic across components.
**types**: Types/models that are used in the project.
**views**: The project pages.

### Framework and Libraries

    - Vue 3
    - VueRouter
    - Typescript
    - Pinia
    - Composition API
    - component style
    - Jest
    - Eslint
    - Prettier
