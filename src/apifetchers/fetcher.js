import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/' // API의 기본 URL 설정
});

// 응답 인터셉터를 추가하여 401 Unauthorized 에러를 감지
api.interceptors.response.use(
  response => response, // 정상 응답은 그대로 반환
  async error => {
    const originalRequest = error.config;
    // 토큰 만료 에러 코드 확인 (예: 401)
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token'); // 리프레시 토큰 가져오기
      if (refreshToken) {
        const response = await api.post('auth/token/refresh/', {
          refresh: refreshToken
        });
        const { access } = response.data;
        localStorage.setItem('access_token', access); // 새 액세스 토큰 저장
        originalRequest.headers['Authorization'] = `Bearer ${access}`; // 새 토큰으로 요청 헤더 설정
        return api(originalRequest); // 원래 요청 재시도
      }
    }

    return Promise.reject(error);
  }
);

export const getPostData = async (category, search_option, q, page, sort) => {
  // 로컬 스토리지에서 토큰을 가져옵니다.
  const accessToken = localStorage.getItem('access_token');
  const response = await api.get(`posts/?category=${encodeURIComponent(category)}&search_filter=${encodeURIComponent(search_option)}&q=${encodeURIComponent(q)}&page=${encodeURIComponent(page)}&sort=${encodeURIComponent(sort)}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data; // 응답 객체에서 data 속성만 반환
};

export const fetchLogin = async ({ login_id, password }) => {
  const { data } = await api.post('auth/token/', {
    login_id,
    password
  });
  // 로그인 성공 시 토큰을 로컬 스토리지에 저장
  localStorage.setItem('access_token', data.access_token);
  return data;
};

export const getPostDetailData = async (postId) => {
  const response = await api.get(`post/${postId}`, {
  });
  return response.data;
};

// 부모댓글 데이터를 가져오는 함수 추가
export const getCommentsData = async (postId) => {
  const response = await api.get(`comment/post/${postId}`, {

  });
  return response.data;
};

// 대댓글 데이터를 가져오는 함수 추가
export const getChildCommentsData = async (commentId) => {
  try {
    const response = await api.get(`comment/comment/${commentId}`);
    return response.data;
    
  } catch (error) {
    // 404 Not Found 에러가 발생할 경우 빈 배열 반환
    if (error.response && error.response.status === 404) {
      return [];
    }
    throw error; // 다른 종류의 에러는 계속해서 throw
  }
};

export const createParentComment = async (postId, content, textContent) => {
  const accessToken = localStorage.getItem('access_token');
  return await api.post(`post/${postId}/comment/`, {
      html_content: content,
      content: textContent
  }, {
      headers: {
          Authorization: `Bearer ${accessToken}`
      }
  });
};

export const createChildComment = async (parentId, content, textContent) => {
  const accessToken = localStorage.getItem('access_token');
  return await api.post(`comment/${parentId}`, {
      html_content: content,
      content: textContent
  }, {
      headers: {
          Authorization: `Bearer ${accessToken}`
      }
  });
};

export const voteComment = async (commentId ) => {
  const accessToken = localStorage.getItem('access_token');
  return await api.post(`comment/${commentId}/like`, {
  }, {
      headers: {
          Authorization: `Bearer ${accessToken}`
      }
  });
};

export const votePost = async (postId ) => {
  const accessToken = localStorage.getItem('access_token');
  return await api.post(`post/${postId}/like`, {
  }, {
      headers: {
          Authorization: `Bearer ${accessToken}`
      }
  });
};

