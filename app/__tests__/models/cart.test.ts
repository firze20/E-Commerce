import Cart from "../../database/models/Cart";
import Item from "../../database/models/Item";
import User from "../../database/models/User";
import CartItem from "../../database/models/CartItem";

let cart: Cart | null;
let user: User;
let item: Item;
let cartItem: CartItem;

let globalQuantity = 5

describe("Test Cart model", () => {  
  beforeAll(async () => {
    user = await User.create({
      username: "stock_test",
      email: "stockTest@gmail.com",
      password: "stockTest2024",
    });

    item = await Item.create({
      name: "South Park Plushie Doll",
      description: "A south park plushie doll",
      price: 4.99,
      image:
        "https://www.pokemoncenter.com/images/DAMRoot/High/10000/P7730_701-29240_02.jpg",
    });

    cart = await Cart.findOne({
      where: {
        userId: user.id,
      },
    });

    cartItem = await CartItem.create({
        cartId: cart!.id,
        itemId: item.id,
        quantity: globalQuantity,
        });
    })

    test("Get quantity of items in the cart", async () => {
      // Should automatically create upon user creation
      expect(cart).toBeDefined();
  
      const quantity = await cart!.getQuantityOfCart();
  
      expect(quantity).toBe(globalQuantity);
    });
    test("Add item to cart and check the quantity", async () => {
      let numberOfItems = 5;
  
      await cart!.addItemToCart(item, numberOfItems);

      const cartQuantity = await CartItem.findOne({
        where: {
          cartId: cart!.id,
          itemId: item.id,
        },
      
      });

      globalQuantity += numberOfItems;
  
      expect(cartQuantity!.quantity).toBe(globalQuantity);
    });
  
    test("Remove item from cart and check the quantity", async () => {
      let numberOfItems = 1;
  
      await cart!.removeItemFromCart(item, numberOfItems);
  
      const cartQuantity = await CartItem.findOne({
        where: {
          cartId: cart!.id,
          itemId: item.id,
        },
      });

      globalQuantity -= numberOfItems;

      expect(cartQuantity!.quantity).toBe(globalQuantity);
    });
  });


