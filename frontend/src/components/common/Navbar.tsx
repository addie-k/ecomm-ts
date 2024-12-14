import { useNavigate } from 'react-router-dom';
import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import styles from '../../styles/components/common/Navbar.module.scss'
import { CiShoppingCart } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";


type SearchResult = {
  id: string;
  name: string;
};

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [cookies] = useCookies(['auth_token']);
  const [showMenu, setShowMenu] = useState(false)
  const userBtnToggle = () => {
    setShowMenu(prev => !prev)
  }
  const homeClick = () => {
    navigate('/home');
  };

  const productClick = () => {
    navigate('/products')
  }

  const MyCartClick = () => {
    navigate('/my-cart');
  };

  const signOutClick = () => {
    navigate('/');
    // removeCookies('auth_token');
  };

  const profileClick = () => {
    navigate('/my-addresses');
  }

  const MyOrdersClick = () => {
    navigate('/my-orders')
  }

  const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      const token = cookies.auth_token;
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await axios.get<SearchResult[]>(
          `${import.meta.env.VITE_API_BASE_URL}/search`,
          {
            params: { query },
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (id: string) => {
    navigate(`/product/${id}`);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className={styles['header']}>
      <nav className={styles['nav']}>
        <ul className={styles['nav-list']}>
          <li className={styles['nav-item']} onClick={homeClick}>
            company
          </li>
          <li className={styles['nav-item']} onClick={productClick}>
            Products
          </li>

          <li className={styles['nav-item']} onClick={profileClick}>
            Addresses
          </li>
        </ul>

        <div className={styles['search-container']} >
          <input
            type="text"
            placeholder="Search"
            className={styles['search-input']}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchResults.length > 0 && (
            <ul className={styles['search-results']}>
              {searchResults.map((item) => (
                <li
                  key={item.id}
                  className={styles["search-result-item"]}
                  onClick={() => handleResultClick(item.id)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles['nav-right']}>
          <button className={styles['my-orders-btn']} onClick={MyCartClick}>
            <CiShoppingCart className={styles['my-cart-icon']} />
          </button>

          {(
            <button className={styles['my-orders-btn']} onClick={userBtnToggle}>
              <FaRegUserCircle className={styles['my-cart-icon']} />
            </button>
          )}

          {showMenu && (
            <div className={styles['hamburger-menu']}>
              <button
                className={styles['menu-item-back']}
                onClick={userBtnToggle}
              >
                Close
              </button>
              <button
                className={styles['menu-item']}
                onClick={() => {
                  MyOrdersClick();
                  userBtnToggle();
                }}
              >
                My Orders
              </button>
              <button
                className={styles['menu-item']}
                onClick={() => {
                  signOutClick();
                  userBtnToggle();
                }}
              >
                Sign Out
              </button>

            </div>
          )}
        </div>

      </nav>
    </div>

  );
};

export default Navbar;
