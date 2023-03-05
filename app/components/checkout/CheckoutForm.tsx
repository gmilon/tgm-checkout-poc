import React from 'react';
import {Form} from '@remix-run/react';
import {
  IdentitySection,
  OrderReviewSection,
  PaymentSection,
  ShippingSection,
} from '~/components/checkout/CheckoutSections';
import {Versions} from '~/hooks/useAbTesting';

const CggVersion: React.FC = () => {
  return (
    <>
      <IdentitySection />
      <ShippingSection />
      <PaymentSection />
      <OrderReviewSection />
    </>
  );
};

const NonGccVersion: React.FC = () => {
  return (
    <div>
      <div
        className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-4"
        role="alert"
      >
        <p className="font-bold">
          We detected that you are not based in a GCC country
        </p>
        <p>For conversion reasons You should see a multi checkout page flow</p>
      </div>
      <div className={'border border-gray-500 p-8 rounded'}>
        TODO: Add a multi checkout page flow here for EU and US countries
      </div>
    </div>
  );
};

export const CheckoutForm: React.FC<{version: Versions}> = ({version}) => {
  return (
    <>
      <Form method="post" className={'py-8 w-full max-w-2xl'}>
        <h1>Checkout Single Page: (A/B Version: {version})</h1>
        {version === Versions.NonCgg ? <NonGccVersion /> : <CggVersion />}
      </Form>
    </>
  );
};
