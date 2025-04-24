// import './Login.scss';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import {toast} from 'react-toastify';
// import {
//     sendPasswordResetEmail,
// } from 'firebase/auth';
// import { auth } from '../../../Services/firebase/firebase';
// export default function forgetPassword() {

//     const formik = useFormik<FormValues>({
//         initialValues: {
//           email: '',
//         },
//         validationSchema: Yup.object({
//           email: Yup.string()
//             .matches(
//               /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
//               'Enter a valid email address'
//             ),
//         }),
//         onSubmit: async () => {
//             if (!formik.values.email) {
//                 toast.warning('Please enter your email first');
//                 return;
//               }
//           try {
            
//             await sendPasswordResetEmail(auth, formik.values.email);
//           } catch (error) {
//             if (error instanceof Error)
//                 toast.error('failed');
//         }
//         },
//       });

//       const handleForgetPassword = async () => {
//         if (!formik.values.email) {
//             toast.warning('Please enter your email first');
//             return;
//         }
//         try {
            
//         } 
//     };


//     return (
//         <div className="forgetPassword"><div className="forgetPasswordWindow">
//             <label>Enter Eamil Address</label><br />
//             <input
//                 id="email"
//                 name="email"
//                 type="text"
//                 placeholder="Email address"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}

//             />
//             {formik.touched.email && formik.errors.email && (
//                 <div className="error-text">{formik.errors.email}</div>
//             )}

//             <button onClick={() => { setForgetPasswordWindow(false); }}>Cancel</button>
//             <button onClick={() => { handleForgetPassword(); setForgetPasswordWindow(false); toast.success("Reset email sent! Check your inbox") }}>Send Reset Email Link</button>
//         </div>
//         </div>
//     );
// }