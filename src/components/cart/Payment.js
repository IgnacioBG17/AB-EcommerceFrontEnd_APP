import React, { Fragment, useState } from "react";
import MetaData from "../layout/MetaData";
import { CheckoutSteps } from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { confirmPayment } from "../../actions/orderAction";
import { loadStripe } from "@stripe/stripe-js";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Wrapper = (props) => (
  <Elements stripe={loadStripe(localStorage.getItem("stripeapi"))}>
    <Payment {...props} />
  </Elements>
)

const Payment = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useSelector((state) => state.security);
  const { stripeApiKey, clientSecret, order } = useSelector(
    (state) => state.order
  );
  const { shoppingCartId } = useSelector((state) => state.cart);
  const [isProcessing, setIsProcessing] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: `${user.nombre} ${user.apellido}`,
            email: user.email,
          },
        },
      });

      if (result.error) {
        alert.error(result.error.message);
        setIsProcessing(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          const params = {
            orderId: order.id,
            shoppingCartId: shoppingCartId,
          };

          dispatch(confirmPayment(params));
          navigate("/success");
        } else {
          alert.error("Errores en el procesamiento del pago");
          setIsProcessing(false);
        }
      }
    } catch (error) {
      alert.error(error?.response?.data?.message || "Error en el pago")
      setIsProcessing(false);
    }
  };

  return (
    <Fragment>
      <MetaData titulo={"Medio de pago"} />
      <CheckoutSteps envio confirmarOrden payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Información de tarjeta</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Número de tarjeta</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Fecha de vencimiento</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">CVC/CVV</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>

            <button 
                id="pay_btn" 
                type="submit" 
                className="btn btn-block py-3"
                disabled={isProcessing}
            >
              {isProcessing ? "Procesando..." : "Pagar"}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Wrapper;
