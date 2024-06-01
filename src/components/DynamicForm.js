
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import formConfig from '../formConfig.json';

const validationSchema = formConfig.reduce((schema, field) => {
  let validator = Yup.string();

  if (field.validation.required) {
    validator = validator.required('This field is required');
  }

  if (field.validation.regex) {
    validator = validator.matches(new RegExp(field.validation.regex), 'Invalid format');
  }

  return { ...schema, [field.name]: validator };
}, {});

const renderField = (field) => {
  switch (field.type) {
    case 'text':
    case 'password':
      return (
        <div key={field.name} className="mb-4">
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">{field.label}</label>
          <Field type={field.type} name={field.name} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          <ErrorMessage name={field.name} component="div" className="text-red-600 text-sm mt-1" />
        </div>
      );
    case 'select':
      return (
        <div key={field.name} className="mb-4">
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">{field.label}</label>
          <Field as="select" name={field.name} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Field>
          <ErrorMessage name={field.name} component="div" className="text-red-600 text-sm mt-1" />
        </div>
      );
    case 'radio':
      return (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{field.label}</label>
          {field.options.map((option) => (
            <div key={option} className="flex items-center">
              <Field type="radio" name={field.name} value={option} className="mr-2" />
              <span>{option}</span>
            </div>
          ))}
          <ErrorMessage name={field.name} component="div" className="text-red-600 text-sm mt-1" />
        </div>
      );
    case 'checkbox':
      return (
        <div key={field.name} className="mb-4">
          <div className="flex items-center">
            <Field type="checkbox" name={field.name} className="mr-2" />
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">{field.label}</label>
          </div>
          <ErrorMessage name={field.name} component="div" className="text-red-600 text-sm mt-1" />
        </div>
      );
    case 'file':
      return (
        <div key={field.name} className="mb-4">
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">{field.label}</label>
          <Field type="file" name={field.name} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
          <ErrorMessage name={field.name} component="div" className="text-red-600 text-sm mt-1" />
        </div>
      );
    default:
      return null;
  }
};

const DynamicForm = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
    <h2 className="text-2xl font-bold text-center text-blue-700 border-b-4 border-blue-700 w-fit m-auto mb-4">Dynamic Form</h2>
    <Formik
      initialValues={formConfig.reduce((values, field) => {
        values[field.name] = field.type === 'checkbox' ? false : '';
        return values;
      }, {})}
      validationSchema={Yup.object(validationSchema)}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form>
        {formConfig.map((field) => renderField(field))}
        <div className="mt-4">
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">Submit</button>
        </div>
      </Form>
    </Formik>
  </div>
);

export default DynamicForm;
