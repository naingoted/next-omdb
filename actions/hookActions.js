import axios from 'axios';

export const getOmdbApi = async (setData, setServerError) => {
  console.log
  // Challenge #5: Server Error
  try {
    const response = await axios.get(`/api/omdb?apikey=${process.env.NEXT_PUBLIC_ENV_OMDBAPI}`);
    setData(response.data);
  }
  catch {
    setServerError(true);
  }
  // END: Challenge #5: Server Error
}

// default export for mocking convenience
export default {
  getOmdbApi,
}
