export const typeDefs = `#graphql
    type Promotion {
        id: ID!
        company: String!
        promotion_budget: Float!
        start_date_time: String!
        end_date_time: String!
        contents: [Content!]
        products: [Product!]
        influencers: [Influencer!]
    }
    type Content {
        id: ID!
        content_type: String!
        views:Int!
        likes:Int!
        comments:Int!
        creation_date_time: String!
        promotion: Promotion!
        influencer: Influencer!
        products: [Product!]!
    }
    type Influencer {
        id: ID!
        name: String!
        email: String!
        social_media_links: [String!]!
        contents: [Content!]
        products: [Product!]
        promotions: [Promotion!]
    }
    type Product {
        id: ID!
        name: String!
        description: String!
        promotions: [Promotion!]
        influencers: [Influencer!]
        contents: [Content!]
        promotion_product: [Promotion_Product!]
    }
    type Promotion_Product {
        id: ID!
        promotion_id: ID!
        product_id: ID!
    }
    type Promotion_Influencer{
        id: ID!
        promotion_id: Int!
        influencer_id: Int!
    }


    type Query {
        contents:[Content]
        content(id: ID!): Content
        promotions: [Promotion]
        promotion(id: ID!): Promotion
        influencers: [Influencer]
        influencer(id: ID!): Influencer
        products: [Product]
        product(id: ID!): Product
        promotionProductList: [Promotion_Product]
        findProductsByPromotion(promotion_id: ID!): [Promotion_Product]
        findPromotionsByProduct(product_id: ID!): [Promotion_Product]
        promotionInfluencerList: [Promotion_Influencer]
        findPromotionByInfluencer(influencer_id: ID!): [Promotion_Influencer]
        findInfluencerByPromotion(promotion_id: ID!): [Promotion_Influencer]
        findProductsNotInPromotion(promotion_id: ID!): [Product]
    }

    type Mutation {
        addPromotion(promotion: AddPromotionInput!): Promotion
        createProduct(product: CreateProductInput!): Product
        addProductToPromotion(promotionProduct: AddProductToPromotionInput!): Promotion_Product
        addInfluencerToPromotion(promotionInfluencer: AddInfluencerToPromotionInput!): Promotion_Influencer
        removeInfluencerFromPromotion(id: ID!): [Promotion_Influencer]
        removeProductFromPromotion(promotion_id: ID!, product_id: ID!): [Promotion_Product]
    }

    input AddPromotionInput {
        company: String!,
        promotion_budget: Float!,
        start_date_time: String!,
        end_date_time: String!
    }

    input CreateProductInput {
        name: String!,
        description: String!
    }

    input AddProductToPromotionInput{
        promotion_id: ID!,
        product_id: ID!
    }

    input AddInfluencerToPromotionInput{
        promotion_id: Int!,
        influencer_id: Int!
    }


`
