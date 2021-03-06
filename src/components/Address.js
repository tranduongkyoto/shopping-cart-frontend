import React, { useContext, useState } from 'react';
import { Form, FormField, TextInput, Box, Button, Grid } from 'grommet';
import { AppContext } from '../context/AppProvider';
import { useHistory } from 'react-router-dom';
import CheckoutWizard from './CheckoutWizard';
import { CartContext } from '../context/CartProvider';

export default function Address() {
  const [value, setValue] = useState({
    name: '',
    phoneNum: '',
    address: '',
    postcode: '',
    // paymentmethod: '',
  });
  const [paymentmethod, setPaymentMethod] = useState('');
  const { setCart } = useContext(CartContext);
  const { setShippingAddress, total } = useContext(AppContext);
  const history = useHistory();
  return (
    <Grid>
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <Box direction="row">
        <Box width="medium"></Box>
        <Form
          value={value}
          enablereinitialize="true"
          onChange={(nextValue) => setValue(nextValue)}
          onReset={() => setValue({})}
          onSubmit={({ value }) => {
            setValue(value);
            setShippingAddress({ ...value, total });
            localStorage.setItem(
              'address',
              JSON.stringify({ ...value, total })
            );
            //localStorage.removeItem('cart');
            //setCart([]);
            history.push('/placeorder');
          }}
        >
          <FormField
            name="name"
            htmlFor="text-input-id"
            label="Name"
            required="true"
          >
            <TextInput id="text-input-id" name="name" size="" />
          </FormField>
          <FormField
            name="phoneNum"
            htmlFor="phonenumber-input-id"
            label="PhoneNumber"
            required="true"
          >
            <TextInput id="phonenumber-input-id" name="phoneNum" />
          </FormField>
          <FormField
            name="address"
            htmlFor="address-input-id"
            label="Address"
            required="true"
          >
            <TextInput id="address-input-id" name="address" />
          </FormField>
          <FormField
            name="postcode"
            htmlFor="postcode-input-id"
            label="Post Code"
            required="true"
          >
            <TextInput id="postcode-input-id" name="postcode" />
          </FormField>
          {/* <FormField
            name="paymentmethod"
            htmlFor="paymentmethod-input-id"
            label="Payment Method"
            required="true"
          >
            <TextInput id="paymentmethod-input-id" name="paymentmethod" />
          </FormField> */}
          {/* <FormField
            name="paymentmethod"
            label="Payment Method"
            required="true"
          >
            <Select
              options={['PayPal', 'Striple', 'Momo', 'P2P']}
              value={paymentmethod}
              onChange={({ option }) => setPaymentMethod(option)}
            />
          </FormField> */}
          <Box direction="row" gap="medium" justify="center">
            <Button type="submit" primary label="Payment" />
            <Button type="reset" label="Reset" />
            <Button label="Cancel"></Button>
          </Box>
        </Form>
      </Box>
    </Grid>
  );
}
