import img from './error.gif';

const ErrorMassage = () => {
  return (
    <img
      security={{
        display: 'block',
        with: '250px',
        height: '250px',
        objectFit: 'contain',
        margin: '0 auto',
      }}
      src={img}
      alt='error'
    />
  );
};

export default ErrorMassage;
