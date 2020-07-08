import styles from './ApplicationForm.module.css';
import { useState } from 'react';
import Link from 'next/link';

interface ApplicationFormProps {
  lenderId: string;
  data: {
    name: string;
    fields: string[];
  };
}

type Status = 'idle' | 'saving' | 'error' | 'accepted' | 'declined';

interface FormState {
  [x: string]: string;
}

export function ApplicationForm({ lenderId, data }: ApplicationFormProps) {
  const { name = '', fields = [] } = data;
  const initialState = fields.reduce((fieldsObject, field) => {
    return { ...fieldsObject, [field]: '' };
  }, {});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [state, setState] = useState<FormState>(initialState);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus('saving');

    const hasError = Object.keys(state).some((field) => state[field] === '');

    if (hasError) {
      setStatus('error');
      setErrorMessage('All fields are required');

      return;
    }

    try {
      const response = await fetch(`/api/lenders/${lenderId}`, {
        method: 'POST',
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      if (data.decision === 'accepted') {
        setStatus('accepted');
        setErrorMessage('');
      }

      if (data.decision === 'declined') {
        setStatus('declined');
        setErrorMessage('');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message);

      console.error(`Error: `, error.message);
    }
  };

  return (
    <div className={styles.box}>
      <Link href="/">
        <a className={styles.viewAllLink}>&lt; View All Lenders</a>
      </Link>

      <h1 className={styles.title}>{name}</h1>

      <form onSubmit={onSubmit} className={styles.form}>
        {fields.map((field, index) => {
          const labelText = field
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          return (
            <div key={index} className={styles.field}>
              <label htmlFor={field} className={styles.label}>
                {labelText}
              </label>
              <input
                className={styles.input}
                id={field}
                name={field}
                type="text"
                value={state[field]}
                onChange={onChange}
              />
            </div>
          );
        })}

        <button
          className={styles.submitButton}
          disabled={status === 'saving'}
          type="submit"
        >
          {status === 'saving' ? 'Saving...' : 'Save'}
        </button>

        {status === 'accepted' && (
          <div className={styles.accepted}>You have been accepted</div>
        )}

        {status === 'declined' && (
          <div className={styles.declined}>You have been declined</div>
        )}

        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </form>
    </div>
  );
}
