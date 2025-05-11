//
// This custom hook is a suggestion from Claude Ai
//

import { useState } from 'react';
import { validateField, validateForm } from '../helpers/formValidation';

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { id, value, dataset } = e.target;
    const validationKey = dataset.validation || id;

    setValues(prev => {
      const updated = { ...prev, [id]: value };
      validateField({
        id: validationKey,
        value,
        relatedValues: updated,
        setErrors
      });
      return updated;
    });
  }

  function handleSubmit(callback) {
    return (e) => {
      e.preventDefault();
      validateForm(values, setErrors);
      const hasErrors = Object.values(errors).some(error => error);
      if (!hasErrors) callback(values);
    };
  }

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setErrors
  };
}