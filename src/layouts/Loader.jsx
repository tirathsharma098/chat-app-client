import { ColorRing } from 'react-loader-spinner';

const Loader = () => {
  return (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#f1db5c', '#f1cd59', '#f1c056', '#f1b153', '#f1a250']}
    />
  );
};
export default Loader;
