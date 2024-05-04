import axios from 'axios';

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0ODUxMzgyLCJpYXQiOjE3MTQ4NDk1ODIsImp0aSI6IjFmOGI2OGY4MzFmMzRmODNiNDNkNDhlZTNlMTE4NTY3IiwidXNlcl9pZCI6MX0.JdpXlXhXNBBBrLWieWzDJRzDgMAtmj77-qn8OpGR0dI';

export const getPostData = async (category, search_option, q, page, sort) => {
  const url = `http://127.0.0.1:8000/posts/?category=${encodeURIComponent(category)}&search_filter=${encodeURIComponent(search_option)}&q=${encodeURIComponent(q)}&page=${encodeURIComponent(page)}&sort=${encodeURIComponent(sort)}`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data; // 응답 객체에서 data 속성만 반환
};
