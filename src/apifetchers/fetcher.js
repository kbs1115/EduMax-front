import axios from 'axios';

const getPostData = async ( category, search_option, q, page, sort ) => {
  const data = await axios.get(
    `http://127.0.0.1:8000/posts?category=${category}&search_filter=${search_option}&q=${q}&page=${page}&sort=${sort}`
  );
  return data;
};