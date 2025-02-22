import { stripe } from './../../../services/stripe';
import { fauna } from './../../../services/fauna';

import { query as q } from 'faunadb';

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {

  // old strategy
  // const userRef = await fauna.query(
  //   q.Select('ref', q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId)))
  // );

  const stripeUser = await fauna.query(
    q.Select(
      ['data', 'stripe_customer_id'],
      q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId))
    )
  );

  // sub_1Nz7l6BRjPJLSP6C18w96fHD
  // cus_Omh8s8zlqTa7Is

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: stripeUser,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  if (createAction) {
    await fauna.query(
      q.Create(q.Collection('subscriptions'), {
        data: subscriptionData,
      })
    );
  } else {
    await fauna.query(
      q.Replace(
        q.Select('ref', q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId))),
        { data: subscriptionData }
      )
    );
  }
}
