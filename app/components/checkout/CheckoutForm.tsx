import React from 'react';
import {Button} from '~/components';
import {Form} from '@remix-run/react';

export const CheckoutForm: React.FC = () => {
  const inputStyles = `text-black`;
  const abVersion = Math.random() > 0.5 ? 'A' : 'B'; // todo: use A/B testing backend.

  return (
    <>
      <Form method="post" className={'py-8'}>
        <h1>Checkout Single Page: (A/B Version: {abVersion})</h1>
        <div className={'flex flex-col gap-8 my-8 text-black'}>
          <div className={'flex'}></div>
          <input
            className={inputStyles}
            type="text"
            placeholder={'email'}
            name={'email'}
          />
          <input
            className={inputStyles}
            type="text"
            name={'address1'}
            placeholder={'Address'}
          />
          <input
            type="text"
            name={'address2'}
            className={inputStyles}
            placeholder={'Appt, suite, etc..'}
          />
        </div>
        <p className={'mb-8'}>
          Prefilled details for the PoC:
          <ul>
            <li>Country: Dubai</li>
            <li>City: Dubai</li>
            <li>Province: Dubai</li>
          </ul>
        </p>
        <Button type="submit">Place Order</Button>
      </Form>
    </>
  );
};
