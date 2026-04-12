import { NextResponse } from "next/server";

export const response = (success, statusCode, message, data = {}) => {
  return NextResponse.json({ success, statusCode, message, data });
};

// export const catchError = (error, customMessage) => {

//   // handle duplicate key error
//   if (error.code === 11000) {
//     const keys = Object.keys(error.keyPattern).join(",");
//     error.message = `Duplicate fields: ${keys}. This filed value must be unique`;
//   }

//   let errorObj = {}

//   if(process.env.NODE_ENV === 'development'){
//     errorObj = {
//       message : error.message,
//       error
//     }
//   }
//   else{
//       errorObj = {
//       message : customMessage || 'Internal Server Error'
//     }
//   }
 
//   return response(false, error.code, errorObj)
// };


export const catchError = (error, customMessage) => {
  if (error.code === 11000) {
    const keys = Object.keys(error.keyPattern).join(",");
    error.message = `Duplicate fields: ${keys}. This field value must be unique`;
  }

  let errorObj = {};

  if (process.env.NODE_ENV === 'development') {
    errorObj = { message: error.message, error };
  } else {
    errorObj = { message: customMessage || 'Internal Server Error' };
  }

  // ✅ Pass errorObj as `data`, use a proper status code
  return response(false, 500, errorObj.message, errorObj);
};