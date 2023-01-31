import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";

import { ShoppingCartItem } from "../models";

import AddItemForm from "./AddItemForm";
import ItemsList from "./ItemsList";
import Total from "./Total";

const ShoppingCardWrapper = styled(Paper)(() => ({
  width: 600,
  margin: "auto",
  padding: 50,
  minHeight: 500,
}));

const ShoppingCartHeader = styled(Typography)(() => ({
  textTransform: "uppercase",
  fontWeight: "bold",
  fontSize: 24,
}));

const ShoppingCart = () => {
  const [items, setItems] = React.useState<ShoppingCartItem[]>([]);

  const addItemToCart = (product: string, quantity: number) => {
    if (!items.some((item) => item.productId === product)) {
      setItems((prev) => [...prev, { productId: product, quantity }]);
    } else {
      setItems((prev) =>
        prev.map((item) =>
          item.productId === product
            ? { ...item, quantity: (item.quantity += quantity) }
            : item
        )
      );
    }
  };

  const deleteItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const increment = (product: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === product
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };
  const decrement = (product: string, quantity: number) => {
    if (quantity - 1 > 0) {
      setItems((prev) =>
        prev.map((item) =>
          item.productId === product
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setItems((prev) => prev.filter((item) => item.productId !== product));
    }
  };

  const clearItems = () => {
    setItems([]);
  };

  return (
    <ShoppingCardWrapper>
      <ShoppingCartHeader>Shopping Cart</ShoppingCartHeader>
      <AddItemForm addItem={addItemToCart} />
      {!!items.length && (
        <React.Fragment>
          <ItemsList
            items={items}
            deleteItem={deleteItem}
            increment={increment}
            decrement={decrement}
          />
          <Total items={items} clearItems={clearItems} />
        </React.Fragment>
      )}
    </ShoppingCardWrapper>
  );
};

export default ShoppingCart;
