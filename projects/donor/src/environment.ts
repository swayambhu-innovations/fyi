// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    
  
    cloudFunctions : {
      createOrder: 'https://createorder-uuc4lf2xaa-uc.a.run.app',
      createOrderLocalHost:"http://127.0.0.1:5001/fyi1-aa2c2/us-central1/createOrder",
      getOrderById: 'https://us-central1-kittyconnect-68a81.cloudfunctions.net/getOrderById?id=',
      capturePayment: 'https://us-central1-kittyconnect-68a81.cloudfunctions.net/capturePayments',
  
      
      createRefund:'https://us-central1-kittyconnect-68a81.cloudfunctions.net/createRefund',
      getRefundDetails:'https://us-central1-kittyconnect-68a81.cloudfunctions.net/getRefundDetails',
    },
  
    RAZORPAY_KEY_ID: 'rzp_live_wMevmKrUh5pkfg',
    RAZORPAY_DOMAIN:'https://api.razorpay.com/v1/',
  };
  