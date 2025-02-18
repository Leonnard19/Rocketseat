import { query as q } from 'faunadb';

import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { fauna } from '../../../services/fauna';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async session(params) {
      try {
        const email = 'leonard_santos@outlook.com';

        // working!! probably the issue was with the email
        // const userActiveSubscription = await fauna.query(
        //   q.Get(q.Match(q.Index('user_by_email'), q.Casefold(email)))
        // );

        // const userRef = await fauna.query(
        //   q.Select('ref', q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId)))
        // );

        // sub_1Nz7l6BRjPJLSP6C18w96fHD
        const customerId = 'cus_Omh8s8zlqTa7Is';

        //tests
        // const getCustomerIdByEmail = await fauna.query(
        //   q.Select(
        //     ['data', 'stripe_customer_id'],
        //     q.Get(q.Match(q.Index('user_by_email'), email))
        //   )
        // );

        // procurar como saber de qual collection estou pesquisando
        // index das subscriptions não estão funcionando aparentemente
        const getSubscriptionByCustomerId = await fauna.query(
          q.Get(q.Match(q.Index('subscription_by_user_ref'), q.Casefold(customerId)))
        );

        // const userActiveSubscription = await fauna.query(
        //   q.Get(
        //     q.Intersection([
        //       q.Match(
        //         q.Index('subscription_by_user_ref'), // customer id
        //         q.Select(
        //           ['data', 'status'],
        //           q.Get(q.Match(q.Index('user_by_email'), q.Casefold(email)))
        //         )
        //       ),

        //       q.Match(q.Index('subscription_by_status'), 'active'),
        //     ])
        //   )
        // );

        return {
          ...params.session,
          activeSubscription: getSubscriptionByCustomerId,
        };
      } catch {
        return {
          ...params.session,
          activeSubscription: null,
        };
      }
    },
    async signIn(params) {
      const { email } = params.user;

      try {
        await fauna.query(
          q.If(
            q.Not(q.Exists(q.Match(q.Index('user_by_email'), q.Casefold(email)))),
            q.Create(q.Collection('users'), { data: { email } }),
            q.Get(q.Match(q.Index('user_by_email'), q.Casefold(email)))
          )
        );

        return true;
      } catch {
        return false;
      }
    },
  },
});
