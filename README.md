# Open-Recipe: An Open Source Food Recipe File Format and API

Welcome to **Open-Recipe**, an open-source project for creating a standardized food recipe file format and associated APIs. 

This project includes a reference implementation that allows users to create, view recipes in a web browser, and fetch 
recipes via a REST API.

The [Open-Recipe OpenAPI document](open-recipe.yaml) can be viewed using the [online swagger editor](https://editor.swagger.io/?url=https://raw.githubusercontent.com/pbutland/open-recipe/refs/heads/main/open-recipe.yaml).

## Table of Contents
1. [Introduction](#introduction)
2. [Goals of the Project](#goals-of-the-project)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Testing](#testing)

## Introduction
**Open-Recipe** is designed to provide a unified way to manage and share recipes across different platforms and applications. 
The project consists of:
- A web-based interface for creating and viewing recipes.
- A RESTful API for fetching recipe data.
- A TypeScript-generated client library for interacting with the API.

## Philosophy

If you have ever found the perfect recipe online only to discover that all of the measurements are in imperial units and you want
to measure ingredients in metric, or visa versa, or you want the measurements to be in cups, then this may be the file format for you.
Alternatively, have you ever found the perfect recipe but it's for 12 servings and you only want to make it for 2?  Or perhaps you want to scale it up for a large dinner party.
Or maybe you have found the ideal recipe and you want to create a shopping list from it, but while there is a link to click which adds all of the ingredients to the shopping cart of a store,
it's not a store that is local to you or that you wish to use.

The internet is littered with conversion tools to convert one measurement unit into another, so it is clearly something that is in high demand.
But there is nothing out there with this already baked into the recipe so that it can be easily done in just one place and at the click of a button.

Of course, there are some websites out there which do have some, or all, of these capabilities,
but it is not ubiquitous and may not be available for that one perfect recipe that you want to use.
Simple!  Convert the recipe into the Open Recipe format and you will always have that perfect recipe and be able to adpat it however you wish and create a shopping list from it.

## Goals of the Project

* **Standardize Recipe Format**: Define a common format for storing and sharing recipes.  The format should be self-contained and support the following:
  * Scaling the number of servings of a recipe up or down
  * Measurement conversions to metric, imperial, and cup systems of measurement
  * Storing specific product information for ingredients, such as brands
  * Allow for filtering/searching recipes based on certain classifications (e.g. difficulty, meal type, cooking time, cuisine, food types such as vegan, vegetarian, and/or allergies)
* **Reference Implementation**: Provide a practical example of how to create, view, and interact with recipe data 
using web technologies.
* **Conversion tools**: Provide tools to convert recipes from common online websites into the Open Recipe format
* **Shopping tool**: Provide a tool that generates a shopping list from a recipe, or list of recipes, in the Open Recipe format and adds those ingredients to a shopping cart of your chosen online store.

## Requirements
To run this project, you will need the following tools installed on your machine:
- Node.js (version 16 or higher)
- Yarn Package Manager (version 4.6.0 or higher)

Additionally, you may want to have the following development tools for testing and debugging:
- A text editor with TypeScript support (e.g., Visual Studio Code)
- Browser developer tools

## Installation
### Cloning the Repository
First, clone the repository from GitHub:

```sh
git clone https://github.com/your-repo/open-recipe.git
cd open-recipe
```

### Installing Dependencies
Install all project dependencies using Yarn:

```sh
yarn install
```

## Usage
### Starting the Development Server
To start the development server, run:

```sh
yarn start
```

This command will start a local development server on `http://localhost:3000`, where you can interact with the recipe 
application.

### Building for Production
To build the project for production, run:

```sh
yarn build
```

This command will create an optimized build in the `build` directory, which can be deployed to a web server.

## Testing
**Open-Recipe** includes both unit tests and functional tests. You can run these tests using Yarn:

### Running Unit Tests
To run all tests, execute:

```sh
yarn test
```

To run unit tests separetely, execute:

```sh
yarn test:unit
```

This command will use Jest to run all unit tests located in the `__tests__/` directory with a `.test.ts` extension.

### Running Functional Tests
To run functional tests separately, execute:

```sh
yarn test:functional
```

Functional tests are designed to interact with the actual API endpoints and verify their behavior. These tests utilize 
Selenium WebDriver for browser automation.

### Using Test Frameworks and Libraries
- **Jest**: A JavaScript Testing Framework for running unit and integration tests.
- **Chromedriver**: WebDriver for Google Chrome, used in functional testing.
- **Selenium Webdriver**: A library for automating web browsers, enabling functional test execution.
- **@testing-library/react**: React-specific utilities to facilitate writing tests.

## Utilities

Execute the following command to extract products from recipes:

```
jq -n '[inputs | .ingredientsGroups[] | .ingredients[] | .product]' ./recipes/*.json
```

## Contributing
Contributions are welcome! If you find a bug or have an enhancement request, please open an issue on the GitHub repository. 
