import React from 'react';
 import { useField } from 'formik';
 import { Input } from 'reactstrap';
 
export const MyTextInput = ({ label, ...props }) => {
   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
   // which we can spread on <input>. We can use field meta to show an error
   // message if the field is invalid and it has been touched (i.e. visited)
   const [field, meta] = useField(props);
   return (
     <>
       <label htmlFor={props.id || props.name}>{label}</label>
       <Input className="text-input" {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="text-danger">{meta.error}</div>
       ) : null}
     </>
   );
 };
 
export const MyCheckbox = ({ children, ...props }) => {
   // React treats radios and checkbox inputs differently other input types, select, and textarea.
   // Formik does this too! When you specify `type` to useField(), it will
   // return the correct bag of props for you -- a `checked` prop will be included
   // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
   const [field, meta] = useField({ ...props, type: 'checkbox' });
   return (
     <div>
       <label className="checkbox-input">
         <Input type="checkbox" {...field} {...props} />
         {children}
       </label>
       {meta.touched && meta.error ? (
         <div className="text-danger">{meta.error}</div>
       ) : null}
     </div>
   );
 };
 
export const MySelect = ({ label, ...props }) => {
const [field, meta] = useField(props);
return (
    <div>
    <label htmlFor={props.id || props.name}>{label}</label>
    <Input type="select"  {...field} {...props} />
    {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
    ) : null}
    </div>
);
};
 
 