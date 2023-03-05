import React from 'react';
import {Form} from '@remix-run/react';
import {
  IdentitySection,
  OrderReviewSection,
  PaymentSection,
  ShippingSection,
} from '~/components/checkout/CheckoutSections';
import {Versions} from '~/hooks/useAbTesting';

export const CheckoutForm: React.FC<{version: Versions}> = ({version}) => {
  return (
    <>
      <Form method="post" className={'py-8 w-full max-w-2xl'}>
        <h1>Checkout Single Page: (A/B Version: {version})</h1>
        <IdentitySection />
        <ShippingSection />
        <PaymentSection />
        <OrderReviewSection />
      </Form>
    </>
  );
};
