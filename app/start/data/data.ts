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
    }
];

const superUser = {
    username: process.env.SUPER_USER_USERNAME,
    password: process.env.SUPER_USER_PASSWORD,
    email: process.env.SUPER_USER_EMAIL,
    name: process.env.SUPER_USER_FIRST_NAME,
    lastName: process.env.SUPER_USER_LAST_NAME,
    age: process.env.SUPER_USER_AGE,
}

const categories = [
    {
        name: "Electronics",
        description: "Electronics category"
    },
    {
        name: "Clothing",
        description: "Clothing category"
    },
    {
        name: "Home",
        description: "Home category"
    },
    {
        name: "Toys",
        description: "Toys category"
    },
    {
        name: "Books",
        description: "Books category"
    },
    {
        name: "Sports",
        description: "Sports category"
    },
    {
        name: "School",
        description: "School category"
    }
];

const items = [
    {
        name: "Box of Pencils",
        description: "A box of 100 pencils",
        price: 2.50,
        image: "https://e7.pngegg.com/pngimages/702/527/png-clipart-colored-pencil-crayon-boxed-color-pencil-png-material-color-splash.png",
    },
    {
        name: "Box of Pens",
        description: "A box of 100 pens",
        price: 3.00,
        image: "https://e7.pngegg.com/pngimages/702/527/png-clipart-colored-pencil-crayon-boxed-color-pencil-png-material-color-splash.png",
    },
]

export {
    roles as rolesData,
    categories as categoriesData,
    superUser,
    items as itemsData
}

