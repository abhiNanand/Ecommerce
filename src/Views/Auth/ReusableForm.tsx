
import { useFormik } from 'formik';
import {
  handleChange as handleInputChange,
  handleChangePassword,
} from '../../Shared/Utilities';
import * as Yup from 'yup';
import { ReactNode, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const getInputType = (
  showPasswordToggle: boolean | undefined,
  showPassword: boolean,
  defaultType: string
): string => {
  if (!showPasswordToggle) {
    return defaultType;
  }
  return showPassword ? 'text' : defaultType;
};
interface FormField {
  name: string;
  type: string;
  label?: string;
  placeholder: string;
  validation: Yup.AnySchema;
  showPasswordToggle?: boolean;
}

interface ReusableFormProps {
  initialValues: Record<string, string>;
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: (values: any, actions: any) => void;
  fields: FormField[];
  submitButtonText: string;
  isSubmitting: boolean;
  children?: ReactNode;
  customComponents?: Record<string, ReactNode>;
}

export const ReusableForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  submitButtonText,
  isSubmitting,
  children,
  customComponents,
}: ReusableFormProps) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const [showPassword, setShowPassword] = useState<Record<string, boolean>>(
    fields.reduce(
      (acc, field) => {
        if (field.showPasswordToggle) {
          acc[field.name] = false;
        }
        return acc;
      },
      {} as Record<string, boolean>
    )
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;

    if (fieldName === 'password') {
      handleChangePassword(e, formik);
    } else {
      handleInputChange(e, formik);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    formik.handleBlur(e);
  };

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {fields.map((field) => {
        if (customComponents?.[field.name]) {
          return customComponents[field.name];
        }

        return (
          <div key={field.name} className="input-group">
            {field.label && <label htmlFor={field.name}>{field.label}</label>}
            <div
              className={
                field.showPasswordToggle ? 'input-password-wrapper' : ''
              }
            >
              <input
                id={field.name}
                name={field.name}
                type={getInputType(
                  field.showPasswordToggle,
                  showPassword[field.name],
                  field.type
                )}
                placeholder={field.placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
                value={formik.values[field.name]}
                className={
                  formik.touched[field.name] && formik.errors[field.name]
                    ? 'error'
                    : ''
                }
              />
              {field.showPasswordToggle &&
                formik.values[field.name] &&
                (showPassword[field.name] ? (
                  <EyeOff
                    className="eye-icon"
                    size={20}
                    onClick={() => togglePasswordVisibility(field.name)}
                  />
                ) : (
                  <Eye
                    className="eye-icon"
                    size={20}
                    onClick={() => togglePasswordVisibility(field.name)}
                  />
                ))}
            </div>
            {formik.touched[field.name] && formik.errors[field.name] && (
              <div className="error-text">
                {String(formik.errors[field.name])}
              </div>
            )}
          </div>
        );
      })}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? `${submitButtonText}...` : submitButtonText}
      </button>
      {children}
    </form>
  );
};