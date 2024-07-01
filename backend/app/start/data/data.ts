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
      "https://e7.pngegg.com/pngimages/259/279/png-clipart-turned-on-tablet-computer-sony-xperia-z4-tablet-sony-xperia-tablet-z-sony-xperia-z2-tablet-sony-xperia-tablet-s-tablet-electronics-gadget-thumbnail.png",
  },
];

export {
  roles as rolesData,
  categories as categoriesData,
  superUser,
  items as itemsData,
};
