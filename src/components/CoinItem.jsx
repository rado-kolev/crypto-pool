import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const CoinItem = ({ coin }) => {
  const [savedCoin, setSavedCoin] = useState(false);
  const { user } = UserAuth();

  useEffect(() => {
    if (user?.email) {
      const checkIfSaved = async () => {
        const userDocRef = doc(db, 'users', user.email);
        const userDoc = await getDoc(userDocRef);
        const watchList = userDoc.data()?.watchList || [];
        const isSaved = watchList.some((savedCoin) => savedCoin.id === coin.id);
        setSavedCoin(isSaved);
      };

      checkIfSaved();
    }
  }, [user?.email, coin.id]);

  const coinPath = doc(db, 'users', `${user?.email}`);
  const saveCoin = async () => {
    if (user?.email) {
      setSavedCoin(true);
      await updateDoc(coinPath, {
        watchList: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
        }),
      });
    } else {
      alert('Please sign in to save a coin to your list!');
    }
  };

  const removeCoin = async () => {
    if (user?.email) {
      setSavedCoin(false);
      const coinToRemove = {
        id: coin.id,
        name: coin.name,
        image: coin.image,
        rank: coin.market_cap_rank,
        symbol: coin.symbol,
      };

      const userDocRef = doc(db, 'users', user.email);

      // Remove the coin from the user's watch list in the database
      const userDoc = await getDoc(userDocRef);
      const watchList = userDoc.data()?.watchList || [];
      const updatedWatchList = watchList.filter(
        (savedCoin) => savedCoin.id !== coinToRemove.id
      );

      await updateDoc(userDocRef, {
        watchList: updatedWatchList,
      });
    }
  };

  return (
    <tr className='h-[80px] border-b last:border-b-0 overflow-hidden'>
      <td onClick={savedCoin ? removeCoin : saveCoin}>
        {savedCoin ? (
          <AiFillStar className='cursor-pointer' />
        ) : (
          <AiOutlineStar className='cursor-pointer' />
        )}
      </td>
      <td>{coin.market_cap_rank}</td>
      <td>
        <Link to={`/coin/${coin.id}`}>
          <div className='flex flex-col md:flex-row items-center'>
            <img
              className='w-6 md:mr-2 rounded-full'
              src={coin.image}
              alt={coin.id}
            />
            <p className='text-xs md:text-base hover:text-accent'>{coin.symbol.toUpperCase()}</p>
          </div>
        </Link>
      </td>
      <td className='hidden md:table-cell'>{coin.name}</td>
      <td>${coin.current_price.toLocaleString()}</td>
      <td>
        {coin.price_change_percentage_24h > 0 ? (
          <p className='text-green-600'>
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        ) : (
          <p className='text-red-600'>
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        )}
      </td>
      <td className='w-[130px] lg:w-[180px] hidden md:table-cell'>
        ${coin.total_volume.toLocaleString()}
      </td>
      <td className='w-[130px] lg:w-[180px] hidden md:table-cell'>
        ${coin.market_cap.toLocaleString()}
      </td>
      <td>
        <Sparklines data={coin.sparkline_in_7d.price}>
          <SparklinesLine color='teal' />
        </Sparklines>
      </td>
    </tr>
  );
};

CoinItem.propTypes = {
  coin: PropTypes.object.isRequired,
};

export default CoinItem;
