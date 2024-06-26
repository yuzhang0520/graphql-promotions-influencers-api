import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'

// db
import db from './_db.js'

// types
import { typeDefs } from './schema.js'

const resolvers = {
    Query: {
        promotions() {
            return db.promotions
        },
        promotion(_, args) {
            return db.promotions.find((promotion) => promotion.id === args.id)
        },
        influencers() {
            return db.influencers
        },
        influencer(_, args) {
            return db.influencers.find((influencer) => influencer.id === args.id)
        },
        contents() {
            return db.contents
        },
        content(_, args) {
            return db.contents.find((content) => content.id === args.id)
        },
        products() {
            return db.products
        },
        product(_, args) {
            return db.products.find((product) => product.id === args.id)
        },
        promotionProductList() {
            return db.promotion_products
        },
        findProductsByPromotion(_, args) {
            return db.promotion_products.filter((pp) => pp.promotion_id === args.promotion_id)
        },
        findPromotionsByProduct(_, args) {
            return db.promotion_products.filter((pp) => pp.product_id === args.product_id)
        },
        promotionInfluencerList() {
            return db.promotion_influencers
        },
        findPromotionByInfluencer(_, args){
            return db.promotion_influencers.filter((pi) => pi.influencer_id === args.influencer_id)
        },
        findInfluencerByPromotion(_, args){
            return db.promotion_influencers.filter((pi) => pi.promotion_id === args.promotion_id)
        },
        findProductsNotInPromotion(_, args){
            const promotionProductList = db.promotion_products.filter((pp) => pp.promotion_id === args.promotion_id)
            const productIds = promotionProductList.map((pp) => pp.product_id)
            return db.products.filter((product) => !productIds.includes(product.id))
        }
    },
    // subquery property inside resolvers object
    Promotion: {
        contents(parent) {
          // Filter contents related to the current promotion
          return db.contents.filter((content) => content.promotion_id === parent.id)
        },
        products(parent) {
          // Find the products related to the current promotion
          const promotionProductList = db.promotion_products.filter((pp) => pp.promotion_id === parent.id)
          return promotionProductList.map((pp) => {
            // Find the product details by its ID
            return db.products.find((product) => product.id === pp.product_id)
          })
        },
        influencers(parent) {
          const promotionInfluencerList = db.promotion_influencers.filter((pi) => pi.promotion_id === parent.id)
          return promotionInfluencerList.map((pi)=>{
            return db.influencers.find((influencer) => influencer.id === pi.influencer_id)
          })
        }
    },
    Influencer: {
        contents(parent) {
          return db.contents.filter((content) => content.influencer_id === parent.id)
        },
        products(parent) {
          const promotionInfluencerList = db.promotion_influencers.filter((pi) => pi.influencer_id === parent.id)
          const promotionIds = promotionInfluencerList.map((pi) => pi.promotion_id)
          const products = db.promotion_products.filter((pp) => promotionIds.includes(pp.promotion_id))
          return products.map((pp) => db.products.find((product) => product.id === pp.product_id))
        },
        promotions(parent) {
          const promotionInfluencerList = db.promotion_influencers.filter((pi) => pi.influencer_id === parent.id)
          return promotionInfluencerList.map((pi) => {
            return db.promotions.find((p) => p.id === pi.promotion_id)
          })
        }
    },
    Content: {
        promotion(parent) {
          return db.promotions.find((promotion) => promotion.id === parent.promotion_id)
        },
        influencer(parent) {
            return db.influencers.find((influencer) => influencer.id === parent.influencer_id)
        },
        products(parent) {
            const products = db.promotion_products.filter((pp) => pp.promotion_id === parent.promotion_id)
            return products.map((pp) => {
              return db.products.find((product) => product.id === pp.product_id)
            }) 
        }
    },
    Product: {
      promotions(parent){
        const promotionProductList = db.promotion_products.filter((pp) => pp.product_id === parent.id)
        return promotionProductList.map((pp) => {
          return db.promotions.find((p) => p.id === pp.promotion_id)
        })
      },
      influencers(parent) {
        const promotionProductList = db.promotion_products.filter((pp) => pp.product_id === parent.id)
        // extract 'promotion_id' associated with each 'promotion_product'
        const promotionIds = promotionProductList.map((pp) => pp.promotion_id)
        // filter 'promotion_influencers' to find all entries where the 'promotion_id' is included in the 'promotionIds' array
        const influencers = db.promotion_influencers.filter((pi) => promotionIds.includes(pi.promotion_id))
        // map over the filtered 'promotion_influencers' to retrieve the corresponding influencers from the 'db.influencers' array.
        return influencers.map((pi) => db.influencers.find((influencer) => influencer.id === pi.influencer_id))

      },
      contents(parent) {
        // Get the promotion IDs associated with the product
        const promotionIds = db.promotion_products.filter((pp) => pp.product_id === parent.id).map((pp) => pp.promotion_id)
        // Filter contents based on the promotion IDs
        return db.contents.filter((content) => promotionIds.includes(content.promotion_id))
        
      },
      promotion_product(parent) {
        return db.promotion_products.filter((pp) => pp.product_id === parent.id)
      }
    },
    Mutation: {
      addPromotion(_, args) {
        let promotion = {
          ...args.promotion, 
          id: (Math.max(...db.promotions.map(promotion => parseInt(promotion.id))) + 1).toString()
        }
        db.promotions.push(promotion)
  
        return promotion
      },
      createProduct(_, args) {
        let product = {
          ...args.product, 
          id: Math.max(...db.products.map(product => parseInt(product.id))) + 1
        }
        db.products.push(product)
  
        return product
      },
      addProductToPromotion(_, args) {
        let promotionProduct = {
          ...args.promotionProduct, 
          id: (Math.max(...db.promotion_products.map(pp => parseInt(pp.id))) + 1).toString()
        }
        db.promotion_products.push(promotionProduct)
      
        return promotionProduct
      },
      addInfluencerToPromotion(_, args) {
        let promotionInfluencer = {
          ...args.promotionInfluencer, 
          id: Math.max(...db.promotion_influencers.map(pi => parseInt(pi.id))) + 1
        }
        db.promotion_influencers.push(promotionInfluencer)
      
        return promotionInfluencer
      },
      removeInfluencerFromPromotion(_, args) {
        db.promotion_influencers = db.promotion_influencers.filter((pi) => pi.id !== args.id)
  
        return db.promotion_influencers
      },
      removeProductFromPromotion(_, { promotion_id, product_id }) {
        db.promotion_products = db.promotion_products.filter(
          (pp) => pp.promotion_id !== promotion_id || pp.product_id !== product_id
        );
        return db.promotion_products;
      }
    }
}

// SERVER SETUP
const server = new ApolloServer({
    // typeDefs - from schema.js
    // resolvers property
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000}
})

console.log('SERVER READY AT PORT', 4000)