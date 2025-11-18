import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCountries } from "../actions/countryAction";

export const useCountries = () => {
  const dispatch = useDispatch();
  const { countries, loading, error } = useSelector((state) => state.country);

  // Solo carga si no existen en el estado
  useEffect(() => {
    if (!countries || countries.length === 0) {
      dispatch(getCountries({}));
    }
  }, [dispatch, countries]);

  return { countries, loading, error };
};
