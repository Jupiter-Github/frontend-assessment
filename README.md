# ShopLite — Leegality Frontend Engineer Assessment

A responsive product listing and product detail application built with React, React Router and the DummyJSON Products API.

## Features

- Product listing with image, title, price and rating
- Category filter populated from the API
- Minimum and maximum price filters
- Brand filter based on unique brands in the fetched products
- Combined client-side filtering
- Pagination with 12 products per page
- Product detail page at `/product/:id`
- Loading, error and empty-result states
- Filter values stored in URL query parameters so they remain selected when returning from a product detail page
- Responsive layout for desktop and mobile

## Requirements

Node.js 18 or newer and npm.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Production build

```bash
npm run build
npm run preview
```

## API endpoints

- `https://dummyjson.com/products?limit=0` — fetch the full product collection for client-side filtering and brand options
- `https://dummyjson.com/products/categories` — fetch category options
- `https://dummyjson.com/products/:id` — fetch the selected product's details

## Assumptions and decisions

- The full product collection is loaded once because category, price and brand filters must work together across the available collection. Pagination is then handled on the client in groups of 12.
- Brand is optional in the API response, so products without a brand are not added to the brand filter and show “Not specified” on the detail page.
- Filter selections and page number are represented in the URL. The product card carries the current query string to the detail page, and the Back button returns to the previous listing state.
- No UI component library is used; the layout is implemented in CSS.
- A filter change resets pagination to page one.

## Possible improvements

- Add automated tests for filtering, pagination and routing.
- Add search, sorting and a retry button that refetches data without reloading the page.
- Add API caching and skeleton placeholders.
- Add accessibility testing and more detailed image fallbacks.
- Deploy the app and add the live demo URL here before submitting.
