import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://3.38.151.192/' // API의 기본 URL 설정
});


export const getPostData = async (category, search_option, q, page, sort) => {
  // 로컬 스토리지에서 토큰을 가져옵니다.
  const accessToken = localStorage.getItem('access_token');
  const response = await api.get(`posts/?category=${encodeURIComponent(category)}&search_filter=${encodeURIComponent(search_option)}&q=${encodeURIComponent(q)}&page=${encodeURIComponent(page)}&sort=${encodeURIComponent(sort)}`);
  return response.data; // 응답 객체에서 data 속성만 반환
};

export const getMyPostData = async (category, search_option, q, page, sort) => {
  // 로컬 스토리지에서 토큰을 가져옵니다.
  const accessToken = localStorage.getItem('access_token');
  const response = await api.get(
    `posts/me/?category=${encodeURIComponent(category)}&search_filter=${encodeURIComponent(search_option)}&q=${encodeURIComponent(q)}&page=${encodeURIComponent(page)}&sort=${encodeURIComponent(sort)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data; // 응답 객체에서 data 속성만 반환
};


export const getMyLikePostData = async (category, search_option, q, page, sort) => {
  // 로컬 스토리지에서 토큰을 가져옵니다.
  const accessToken = localStorage.getItem('access_token');
  const response = await api.get(
    `posts/like/?category=${encodeURIComponent(category)}&search_filter=${encodeURIComponent(search_option)}&q=${encodeURIComponent(q)}&page=${encodeURIComponent(page)}&sort=${encodeURIComponent(sort)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data; // 응답 객체에서 data 속성만 반환
};

export const getMyCommentData = async (page, q) => {
  // 로컬 스토리지에서 토큰을 가져옵니다.
  const accessToken = localStorage.getItem('access_token');
  const response = await api.get(
    `comments/me/?page=${encodeURIComponent(page)}&q=${encodeURIComponent(q)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
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

export const fetchSocialLoginRedirect = async () => {
  const { data } = await api.get('auth/user/google/login/');
  window.location.href = data.redirect_url;
  return;
};

export const fetchSocialLogin = async (code) => {
  const { data } = await api.get(`auth/user/google/redirection/?code=${code}`);
  localStorage.setItem('access_token', data.access_token);
  return data;
};

export const getPostDetailData = async (postId) => {
  const response = await api.get(`post/${postId}`, {
  });
  return response.data;
};

export const createPost = async (formData) => {
  const accessToken = localStorage.getItem('access_token');
  return await api.post('post/', formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const modifyPost = async (postId, formData) => {
  const accessToken = localStorage.getItem('access_token');
  return await api.patch(`post/${postId}`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const DeletePost = async (postId) => {
  const accessToken = localStorage.getItem('access_token');
  return await api.delete(`post/${postId}`, {
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
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
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data'
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
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const DeleteComment = async (commentId) => {
  const accessToken = localStorage.getItem('access_token');
  return await api.delete(`comment/${commentId}`, {
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

export const ModifyComment = async (commentId, content, textContent) => {
  const accessToken = localStorage.getItem('access_token');
  return await api.patch(`comment/${commentId}`, {
    html_content: content,
    content: textContent
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const voteComment = async (commentId) => {
  const accessToken = localStorage.getItem('access_token');
  return await api.post(`comment/${commentId}/like`, {
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

export const votePost = async (postId) => {
  const accessToken = localStorage.getItem('access_token');
  return await api.post(`post/${postId}/like`, {
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

export const getLecture = async (lectureId) => {
  const accessToken = localStorage.getItem('access_token');
  return await api.get(`lecture/${lectureId}`, {
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

};

export const getLectureList = async (category, page, search_filter, q) => {
  const response = await api.get(`lectures/?category=${encodeURIComponent(category)}&search_filter=${encodeURIComponent(search_filter)}&q=${encodeURIComponent(q)}&page=${encodeURIComponent(page)}`);
  return response.data  
}; 

export const DeleteLecture = async (lectureId) => {
  const accessToken = localStorage.getItem('access_token');
  return await api.delete(`lecture/${lectureId}`, {
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

};

export const registerFCMToken = async (token) => {
  const accessToken = localStorage.getItem('access_token');
  try {
    const response = await api.post('auth/fcm_token/', {
      token
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log('Token registered successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to register FCM token:', error);
    throw error;
  }
};

export const uploadFilesToS3 = async (formData) => {
  const accessToken = localStorage.getItem('access_token');
  try {
    const response = await api.post('s3_files/', formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data' // This header is important for file uploads
      }
    });
    console.log('Files uploaded successfully:', response.data);
    return response.data; // Returning the response data, possibly URLs of the uploaded files
  } catch (error) {
    console.error('Failed to upload files:', error);
    throw error;
  }
};

export const GetAlarms = async (page_num) => {
  const accessToken = localStorage.getItem('access_token');
  const response =  await api.get(`alarms/?page=${page_num}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data
};

export const CheckDuplicate = async (formData) => {
  try {
    const response = await api.post('auth/user/duplicate-check/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to check duplication:', error);
    throw error;
  }
};

export const SendEmail = async (formData) => {
  try {
    const response = await api.post('auth/email-send/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const RegisterUser = async (formData) => {
  try {
    const response = await api.post('auth/user/', formData, {
    });
    return response.data;
  } catch (error) {
    console.error('Failed to register user:', error);
    throw error;
  }
};

export const GetMyPageUser = async () => {
  const accessToken = localStorage.getItem('access_token');
  try {
  const response =  await api.get(`auth/user/info?email=true&nickname=true`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data
  } catch (error) {
    console.error('Failed to GetMyPageUser:', error);
    throw error;
  }
};

export const EmailAuth = async (formData) => {
  try {
    const response = await api.post('auth/user/id-find/email-auth/', formData, {
    });
    return response.data;
  } catch (error) {
    console.error('Failed to auth:', error);
    throw error;
  }
};

export const EmailAuthForPw = async (formData) => {
  try {
    const response = await api.post('auth/user/pw-change/email-auth/', formData, {
    });
    return response.data;
  } catch (error) {
    console.error('Failed to auth:', error);
    throw error;
  }
};

export const PwChange = async (pwUrl, formData) => {
  try {
    const response = await api.post(`${pwUrl}`, formData, {
    });
    return response.data;
  } catch (error) {
    console.error('Failed to auth:', error);
    throw error;
  }
};