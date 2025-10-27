import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetUpdateStatus } from "../../slices/securitySlice";
import { useAlert } from "react-alert";
import { saveAddressInfo } from "../../actions/cartAction";
import {CheckoutSteps} from "./CheckoutSteps";

const Shipping = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { direccionEnvio, isUpdated, errores, loading } = useSelector(
    (state) => state.security
  );
  const { countries } = useSelector((state) => state.country);

  const [direccion, setDireccion] = useState(direccionEnvio ? direccionEnvio.direccion : "");
  const [ciudad, setCiudad] = useState(direccionEnvio ? direccionEnvio.ciudad : "");
  const [departamento, setDepartamento] = useState(direccionEnvio ? direccionEnvio.departamento : "");
  const [codigoPostal, setCodigoPostal] = useState(direccionEnvio ? direccionEnvio.codigoPostal : "");
  const [pais, setPais] = useState(direccionEnvio ? direccionEnvio.pais : "US");

  useEffect(() => {
    if (isUpdated) {
        //navegar hacia la pasarela de pagos
        navigate("/order/confirm");
        dispatch(resetUpdateStatus({}))
        //alert.success("Se almacenó la dirección de envío.");
    }

    if (errores) {
        errores.map(error => alert.error(error));
    }
  }, [dispatch, errores, alert, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const request = {
        direccion,
        ciudad,
        departamento,
        codigoPostal,
        pais
    }

    dispatch(saveAddressInfo(request));
  }

  return (
    <Fragment>
      <MetaData titulo={"Información de envío"} />
      <CheckoutSteps envio />
      <div className="row wrapper">
        <div className="col-10 col-lg-6">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Información de envío</h1>
            <div className="form-group">
              <label htmlFor="address_field">Dirección</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={direccion ?? ''}
                onChange={(e) => setDireccion(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">Ciudad</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value={ciudad ?? ''}
                onChange={(e) => setCiudad(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="departamento_field">Departamento</label>
              <input
                type="text"
                id="departamento_field"
                className="form-control"
                value={departamento ?? ''}
                onChange={(e) => setDepartamento(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="codigoPostal_field">CodigoPostal</label>
              <input
                type="text"
                id="codigoPostal_field"
                className="form-control"
                value={codigoPostal ?? ''}
                onChange={(e) => setCodigoPostal(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country_field">Pais</label>
              <select
                id="country_field"
                className="form-control"
                value={pais ?? 'US'}
                onChange={(e) => setPais(e.target.value)}
                required
              >
                {
                    countries.map(country => (
                        <option key={country.id} value={country.name}>
                            {country.name}
                        </option>
                    ))
                }
            </select>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              CONTINUAR
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
