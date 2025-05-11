//
// Validation functions are refactored and checked for errors by claudeAi
//  to work with the custom hook useForm.


export function validateField({ id, value, relatedValues = {}, setErrors }) {
  if (id === 'email') {
    if (!value) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      setErrors(prev => ({ ...prev, email: 'Valid email: <name@domain.xx>' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  }

  else if (id === 'password') {
    if (!value) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{6,}).*$/.test(value)
    ) {
      setErrors(prev => ({ ...prev, password: 'Invalid Password' }));
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
    }

    if (relatedValues.confirmPassword && value !== relatedValues.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    } else {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  }

  else if (id === 'confirmPassword') {
    if (value !== relatedValues.password) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    } else {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  }
}

export function validateForm(formData, setErrors) {
  Object.entries(formData).forEach(([key, value]) => {
    validateField({ id: key, value, relatedValues: formData, setErrors });
  });
}