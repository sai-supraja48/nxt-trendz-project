import {useState} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => {
  const [isCodSelected, setIsCodSelected] = useState(false)
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        const total = cartList.reduce(
          (acc, eachItem) => acc + eachItem.price * eachItem.quantity,
          0,
        )

        return (
          <div className="summary-container">
            <h1 className="order-total-value">Order Total: Rs {total}/-</h1>

            <p className="total-items">{cartList.length} Items in cart</p>

            <Popup
              modal
              trigger={
                <button type="button" className="checkout-btn">
                  Checkout
                </button>
              }
            >
              {close => (
                <div className="popup-container">
                  <h1 className="payment-heading">Payment Methods</h1>

                  <div className="payment-option">
                    <input id="card" type="radio" disabled />
                    <label htmlFor="card">Card</label>
                  </div>

                  <div className="payment-option">
                    <input id="netBanking" type="radio" disabled />
                    <label htmlFor="netBanking">Net Banking</label>
                  </div>

                  <div className="payment-option">
                    <input id="upi" type="radio" disabled />
                    <label htmlFor="upi">UPI</label>
                  </div>

                  <div className="payment-option">
                    <input id="wallet" type="radio" disabled />
                    <label htmlFor="wallet">Wallet</label>
                  </div>

                  <div className="payment-option">
                    <input
                      id="cod"
                      type="radio"
                      checked={isCodSelected}
                      onChange={() => setIsCodSelected(true)}
                    />
                    <label htmlFor="cod">Cash on Delivery</label>
                  </div>

                  <p>{cartList.length} Items</p>

                  <p className="total-text">Total: Rs {total}</p>

                  <button
                    type="button"
                    className="confirm-btn"
                    disabled={!isCodSelected}
                    onClick={() => setIsOrderPlaced(true)}
                  >
                    Confirm Order
                  </button>

                  {isOrderPlaced && (
                    <p className="success-text">
                      Your order has been placed successfully
                    </p>
                  )}

                  <button type="button" className="close-btn" onClick={close}>
                    Close
                  </button>
                </div>
              )}
            </Popup>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
