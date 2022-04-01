import './form-input.styles.scss';

const FormInput = ({ label, ...otherProps }) => { //otherPros are type, required, onChange, name, value etc.
  return (
    <div className='group'>
      <input className='form-input' {...otherProps} />
      {label && (
        <label 
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      )} 
    </div>
  );
};

export default FormInput;