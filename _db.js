let products = [
    {
      id: '1', 
      name: 'Smartwater', 
      description: 'Smartwater is manufactured by the process of distillation.This process removes most inorganic impurities, such as naturally dissolved minerals, but may let low boiling-point organic matter through.'
    },
    {
      id: '2', 
      name: 'Walmart Land', 
      description: 'Walmart Land is a Roblox experience created by Walmart. It was the sponsor of the RB Battles Season 3 Championship.'
    },
    {
      id: '3', 
      name: 'Meta Quest 2', 
      description: 'Advanced All-In-One Virtual Reality Headset — 128 GB with Carrying Case and Elite Strap for Enhanced Support and Comfort in VR.'
    },
    {
      id: '4', 
      name: 'Bud Light', 
      description: 'Bud Light is brewed longer, for a refreshingly easy drinking taste, using a blend of rice and malted barley to give it a clean aroma and crisp, smooth finish.'
    },
    {
      id: '5', 
      name: 'Energizer', 
      description: 'The Energizer brand is famous for high-quality batteries and portable lights.'
    },
  ]
  
  let influencers = [
    {
      id: '1',
      name: "John Doe",
      email: "john.doe@example.com",
      social_media_links: ["https://twitter.com/johndoe", "https://www.instagram.com/johndoe"]
    },
    {
      id: '2',
      name: "Jane Smith",
      email: "jane.smith@example.com",
      social_media_links: ["https://www.instagram.com/janesmith"]
    },
    {
      id: '3',
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      social_media_links: ["https://www.twitter.com/alicejohnson", "https://www.facebook.com/alicejohnson"]
    }
  ]

  let contents = [
    {
      id: '1',
      content_type: 'video',
      views: 5000,
      likes: 200,
      comments: 50,
      creation_date_time: '2022-07-07T12:00:00Z',
      influencer_id: '1',
      promotion_id: '1'
    },
    {
      id: '2',
      content_type: 'article',
      views: 3000,
      likes: 150,
      comments: 30,
      creation_date_time: '2022-07-08T10:00:00Z',
      influencer_id: '1',
      promotion_id: '1'
    },
    {
      id: '3',
      content_type: 'video',
      views: 8000,
      likes: 300,
      comments: 80,
      creation_date_time: '2022-07-10T15:00:00Z',
      influencer_id: '2',
      promotion_id: '1'
    },
    {
      id: '4',
      content_type: 'post',
      views: 2000,
      likes: 100,
      comments: 20,
      creation_date_time: '2022-07-12T09:00:00Z',
      influencer_id: '3',
      promotion_id: '2'
    },
    {
      id: '5',
      content_type: 'video',
      views: 6000,
      likes: 250,
      comments: 60,
      creation_date_time: '2022-07-15T11:00:00Z',
      influencer_id: '3',
      promotion_id: '2'
    }
  ]
  
  let promotions = [
    {
      id: '1',
      company: 'The Coca-Cola Company',
      promotion_budget: 50000,
      start_date_time: '2022-07-01T00:00:00Z',
      end_date_time: '2022-07-15T23:59:59Z'
    },
    {
      id: '2',
      company: 'Walmart Inc.',
      promotion_budget: 20000,
      start_date_time: '2022-08-01T00:00:00Z',
      end_date_time: '2022-08-15T23:59:59Z'
    }
  ]

  let promotion_products = [
    {
      id: '1',
      promotion_id: '1',
      product_id: '1'
    },
    {
      id: '2',
      promotion_id: '2',
      product_id: '2'
    },
    {
      id: '3',
      promotion_id: '2',
      product_id: '3'
    }
  ]

  let promotion_influencers = [
    {
      id: '1',
      promotion_id: '1',
      influencer_id: '1'
    },
    {
      id: '2',
      promotion_id: '1',
      influencer_id: '2'
    },
    {
      id: '3',
      promotion_id: '2',
      influencer_id: '3'
    },
    {
      id: '4',
      promotion_id: '2',
      influencer_id: '1'
    }
  ]
  
  export default { products, influencers, contents, promotions, promotion_products, promotion_influencers }