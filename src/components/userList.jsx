import Pay from './modal';
import style from '../assets/css/userList.module.css';
import { useState, useEffect } from 'react';

function UserList() {

  useEffect(() => {
    fetch('https://www.mocky.io/v2/5d531c4f2e0000620081ddce')
      .then((response) => response.json())
      .then((data) => setUser(data))
  }, []);

  const [user, setUser] = useState([]);
  const [selectUser, setSelectUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showUser, setShowUser] = useState(true);
  const renderModal = (username) => {
    setSelectUser(username);
    setModalVisible(true);
    const width = window.matchMedia('(max-width: 500px)');
    width.matches  ? setShowUser(false) : setShowUser(true);
  };
  const whenClose = () => {
    setShowUser(true);
    setModalVisible(false);
  };

  return (
    <>
      {showUser ? (
        <>
          {user.map((peoples) => (
            <div key={peoples.id} className={style.user}>

              <div className={`${style.userData}`}>
                <img id={style.userPicture} src={peoples.img} alt="peoples" />
              </div>

              <div className={style.userData}>

                <p>
                  {' '}
                  {`Nome: `}
                  <span> {peoples.name} </span>
                </p>

                <div className={style.userBox}>
                  <p className={style.text}>
                    <span> {` ID: #${peoples.id} `} - </span> {` Username: `}
                    <span className={style.user_fonts}>{peoples.username}</span>
                  </p>
                </div>

              </div>

              <div className={`${style.userData}`}>
                <button
                  type="button"
                  id={style.Button}
                  onClick={() => renderModal(peoples.username)}
                >
                  Pagar
                </button>
              </div>
            </div>
          ))}
        </>
      ) : null}

      {modalVisible ? (
        <Pay username={selectUser} closeButton={() => whenClose()} />
      ) : null}
    </>
  );
}
export default UserList;