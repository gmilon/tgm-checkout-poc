import React from 'react';
import {buttonStyle} from '~/components/Button';

export default function Success() {
  return (
    <div className={'flex justify-center m-12'}>
      <div>
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
          role="alert"
        >
          <p className="font-bold">Success</p>
          <p>
            Your order has been successfully placed. You will receive an email
          </p>
        </div>
        <a
          href={'https://demo-tgm-checkout.myshopify.com/'}
          className={buttonStyle}
        >
          Go back to the Shop
        </a>
      </div>
    </div>
  );
}
