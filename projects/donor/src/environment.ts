// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    
  
    cloudFunctions : {
      createOrder: 'https://createorder-uuc4lf2xaa-uc.a.run.app',
      getOrderById: 'https://us-central1-kittyconnect-68a81.cloudfunctions.net/getOrderById?id=',
      capturePayment: 'https://us-central1-kittyconnect-68a81.cloudfunctions.net/capturePayments',
  
      
      createRefund:'https://us-central1-kittyconnect-68a81.cloudfunctions.net/createRefund',
      getRefundDetails:'https://us-central1-kittyconnect-68a81.cloudfunctions.net/getRefundDetails',
    },
  
    RAZORPAY_KEY_ID: 'rzp_test_A9Kod2RLWyBi4k',
    RAZORPAY_DOMAIN:'https://api.razorpay.com/v1/',
  };
  