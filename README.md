# Blue Bite Completed Task

## Assessment Notes and Misses

- The assessment was done in typescript, but due to setting a time limit for myself, I was unable to go back and type every single parameter. There are notes within the code to address these as would be in a real world work environment.
- I decided not to use redux as this was a small project so saving data to a store didn't seem really necessary. If we were to scale this project, this would be a discussion between teammates between pros and cons.
- Due to a time limit I set for myself, the Dashboard component/page is a fairly complex component. Given this, I would have definitely created a test around this component to ensure that everything is working as expected. Making at least 3 different tests based on the acceptance criteria of the 3 different scenarios.
- My current preference of styling is using tailwind, I tried to set that up in this app but was unable to get it working. Due to my time limit I set myself, I ended up styling everything via object properties on the components. Tailwind allows you to see exactly how the component is being styled via class names when you look at the component, so going back and updating the components with tailwind is fairly quick and straightforward once the set up of Tailwind would be complete.
- I used an axios shared util to make the API calls, nothing crazy here.

## Local Setup

1. Clone repository into your GitHub account
2. Install Node version specified in `.nvmrc`
3. Use Yarn or NPM to install dependencies
4. Use 2 terminal sessions to start both the development server and the API via:
   a. `yarn run start` OR `npm run start`
   b. `yarn run start-server` OR `npm run start-server`
5. Read requiremnents on how the app should function

### Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn start-server`

Runs API by default this is hosted at http://localhost:3030

### API

All responses return either a `data` property containing responses contents in the case of an `ok` response. Alternatively it may return an `error` property.

### GET /page/:id

Returns a description of the page. Containing several parts:

```
    {
        lists: Array<{
            id, // ID used to look up the list
            components, // Ordered list of component ids
        }>;
        components: Array<{
            id, // ID used to look up component
            type, // The type of the component (ex: `image`, `weather`)
            options, // An object with options specific to the component type
        }>;
        variables?: Array<{
            name, // Variable name
            type, // Variable type (ex: `string`)
            initialValue, // Value the variable starts at
        }> // optional not used on page-one. Should be page specific.
    }
```

### GET /integration/weather?lat=<lat>&lon=<lon>

Returns weather information for specific coordinates used in pages.

## Requirements

### Part 1

- Create image component
- Create weather component
- Render components on page

#### Notes

- Use the id (found in the pages path) via API to look up the Page entity mentioned in introduction.
- Cross referencing the Page entity and the mockups to create the `image` and `weather` components. The weather component will also require use of it's own API route described above in the introduction section.
- Using these components and the Page entity to render the page. You can assume the list with id 0 will always be the pages root.

#### Mockups

- [Part 1](https://www.figma.com/proto/9NtrKC7KAudIqARPU4OzfL/Front-End-Assessment?page-id=0%3A1&node-id=40%3A16&viewport=241%2C48%2C0.73&scaling=scale-down&starting-point-node-id=40%3A16&show-proto-sidebar=1)

### Part 2

- Create Button Component
- Create Condition Component
- Setup Variables

#### Notes

This page additionally includes variables, as well as 2 new components: button, and condition.

- Variables are set to their initial values when the page is loaded.
- Buttons when clicked change a variables current value.
- Conditions are components that render their `children` list when a specific variable is equal to the given value.

On completion this page will look like the mockups and the show and hide buttons should function.

#### Mockups

- [Part 2](https://www.figma.com/proto/9NtrKC7KAudIqARPU4OzfL/Front-End-Assessment?page-id=0%3A1&node-id=78%3A48&viewport=241%2C48%2C0.73&scaling=scale-down&starting-point-node-id=78%3A48&show-proto-sidebar=1)

### Part 3

- Ensure previous work displays correctly with the more advanced API call for page 3
