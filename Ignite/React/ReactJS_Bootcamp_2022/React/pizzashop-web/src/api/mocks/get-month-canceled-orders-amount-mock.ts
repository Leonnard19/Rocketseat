import { http, HttpResponse } from 'msw'

import { GetMonthCanceledOrdersAmountResponse } from '../get-month-cancelled-orders-amount'

export const getMonthCancelledOrdersAmountMock = http.get<
  never,
  never,
  GetMonthCanceledOrdersAmountResponse
>('/metrics/month-canceled-orders-amount', () => {
  return HttpResponse.json({
    amount: 5,
    diffFromLastMonth: -5,
  })
})
