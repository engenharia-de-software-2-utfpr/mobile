import axios from './axios';

const requestApprovedOcurrences = async coords => {
  const { latitude, longitude } = coords;

  const result = await axios.get(
    'occurrence/near',
    { params: { latitude, longitude } },
  );

  if (result.success) {
    return {
      data: result.data,
      message: resulta.message,
    };
  } else {
    return {
      data: [],
      message: 'Erro',
    };
  }
};

export { requestApprovedOcurrences };
