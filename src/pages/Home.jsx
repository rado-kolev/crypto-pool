import CoinSearch from '../components/CoinSearch';
import PropTypes from 'prop-types';
import Trending from '../components/Trending';

const Home = ({ coins }) => {
  return (
    <div>
      <CoinSearch coins={coins} />
      <Trending />
    </div>
  );
};

Home.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Home;
