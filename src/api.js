import axios from 'axios';

export const getTaxes = async () => {
  const res = await axios.get('https://685013d7e7c42cfd17974a33.mockapi.io/taxes');
  return res.data;
};

export const getCountries = async () => {
  const res = await axios.get('https://685013d7e7c42cfd17974a33.mockapi.io/countries');
  return res.data;
};

export const updateCustomer = async (id, payload) => {
  const res = await axios.put(
    `https://685013d7e7c42cfd17974a33.mockapi.io/taxes/${id}`,
    payload
  );
  return res.data;
};
