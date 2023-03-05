import React, {useMemo} from 'react';
import {Button} from '~/components';
import {Input} from '~/components/Input';
import {useActionData} from '@remix-run/react';

const FormSection: React.FC<{title: string; children: React.ReactNode}> = ({
  title,
  children,
}) => {
  return (
    <div className={'my-8 px-4 md:px-0'}>
      <div className={'bg-gray-300 rounded p-4 font-bold mb-4'}>
        <h2>{title}</h2>
      </div>

      {children}
    </div>
  );
};

export const OrderReviewSection: React.FC<{loading: boolean}> = ({loading}) => {
  const placeOrderBtnText = useMemo(() => {
    if (loading) {
      return 'Placing your order...';
    }
    return 'Complete Order';
  }, [loading]);

  return (
    <FormSection title={'Review'}>
      <div className={'w-full mx-auto'}>
        {/* todo, fetch the cart from the API */}
        <div className={'border p-8 mb-4'}>
          <div className={'flex gap-4'}>
            <div>
              <img
                className={'w-[140px]'}
                src="https://cdn.shopify.com/s/files/1/0729/3301/5873/products/img-tshirt.webp?v=1677996295&width=1426"
              />
            </div>
            <div>
              <p>Item: T-Shirt Demo</p>
              <p>Qantity: 1 x $0.00</p>
            </div>
          </div>
        </div>
        <div className={'flex justify-end'}>
          <Button
            type="submit"
            className={'w-full md:w-auto'}
            disabled={loading}
          >
            {placeOrderBtnText}
          </Button>
        </div>
      </div>
    </FormSection>
  );
};

export const PaymentSection = () => {
  return (
    <FormSection title={'Payment'}>
      <div
        className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
        role="alert"
      >
        <p className="font-bold">Free Item</p>
        <p>
          For the PoC you will be checking out a Free Item. No payment methods
          are required.
        </p>
      </div>
    </FormSection>
  );
};

export const IdentitySection = () => {
  const action = useActionData();
  const [email, setEmail] = React.useState('gui.milon@gmail.com');
  return (
    <FormSection title={'Identity'}>
      <div className={'flex flex-wrap gap-4'}>
        <Input
          label={'Email'}
          placeholder={'john@doe.com'}
          name={'email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={'mb-4 grow'}
          error={action?.error?.email}
        />
        <Input label={'First Name'} placeholder={'John'} name={'firstname'} />
        <Input label={'Last Name'} placeholder={'Doe'} name={'firstname'} />
      </div>
    </FormSection>
  );
};

export const ShippingSection = () => {
  return (
    <FormSection title={'Shipping & Billing address'}>
      <div className={'flex flex-wrap gap-4 mb-4'}>
        <Input
          label={'City'}
          placeholder={'Dubai'}
          name={'city'}
          value={'Dubai'}
          className={'grow'}
          disabled
        />
        <Input
          label={'Country'}
          placeholder={'UAE'}
          name={'country'}
          value={'AE'}
          className={'grow'}
          disabled
        />
        <Input
          label={'Emirate'}
          placeholder={'Dubai'}
          name={'province'}
          value={'Dubai'}
          className={'grow'}
          disabled
        />
        <Input
          label={'Address line 1'}
          placeholder={'Address'}
          className={'grow'}
          name={'address1'}
        />
        <Input
          label={'Address line 2'}
          placeholder={'Building name, villa Number, etc'}
          name={'address2'}
          className={'grow'}
        />
      </div>
      <p>Note: for the Poc the Shipping is the Billing address</p>
    </FormSection>
  );
};
