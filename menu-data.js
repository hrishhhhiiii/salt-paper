// Full curated menu data for Salt & Pepper - Belghoria, Kolkata
const MENU_DATA = [
  // Signature & Bestsellers
  {
    id: "sig-1",
    name: "Classic British Fish & Chips",
    category: "continental",
    categoryLabel: "Continental & Mains",
    price: 345,
    isVeg: false,
    bestseller: true,
    rating: "4.9 ★",
    image: "assets/fish-and-chips.jpg",
    description: "Golden crispy crumb-coated fish fillet, flaky Kolkata bhetki style, served with seasoned thick fries, creamy tartar dip and fresh lemon wedge."
  },
  {
    id: "sig-2",
    name: "Smoky BBQ Chicken Burger",
    category: "burgers",
    categoryLabel: "Burgers & Sandwiches",
    price: 230,
    isVeg: false,
    bestseller: true,
    rating: "4.8 ★",
    image: "assets/bbq-burger.jpg",
    description: "Char-grilled spiced chicken patty smothered in rich smokey barbecue glaze, molten cheese, fresh crisp lettuce and served with salted golden fries."
  },
  {
    id: "sig-3",
    name: "Signature Thick Oreo Shake",
    category: "beverages",
    categoryLabel: "Beverages & Shakes",
    price: 195,
    isVeg: true,
    bestseller: true,
    rating: "4.9 ★",
    image: "assets/oreo-shake.jpg",
    description: "All-time Belghoria favorite! Heavy dairy blend of rich chocolate ice cream, blitzed Oreo cookies, topped with whipped cream, cocoa drizzle and wafer."
  },
  {
    id: "sig-4",
    name: "Sizzling Tandoori Chicken Tikka & Seekh",
    category: "kebabs",
    categoryLabel: "Tandoor & Kebabs",
    price: 310,
    isVeg: false,
    bestseller: true,
    rating: "4.8 ★",
    image: "assets/tandoori-kebab.jpg",
    description: "Mouth-watering chicken seekh and char-roasted tikka kebabs with aromatic spices, served sizzling on a cast-iron platter with fresh onion rings and mint chutney."
  },
  {
    id: "sig-5",
    name: "Kolkata Indo-Chinese Gravy Noodles",
    category: "chinese",
    categoryLabel: "Indo-Chinese",
    price: 210,
    isVeg: false,
    bestseller: true,
    rating: "4.7 ★",
    image: "assets/gravy-noodles.jpg",
    description: "Wok-tossed noodles served under a savory garlic, dark soya and shredded chicken or veg broth with crunchy vegetables and oriental herbs."
  },
  {
    id: "sig-6",
    name: "Decadent Sizzling Brownie",
    category: "desserts",
    categoryLabel: "Desserts",
    price: 210,
    isVeg: true,
    bestseller: true,
    rating: "4.9 ★",
    image: "assets/sizzling-brownie.jpg",
    description: "Hot fudgy chocolate walnut brownie presented on a sizzling skillet, topped with chilled vanilla bean ice cream and hot chocolate lava sauce."
  },

  // Starters & Kebabs
  {
    id: "keb-1",
    name: "Chicken Tangri Kebab (2 Pcs)",
    category: "kebabs",
    categoryLabel: "Tandoor & Kebabs",
    price: 240,
    isVeg: false,
    bestseller: false,
    rating: "4.6 ★",
    image: "assets/tandoori-kebab.jpg",
    description: "Tender chicken drumsticks marinated overnight in hung yogurt, Kashmiri degi mirch and tandoori spices, char-roasted to juicy perfection."
  },
  {
    id: "keb-2",
    name: "Tandoori Chicken (Half / Full)",
    category: "kebabs",
    categoryLabel: "Tandoor & Kebabs",
    price: 260,
    isVeg: false,
    bestseller: true,
    rating: "4.7 ★",
    image: "assets/tandoori-kebab.jpg",
    description: "Classic clay-oven roasted chicken packed with robust Punjabi spices, lemon butter glaze and smokiness. (Full portion available at ₹440)."
  },
  {
    id: "keb-3",
    name: "Chicken Seekh Kebab (6 Pcs)",
    category: "kebabs",
    categoryLabel: "Tandoor & Kebabs",
    price: 310,
    isVeg: false,
    bestseller: false,
    rating: "4.7 ★",
    image: "assets/tandoori-kebab.jpg",
    description: "Spiced minced chicken skewers infused with roasted cumin, green chillies and fresh mint, grilled over glowing charcoal."
  },
  {
    id: "keb-4",
    name: "Fish Hariyali / Tikka Kebab (6 Pcs)",
    category: "kebabs",
    categoryLabel: "Tandoor & Kebabs",
    price: 320,
    isVeg: false,
    bestseller: true,
    rating: "4.8 ★",
    image: "assets/fish-and-chips.jpg",
    description: "Succulent cubes of fish steeped in coriander-mint-spinach marinade, barbecued gently and dusted with chaat masala."
  },
  {
    id: "keb-5",
    name: "Mutton Chelo Kebab Platter",
    category: "kebabs",
    categoryLabel: "Tandoor & Kebabs",
    price: 425,
    isVeg: false,
    bestseller: true,
    rating: "4.9 ★",
    image: "assets/tandoori-kebab.jpg",
    description: "Persian-Kolkata heritage style: buttery fragrant steamed rice topped with spiced mutton seekh, grilled tomato and melting butter cube."
  },
  {
    id: "keb-6",
    name: "Mushroom Salt & Pepper",
    category: "kebabs",
    categoryLabel: "Tandoor & Kebabs",
    price: 195,
    isVeg: true,
    bestseller: true,
    rating: "4.8 ★",
    image: "assets/hero-bg.jpg",
    description: "House special starter! Crispy battered button mushrooms tossed in cracked peppercorns, scallions, crushed garlic and sea salt."
  },
  {
    id: "keb-7",
    name: "Crispy Chilli Baby Corn",
    category: "kebabs",
    categoryLabel: "Tandoor & Kebabs",
    price: 180,
    isVeg: true,
    bestseller: false,
    rating: "4.6 ★",
    image: "assets/gravy-noodles.jpg",
    description: "Crunchy fried tender babycorn spears wok-tossed with diced bell peppers, onion petals and spicy sweet-chilli sauce."
  },
  {
    id: "keb-8",
    name: "Dry Chilli Chicken (Kolkata Tangra Style)",
    category: "kebabs",
    categoryLabel: "Tandoor & Kebabs",
    price: 220,
    isVeg: false,
    bestseller: true,
    rating: "4.8 ★",
    image: "assets/gravy-noodles.jpg",
    description: "Beloved Kolkata cafe classic: crispy battered chicken tossed with slit green chillies, ginger, garlic, and dark soy."
  },

  // Burgers & Sandwiches
  {
    id: "bur-1",
    name: "Paneer Red Salsa Burger with Fries",
    category: "burgers",
    categoryLabel: "Burgers & Sandwiches",
    price: 220,
    isVeg: true,
    bestseller: false,
    rating: "4.5 ★",
    image: "assets/bbq-burger.jpg",
    description: "Marinated crispy fried cottage cheese slab, tangy roasted tomato-bell pepper salsa, herb mayo and crispy fries on the side."
  },
  {
    id: "bur-2",
    name: "Crispy Fish Fillet Burger with Fries",
    category: "burgers",
    categoryLabel: "Burgers & Sandwiches",
    price: 230,
    isVeg: false,
    bestseller: true,
    rating: "4.7 ★",
    image: "assets/bbq-burger.jpg",
    description: "Crumb-coated golden fish fillet with homemade remoulade, shredded iceberg lettuce in toasted sesame buns."
  },
  {
    id: "bur-3",
    name: "Classic Chicken Crunch Burger with Fries",
    category: "burgers",
    categoryLabel: "Burgers & Sandwiches",
    price: 230,
    isVeg: false,
    bestseller: false,
    rating: "4.6 ★",
    image: "assets/bbq-burger.jpg",
    description: "Double seasoned crunch chicken patty, garlic aioli, cheddar cheese slice and dill pickle chips."
  },
  {
    id: "bur-4",
    name: "Loaded Salt & Pepper Club Sandwich",
    category: "burgers",
    categoryLabel: "Burgers & Sandwiches",
    price: 180,
    isVeg: false,
    bestseller: true,
    rating: "4.7 ★",
    image: "assets/bbq-burger.jpg",
    description: "Triple-decker toasted bread filled with roasted chicken shreds, boiled egg, cheese slice, lettuce, tomato and chips."
  },

  // Momos
  {
    id: "mom-1",
    name: "Steamed Chicken Momos (5 Pcs) with Clear Soup",
    category: "momos",
    categoryLabel: "Momos & Dumplings",
    price: 155,
    isVeg: false,
    bestseller: true,
    rating: "4.7 ★",
    image: "assets/gravy-noodles.jpg",
    description: "Delicate thin-skinned Tibetan style steamed dumplings stuffed with spiced minced chicken, served with fiery red chutney and warm broth."
  },
  {
    id: "mom-2",
    name: "Crispy Chicken Fried Momos (5 Pcs)",
    category: "momos",
    categoryLabel: "Momos & Dumplings",
    price: 165,
    isVeg: false,
    bestseller: false,
    rating: "4.6 ★",
    image: "assets/gravy-noodles.jpg",
    description: "Golden fried crunchy momos bursting with savory chicken juices, served with sweet chilli and spicy momo sauce."
  },
  {
    id: "mom-3",
    name: "Pan Fried Chicken Momos in Schezwan Gravy",
    category: "momos",
    categoryLabel: "Momos & Dumplings",
    price: 175,
    isVeg: false,
    bestseller: true,
    rating: "4.8 ★",
    image: "assets/gravy-noodles.jpg",
    description: "Crisp pan-seared momos tossed in a robust fiery Schezwan, garlic and spring onion sauce."
  },

  // Main Course (Indo-Chinese, North Indian & Continental)
  {
    id: "main-1",
    name: "Fish in Hot Garlic / Chilli Basil Sauce",
    category: "continental",
    categoryLabel: "Continental & Mains",
    price: 345,
    isVeg: false,
    bestseller: true,
    rating: "4.8 ★",
    image: "assets/fish-and-chips.jpg",
    description: "Succulent fish fillets simmered in your choice of spicy hot garlic or aromatic Thai holy basil gravy."
  },
  {
    id: "main-2",
    name: "Creamy Paneer Butter Masala",
    category: "northindian",
    categoryLabel: "North Indian Curries",
    price: 310,
    isVeg: true,
    bestseller: true,
    rating: "4.6 ★",
    image: "assets/hero-bg.jpg",
    description: "Soft malai paneer cubes simmered in a silky, slow-cooked makhani gravy enriched with fresh cream and kasuri methi."
  },
  {
    id: "main-3",
    name: "Slow-Simmered Dal Makhani",
    category: "northindian",
    categoryLabel: "North Indian Curries",
    price: 175,
    isVeg: true,
    bestseller: true,
    rating: "4.7 ★",
    image: "assets/tandoori-kebab.jpg",
    description: "Authentic whole black urad lentils and kidney beans slow-cooked overnight with churned butter and mild spices."
  },
  {
    id: "main-4",
    name: "Garden Fresh Mixed Vegetable",
    category: "northindian",
    categoryLabel: "North Indian Curries",
    price: 175,
    isVeg: true,
    bestseller: false,
    rating: "4.4 ★",
    image: "assets/hero-bg.jpg",
    description: "Seasonal florets of cauliflower, green peas, carrots, and french beans cooked in home-style North Indian masala."
  },
  {
    id: "main-5",
    name: "Creamy Penne Alfredo / Spicy Arrabiata Pasta",
    category: "continental",
    categoryLabel: "Continental & Mains",
    price: 240,
    isVeg: true,
    bestseller: false,
    rating: "4.6 ★",
    image: "assets/gravy-noodles.jpg",
    description: "Choice of Italian pasta: rich parmesan cream white sauce or zesty spicy tomato herb sauce with black olives."
  },

  // Beverages & Shakes
  {
    id: "bev-1",
    name: "Royal Mango Mastani",
    category: "beverages",
    categoryLabel: "Beverages & Shakes",
    price: 210,
    isVeg: true,
    bestseller: true,
    rating: "4.8 ★",
    image: "assets/oreo-shake.jpg",
    description: "Pune-style royal mango milkshake loaded with mango pulp, vanilla ice cream scoop, chopped pistachios and cherries."
  },
  {
    id: "bev-2",
    name: "Wild Blueberry Blast Shake",
    category: "beverages",
    categoryLabel: "Beverages & Shakes",
    price: 210,
    isVeg: true,
    bestseller: false,
    rating: "4.7 ★",
    image: "assets/oreo-shake.jpg",
    description: "Refreshing thick shake infused with premium wild blueberry compote and creamy chilled dairy."
  },
  {
    id: "bev-3",
    name: "Gooey Brownie Cookie Shake",
    category: "beverages",
    categoryLabel: "Beverages & Shakes",
    price: 220,
    isVeg: true,
    bestseller: true,
    rating: "4.9 ★",
    image: "assets/oreo-shake.jpg",
    description: "Chunks of chocolate walnut brownie and chocochip cookies churned with whole milk and rich dark chocolate syrup."
  },
  {
    id: "bev-4",
    name: "Belghoria Kacha Aam Iced Tea",
    category: "beverages",
    categoryLabel: "Beverages & Shakes",
    price: 135,
    isVeg: true,
    bestseller: true,
    rating: "4.7 ★",
    image: "assets/hero-bg.jpg",
    description: "Tangy summer favorite! Chilled brewed tea infused with Kolkata raw mango (kacha aam) syrup, black salt, and fresh mint."
  },
  {
    id: "bev-5",
    name: "Traditional Sweet / Salted Lassi",
    category: "beverages",
    categoryLabel: "Beverages & Shakes",
    price: 125,
    isVeg: true,
    bestseller: false,
    rating: "4.5 ★",
    image: "assets/oreo-shake.jpg",
    description: "Thick hand-churned curd drink flavored with cardamom essence and garnished with roasted malai."
  }
];

// Customer Reviews & Feedback
const REVIEWS_DATA = [
  {
    name: "Anirban Bhattacharya",
    role: "Local Food Explorer (Google Reviewer)",
    rating: 5,
    date: "August 2026",
    text: "Salt & Pepper is easily the best cafe-bistro in Belghoria. The Fish & Chips is top tier — crispy, non-greasy and that tartar dip is just perfection. Cozy seating and polite staff.",
    dish: "Fish & Chips, Oreo Shake"
  },
  {
    name: "Poulomi Sen",
    role: "Regular Patron (Justdial Reviewer)",
    rating: 5,
    date: "July 2026",
    text: "Celebrated my birthday here with college friends. The BBQ chicken burger, gravy noodles, and sizzling brownie blew us away. Budget friendly, warm lighting and great vibes!",
    dish: "BBQ Burger, Sizzling Brownie"
  },
  {
    name: "Soumya Mukherjee",
    role: "Belghoria Resident (District Reviewer)",
    rating: 5,
    date: "June 2026",
    text: "Finally an aesthetic, multi-cuisine place on Feeder Road! The Mushroom Salt & Pepper and Tandoori platters are super flavorful. Recommend booking in advance on weekends.",
    dish: "Mushroom Salt & Pepper, Tandoori Chicken"
  },
  {
    name: "Debolina Das",
    role: "Food Blogger (Kolkata Bites)",
    rating: 5,
    date: "May 2026",
    text: "Their thick Oreo Shake and Kacha Aam Ice Tea are absolute crowd pullers. Very welcoming management, fast service, and pocket-friendly pricing for families and students alike.",
    dish: "Oreo Shake, Kacha Aam Iced Tea"
  }
];
