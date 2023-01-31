import { Box, Button, FormControl, MenuItem, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";

import { ALL_PRODUCTS, ShoppingCartItem } from "../models";

const AddItemBox = styled(Box)(() => ({
  display: "flex",
  flex: 1,
  marginTop: "25px",
}));

const ItemSelectWrapper = styled(FormControl)(() => ({
  width: "200px",
  marginRight: "20px",
}));

const QuantityInputWrapper = styled(FormControl)(() => ({
  width: "80px",
  marginRight: "20px",
}));

type AddItemFormProps = {
  addItem: (product: string, quantity: number) => void;
};

const AddItemForm: React.FC<AddItemFormProps> = ({ addItem }) => {
  const [productId, setProductId] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState<number>(0);

  const selectedProductHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(e.target.value);
  };
  const changeQuantityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 0) return;
    else {
      setQuantity(Number(e.target.value));
    }
  };

  return (
    <AddItemBox>
      <ItemSelectWrapper>
        <TextField
          select
          value={productId}
          onChange={selectedProductHandler}
          label="Item"
        >
          {ALL_PRODUCTS.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.label}
            </MenuItem>
          ))}
        </TextField>
      </ItemSelectWrapper>
      <QuantityInputWrapper>
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={changeQuantityHandler}
        />
      </QuantityInputWrapper>
      <Button
        onClick={() => addItem(productId, quantity)}
        variant="contained"
        disabled={!quantity || !productId}
      >
        Add
      </Button>
    </AddItemBox>
  );
};

export default AddItemForm;
