
const filesdataExample = [
    {
        file_name: "Reportddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd2024.pdf",
        file_location: "https://example.com/report2024.pdf"
    },
    {
        file_name: "Image.png",
        file_location: "https://example.com/image.png"
    }
];
export const SamplehtmlContent = `
<div>
  <h1>Welcome to Our Website!</h1>
  <p>This is a sample website to demonstrate how HTML content can be dynamically inserted into a React component.</p>
  <h2>Features</h2>
  <ul>
    <li>Dynamic HTML content rendering</li>
    <li>Interactive user interface</li>
    <li>Responsive design</li>
  </ul>
  <p>For more information, visit our <a href="https://example.com">homepage</a>.</p>
  <h2>Contact Us</h2>
  <p>If you have any questions, please feel free to reach out at <a href="mailto:contact@example.com">contact@example.com</a>.</p>
</div>
`;

export const SamplehtmlContent1 = `
<div>
  <h1>hello</h1>
  <p>This is a sample website to demonstrate how HTML content can be dynamically inserted into a React component.</p>
  <img src="https://velog.velcdn.com/images/gmyun1999/post/81eda361-4625-4165-a20f-e2e488437a45/image.png" width="50%" height="50%">
  <h2>Features</h2>
</div>
`;

export const ResponsePostData1 = {
    files: filesdataExample,
    likes: [{ post: 1, comment: null, user: "윤규민" }, { post: 1, comment: null, user: "asd" }, { post: 1, comment: null, user: "qwezxc" }],
    title: "sample title",
    html_content: SamplehtmlContent,
    created_at: "2020-12-30",
    modified_at: "2020-12-30",
    category: "KQ",
    author: "윤규민",
    views: 20 // 조화수인데 백엔드 구현이 필요함
};

export const ResponsePostData2 = {
    files: filesdataExample,
    likes: [{ post: 1, comment: null, user: "danny" }, { post: 1, comment: null, user: "asd" }, { post: 1, comment: null, user: "qwezxc" }],
    title: "sample title",
    html_content: SamplehtmlContent,
    created_at: "2020-12-30",
    modified_at: "2020-12-30",
    category: "EQ",
    author: "윤규민",
    views: 22 // 조화수인데 백엔드 구현이 필요함
}
export const ResponsePostData3 = {
    files: filesdataExample,
    likes: [{ post: 1, comment: null, user: "danny" }, { post: 1, comment: null, user: "asd" }, { post: 1, comment: null, user: "qwezxc" }],
    title: "rksk",
    html_content: "<p>This is a <strong>paragraph</strong>.</p>",
    created_at: "2020-12-30",
    modified_at: "2020-12-30",
    category: "EQ",
    author: "danny",
    views: 22 // 조화수인데 백엔드 구현이 필요함
}

export const ResponseCommentData1 = 
    {
        id: 1,
        likes: [{ post: null, comment: 1, user: "김병수" }, { post: null, comment: 1, user: "asd" }, { post: null, comment: 1, user: "asdqwesad" },],
        html_content: SamplehtmlContent,
        created_at: "2020-12-30T12:30",
        modified_at: "2020-12-31T02:29",
        parent_comment: 1,
        author: "comment는 부모1",
    }
;
export const ResponseCommentData2 = 
    {
        id: 232,
        likes: [{ post: null, comment: 1, user: "김병수" }, { post: null, comment: 1, user: "asdzxc" }, { post: null, comment: 1, user: "asdqwesad" },],
        html_content: SamplehtmlContent1,
        created_at: "2020-12-30T11:30",
        modified_at: "2020-12-31T23:29",
        parent_comment: 232,
        author: "에듀맥스 사랑 id232",
    }
;

export const ResponseCommentData3 = 
    {
        id: 22,
        likes: [],
        html_content: "예시 부모댓글입니다. 하하"+ "이 comment는 부모이며 id는 22임",
        created_at: "2020-12-30T11:30",
        modified_at: "2020-12-31T23:29",
        parent_comment: 22,
        author: "asd",
    }
;

export const ResponseChildCommentData1 = 
    {
        id: 123324,
        likes: [{ post: null, comment: 1, user: "김병수" }, { post: null, comment: 1, user: "asdzxc" }, { post: null, comment: 1, user: "asdqwesad" },],
        html_content: "예시 대댓글 입니다 html 안쓰고 텍스트로만 들어가면 요정도 나오네요",
        created_at: "2020-12-30T11:30",
        modified_at: "2020-12-31T23:29",
        parent_comment: 22,
        author: "김병수",
    }
;
export const ResponseChildCommentData2 = 
    {
        id: 64,
        likes: [{ post: null, comment: 1, user: "김병수" }, { post: null, comment: 1, user: "asd" }, { post: null, comment: 1, user: "asdqwesad" },],
        html_content: "허허 안녕하세요",
        created_at: "2020-12-30T11:30",
        modified_at: "2020-12-31T23:29",
        parent_comment: 22,
        author: "수학이 싫어요",
    }
;
export const CommentsList = [
    ResponseCommentData1, ResponseCommentData2, ResponseCommentData3
]

export const ChildCommentsList = [
    ResponseChildCommentData1, ResponseChildCommentData2
]