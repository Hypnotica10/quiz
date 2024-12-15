// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { ChangeEvent, ChangeEventHandler, useState } from "react";

// export const useHandleOnChange = <T extends { [K: string]: any }>(
//   initialValues: T
// ): {
//   values: T;
//   handleOnChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
// } => {
//   const [values, setValues] = useState<T>(initialValues);

//   const handleOnChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const type = e.target.type;
//     if (type === "checkbox") {
//       if (e.target.checked) {
//         setValues({
//           ...values,
//           [e.target.name]: [...values[e.target.name], e.target.value],
//         });
//         return;
//       } else {
//         setValues({
//           ...values,
//           [e.target.name]: values[e.target.name].filter(
//             (item: string) => item !== e.target.value
//           ),
//         });
//         return;
//       }
//     }
//     setValues((values) => ({
//       ...values,
//       [e.target.name]: e.target.value,
//     }));
//   };
//   return {
//     handleOnChange,
//     values,
//   };
// };
