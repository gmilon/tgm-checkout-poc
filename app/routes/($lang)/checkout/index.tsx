import {json, type LoaderArgs, redirect} from '@shopify/remix-oxygen';
import {ActionFunction} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {
  CheckoutCompleteFreePayload,
  CheckoutCreateInput,
  CheckoutCreatePayload,
  CheckoutUserError,
} from '@shopify/hydrogen/dist/storefront-api-types';
import {AppLoadContext} from '@remix-run/server-runtime/dist/data';
import {CheckoutForm} from '~/components/checkout/CheckoutForm';
import {LoaderFunction} from '@remix-run/router';
import {getClientIPAddress} from 'remix-utils';
import {useABVersion} from '~/hooks/useAbTesting';

const createCheckout = async (context: AppLoadContext) => {
  const checkoutData: CheckoutCreateInput = {
    email: 'pigoyis126@v2ssr.com',
    allowPartialAddresses: true,
    shippingAddress: {
      address1: '123 Main St',
      city: 'Dubai',
      address2: 'Apt 1',
      country: 'AE',
      firstName: 'Pigoy',
      lastName: 'Mln',
      province: 'Dubai',
    },
    lineItems: [
      {
        quantity: 1,
        variantId: 'gid://shopify/ProductVariant/44688572809537',
      },
    ],
  };
  const {checkoutCreate} = await context.storefront.mutate<{
    checkoutCreate: CheckoutCreatePayload;
    checkoutUserErrors: CheckoutUserError[];
  }>(CREATE_CHECKOUT_MUTATION, {
    variables: {
      input: checkoutData,
    },
  });
  await assignCheckoutShippingLine(checkoutCreate.checkout, context);
  return checkoutCreate;
};

const assignCheckoutShippingLine = async (
  checkout: CheckoutCreatePayload['checkout'],
  context: AppLoadContext,
) => {
  const shippingRateHandle =
    checkout?.availableShippingRates?.shippingRates?.[0].handle;
  const checkoutId = checkout?.id;
  await context.storefront.mutate<{
    checkoutCreate: CheckoutCreatePayload;
    checkoutUserErrors: CheckoutUserError[];
  }>(CHECKOUT_UPDATE_SHIPPING_ADDRESS_MUTATION, {
    variables: {
      checkoutId,
      shippingRateHandle,
    },
  });
};

const placeOrder = async (checkoutId: string, context: AppLoadContext) => {
  await context.storefront.mutate<{
    checkoutCompleteFree: CheckoutCompleteFreePayload;
    checkoutUserErrors: CheckoutUserError[];
  }>(CHECKOUT_COMPLETE_FREE_MUTATION, {
    variables: {
      checkoutId,
    },
  });
};

export const loader: LoaderFunction = async ({request}) => {
  // get the country code from the request
  let detectedCountry = request.headers.get('CF-IPCountry');
  if (!detectedCountry) {
    const detectedIp = getClientIPAddress(request);
    // todo, get it from a geoip service
    detectedCountry = 'ae';
  }
  return json({
    detectedCountry,
  });
};

export const action: ActionFunction = async ({context, params: {lang}}) => {
  // todo: inject form data here.
  const {checkout} = await createCheckout(context);
  const checkoutId = checkout?.id;
  if (!checkoutId) {
    return json({error: 'Missing checkoutId'}, {status: 400});
  }
  await placeOrder(checkoutId, context);
  const successPath = '/checkout/success';
  return redirect(lang ? `${lang}${successPath}` : successPath);
};

export default function Checkout() {
  const {detectedCountry} = useLoaderData<typeof loader>();
  const version = useABVersion(detectedCountry);
  return (
    <div className={'flex justify-center'}>
      <CheckoutForm version={version} />
    </div>
  );
}

const CREATE_CHECKOUT_MUTATION = `#graphql
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        availableShippingRates {
          shippingRates {
            title
            handle
            price {
              amount
              currencyCode
            }
          }
          ready
        }
      }
      checkoutUserErrors {
        message
      }
    }
  }
`;

const CHECKOUT_COMPLETE_FREE_MUTATION = `#graphql
mutation checkoutCompleteFree($checkoutId: ID!) {
  checkoutCompleteFree(checkoutId: $checkoutId) {
    checkout {
      id
    }
    checkoutUserErrors {
      message
    }
  }
}
`;

const CHECKOUT_UPDATE_SHIPPING_ADDRESS_MUTATION = `#graphql
mutation checkoutShippingLineUpdate($checkoutId: ID!, $shippingRateHandle: String!) {
  checkoutShippingLineUpdate(checkoutId: $checkoutId, shippingRateHandle: $shippingRateHandle) {
    checkout {
      id
    }
    checkoutUserErrors {
      message
    }
  }
}
`;
