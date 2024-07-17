const roles = [
  {
    name: "Admin",
    description: "Admin that grant permissions to users",
  },
  {
    name: "User",
    description: "User that can buy items",
  },
  {
    name: "Manager",
    description: "Manager that can add stocks for items",
  },
];

const superUser = {
  username: process.env.SUPER_USER_USERNAME,
  password: process.env.SUPER_USER_PASSWORD,
  email: process.env.SUPER_USER_EMAIL,
  name: process.env.SUPER_USER_FIRST_NAME,
  lastName: process.env.SUPER_USER_LAST_NAME,
  age: process.env.SUPER_USER_AGE,
};

const categories = [
  {
    name: "Electronics",
    description: "Electronics category",
  },
  {
    name: "Home",
    description: "Home category",
  },
  {
    name: "Toys",
    description: "Toys category",
  },
  {
    name: "Books",
    description: "Books category",
  },
  {
    name: "Sports",
    description: "Sports category",
  },
  {
    name: "School",
    description: "School category",
  },
  {
    name: "Undefined",
    description: "Undefined category",
  },
  {
    name: "Gaming",
    description: "Gaming category",
  },
];

const items = [
  {
    name: "Box of Pencils",
    description: "A box of 100 pencils",
    price: 2.5,
    image:
      "https://e7.pngegg.com/pngimages/702/527/png-clipart-colored-pencil-crayon-boxed-color-pencil-png-material-color-splash.png",
  },
  {
    name: "Sports Bike",
    description: "A bike good to ride on the road",
    price: 45.0,
    image:
      "https://www.reidcycles.com.au/cdn/shop/products/reid-cycles-australia-mtb-pro-27-5-disc-wsd-mountain-bike-light-blue-s-488.png?v=1620962055&width=1946",
  },
  {
    name: "Steam Deck",
    description: "A handheld gaming console",
    price: 399.0,
    image:
      "https://clan.akamai.steamstatic.com/images//39049601/a1aa0624727ea6fd61bd179d214eaca1904fae45.png",
  },
  {
    name: "Soccer Ball",
    description: "A ball to play soccer",
    price: 10.0,
    image:
      "https://dynamicsport.co.nz/cdn/shop/products/NikeFlightFootball.png?v=1669789854",
  },
  {
    name: "Basketball",
    description: "A ball to play basketball",
    price: 10.0,
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png",
  },
  {
    name: "Tablet",
    description: "A tablet to play games",
    price: 150.0,
    image:
      "https://e7.pngegg.com/pngimages/506/453/png-clipart-tablet-tablet.png",
  },
  {
    name: "Laptop",
    description: "A laptop with Linux Pop Os, 16GB RAM, 512GB SSD, Nvidia RTX 3060, AMD Ryzen 7 4800H",
    price: 1200.00,
    image: "https://www.omen.com/content/dam/sites/omen/worldwide/laptops/2022-omen-16-amd/Hero%20Image%201.png",
  },
  {
    name: "Headphones",
    description: "A headphones to listen music",
    price: 50.0,
    image:
      "https://www.pngkey.com/png/full/1-10922_headphone-png-image-headphone-png",
  },
  {
    name: "Keyboard",
    description: "A keyboard to write",
    price: 30.0,
    image:
      "https://i.pinimg.com/originals/70/d7/d3/70d7d3fccc11ded2fd4c43c62027a60d.png",
  },
  {
    name: "Mouse",
    description: "A mouse to move the cursor",
    price: 20.0,
    image:
      "https://purepng.com/public/uploads/large/purepng.com-rat-mousemouseanimalratmicerodent-981524651565fwflu.png",
  },
  {
    name: "Monitor",
    description: "A monitor to see the screen",
    price: 150.0,
    image:
      "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08410554.png",
  },
  {
    name: "Smartphone",
    description: "A smartphone to call and send messages",
    price: 300.0,
    image:
      "https://pngimg.com/uploads/smartphone/smartphone_PNG8514.png",
  },
  {
    name: "Table",
    description: "A table to put things",
    price: 50.0,
    image:
      "https://www.pinpng.com/pngs/m/329-3293879_modern-table-png-free-download-transparent-black-table.png",
  },
  {
    name: "Chair",
    description: "A chair to sit",
    price: 30.0,
    image:
      "https://w7.pngwing.com/pngs/67/68/png-transparent-chair-plastic-chair-furniture-wood-chair-thumbnail.png",
  },
  {
    name: "Desk",
    description: "A desk to work",
    price: 100.0,
    image:
      "https://w7.pngwing.com/pngs/125/780/png-transparent-black-and-silver-laptop-computer-office-desk-chairs-office-desk-chairs-office-supplies-office-desk-angle-furniture-rectangle.png",
  },
  {
    name: "Book",
    description: "A book to read",
    price: "10.0",
    image: "https://www.roadtoreact.com/twitter.png"
  },
];

export {
  roles as rolesData,
  categories as categoriesData,
  superUser,
  items as itemsData,
};
