# GraphQL Promotion Management API

This project is an interactive GraphQL API that allows users to retrieve and update data from a local in-memory database (`_db.js`). The API is built using a GraphQL server and provides functionality to manage promotions, products, influencers, and content associated with promotional campaigns. It serves as the backend database for a ReactJS project.

## Table of Contents

- [Schema](#schema)
- [Installation](#installation)
- [Usage](#usage)
  - [Queries and Mutations](#queries-and-mutations)

<a name="schema"></a>
## Schema

The API schema includes the following types:

- **Promotion**: Represents a promotion campaign for one or more products.
  - Fields: `id`, `company`, `promotion_budget`, `start_date_time`, `end_date_time`, `contents`, `products`, `influencers`.

- **Product**: Represents a product.
  - Fields: `id`, `name`, `description`, `promotions`, `influencers`, `contents`.

- **Influencer**: Represents an influencer.
  - Fields: `id`, `name`, `email`, `social_media_links`, `contents`, `products`, `promotions`.

- **Content**: Represents the content created by influencers within a promotion campaign.
  - Fields: `id`, `content_type`, `views`, `likes`, `comments`, `creation_date_time`, `promotion`, `influencer`, `products`.

- **PromotionProduct**: Indicates which products are associated with each promotion campaign.
  - Fields: `id`, `promotion_id`, `product_id`.

- **PromotionInfluencer**: Indicates which influencers are involved in each promotion campaign.
  - Fields: `id`, `promotion_id`, `influencer_id`.

<a id="custom_anchor_name"></a>
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yuzhang0520/graphql-promotions-influencers-api.git
   cd graphql-promotions-influencers-api
2. Install dependencies:
   ```bash
   npm install
3. Run the server:
   ```bash
   nodemon index.js
4. Open your browser and navigate to `http://localhost:4000/` to view the GraphQL Playground.

## Usage

### Queries and Mutations
The following are some example queries and mutations you can run in the GraphQL Playground:

- **Query all promotions:**
  ```graphql
  query {
   promotions {
     id
     company
     promotion_budget
     start_date_time
     end_date_time
     contents {
       id
       content_type
       views
       likes
       comments
     }
     products {
       id
       name
       description
     }
     influencers {
       id
       name
       email
     }
   }
  }
- **Add a new promotion:**
  ```graphql
  mutation {
   addPromotion(promotion: {
     company: "New Company",
     promotion_budget: 30000,
     start_date_time: "2024-01-01T00:00:00Z",
     end_date_time: "2024-01-15T23:59:59Z"
   }) {
     id
     company
     promotion_budget
     start_date_time
     end_date_time
   }
  }

For more queries and mutations, refer to the schema definitions in `schema.js`.
