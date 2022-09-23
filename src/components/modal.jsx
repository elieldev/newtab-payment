import style from '../assets/css/modal.module.css';
import Mask from './maskMoney';
import { cards } from './card';
import React, { useState } from 'react';
import Accepted from './validation/accepted';
import Denied from './validation/denied';

function Pay({ username, closeButton}) {
  const [titleModal, setTitleModal] = useState();
  const [hiddenModal, setHiddenModal] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [denied, setDenied] = useState(false);

  const addPay = async (e) => {
    e.preventDefault();
    let newTitle = document.getElementById('title');
    setTitleModal((newTitle.innerHTML = 'Recibo de Pagamento'));

    setHiddenModal(false);
    const formData = new FormData(e.target);
    const value = formData.get('amountPaid');
    const card = formData.get('selectCard');
    const selectionCard = cards.find(
      (objectCard) => objectCard.card_number === card,
    );

    (
      await fetch(
        'https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989',
        {
          method: 'POST',
          body: {
            card_number: card,
            cvv: selectionCard,
            expiry_date: selectionCard.expiry_date,
            destination_user_id: username.id,
            value: value,
          },
        },
      )
    ).json();

    card === '1111111111111111' ? setAccepted(true) : setDenied(true);
  };

  return (
    <>
      <form onSubmit={addPay}>
        <div className={style.container}>
          <div className={style.modal_container}>
            <div className={style.nav_container}>
              <h1
                id="title"
                className={style.title_h1}
                value={titleModal}
                onChange={addPay}
              >
                Pagamento para <span className={style.user_fonts}> {username} </span>{' '}
              </h1>

              <button type="button" id={style.close_tab} onClick={closeButton}>
                x
              </button>
            </div>

            {hiddenModal ? (
              <>
                <input
                  type="text"
                  placeholder="R$: 0,00"
                  onKeyUp={Mask}
                  maxLength={30}
                  required
                />
                <select name="selectCard" defaultValue={'info_card'}>
                  <option disabled></option>,
                  {/* Ira retornar os cartoes listados do fetch em um novo array */}
                  {cards.map((card) => {
                    return (
                      <option key={card.card_number} value={card.card_number}>
                        Cartão com final {card.card_number.substring(12)}
                      </option>
                    );
                  })}
                </select>

                <input
                  className={style.pay_button}
                  type="submit"
                  value={'Pagar'}
                />
              </>
            ) : null}

            {accepted && <Accepted username={username} />}
            {denied && <Denied />}
          </div>
        </div>
      </form>
    </>
  );
}

export default Pay;
