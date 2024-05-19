import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Typography, { colorMapping } from "../components/Typography";
import SideBar from "../components/SideBar";
import dropdownclick from "../assets/dropdownclick.png";
import searchIcon from "../assets/nav_search_icon.png";
import { getLectureList } from '../apifetchers/fetcher';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 50px;
  align-self: stretch;
  margin-top: 60px;
`;

const MainContentwrapper = styled.div`
  display: flex;
  width: 923px;
  padding-bottom: 34px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const SubjectTitleWrapper = styled.div`
  display: flex;
  width: 923px;
  padding: 20px 0px 20px 5px;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const CategorySelectWrapper = styled.div`
  display: flex;
  padding-bottom: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const SearchBarAndFilterWrapper = styled.div`
  display: flex;
  width: 923px;
  padding: 30px 0px 20px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
  border-top: 1px solid ${colorMapping.container};
`;

const BodyWrapper = styled.div`
  display: flex;
  width: 923px;
  padding: 0px 1px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const FilterAndSearchWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const FilterBox = styled.div`
  display: flex;
  padding: 10px 15px;
  justify-content: center;
  align-items: center;
  gap: 80px;
  border-radius: 15px;
  background: #F7F7F8;
  position: relative;
  cursor: pointer;
  margin-bottom: 5px; /* 추가된 여백 */
`;

const DropDownImg = styled.img`
  width: 11px;
  height: 11px;
  flex-shrink: 0;
`;

const DropdownMenu = styled.div`
  position: absolute;
  width: 128px;
  top: calc(100% + 8px); /* FilterBox와 DropdownMenu 사이의 여백 */
  background: #F7F7F8;
  border-radius: 12px;
  z-index: 10;
  padding: 10px;
  display: ${props => (props.show ? 'block' : 'none')};
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.15);
`;

const DropdownItem = styled.div`
  padding: 10px 5px;
  cursor: pointer;
  &:hover {
    color: black; /* 호버 시 글자 색깔 변경 */
  }
`;

const HoverableTypography = styled(Typography)`
  &:hover {
    color: black; /* 호버 시 글자 색깔 변경 */
  }
`;

const CategoryRow = styled.div`
  display: flex;
  padding: 0px 10px 0px 0px;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

const CategoryWrapper = styled.div`
  display: flex;
  border-radius: 15px;
  padding: 10px 20px 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  &:hover {
    background: #CBDFFF;
  }
`;

const LectureNumWrapper = styled.div`
  display: flex;
  width: 88px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const BodyFirstRow = styled.div`
  display: flex;
  height: 54px;
  padding: 0px 100px 0px 5px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 15px;
  border: 1px solid #DFE5EE;
  background: #F7F7F8;
`;

const NumAndLectureTitleWrapper = styled.div`
  display: flex;
  width: 324px;
  padding-left: 15px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const AuthorWrapper = styled.div`
  display: inline-flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const BodyContentWrapper = styled.div`
  display: flex;
  padding: 0px 100px 0px 30px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  cursor: pointer;
`;

const NumandThumnail = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 0;
`;

const ThumnailandTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  flex: 1 0 0;
`;

const ThumnailImg = styled.img`
  width: 114px;
  height: 70px;
  border-radius: 15px;
`;

const PageNumberWrapper = styled.div`
  padding: 40px 0px 40px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const PageNumber = styled.div`
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 10px;
  background: ${props => (props.selected ? '#F7F7F8' : 'transparent')};
  &:hover {
    background: #F7F7F8;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #F7F7F8;
  border-radius: 15px;
  width: 310px;
  height: 40px;
  padding: 0 20px;
`;

const Input = styled.input`
  flex: 1;
  background-color: transparent;
  border: none;
  height: 100%;
  margin-right: 20px;
  &:focus {
    outline: none;
  }
`;

const IconWrapper = styled.div`
  width: 22px;
  height: 22px;
  cursor: pointer;
  opacity: 50%;
  background-image: url(${searchIcon});
  background-size: cover;
  background-repeat: no-repeat;
`;

const PostSearchBar = ({ setSearchWord, handleSearch, searchWord }) => {
  const [innerWord, setInnerWord] = useState(searchWord);

  const handleSearchClick = () => {
    setSearchWord(innerWord);
    handleSearch(innerWord);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSearchWord(innerWord);
      handleSearch(innerWord);
    }
  };

  useEffect(() => {
    setInnerWord(searchWord);
  }, [searchWord]);

  return (
    <SearchBarContainer>
      <Input
        type="text"
        value={innerWord}
        onChange={(e) => setInnerWord(e.target.value)}
        placeholder="Search..."
        onKeyDown={handleKeyDown}
      />
      <IconWrapper onClick={handleSearchClick} />
    </SearchBarContainer>
  );
};

const categoryMapping = {
  "국어": "KO",
  "영어": "EN",
  "수학": "MA",
  "탐구": "TM",
  "내신": "SC",
  "수능": "SA",
  "문법": "GR",
  "미적분": "CC",
  "확률과통계": "PS",
  "수학1": "M1",
  "수학2": "M2",
  "고등수학": "MH",
  "ebs": "EBS",
  "모의고사": "SAM",
  "호주머니 어법": "PGR",
  "기초 어법": "BGR",
  "영어0": "E0",
  "영어1": "E1",
  "영어2": "E2",
  "독해": "RC",
  "고1 모의고사": "H1",
  "고2 모의고사": "H2"
};

const searchFilterMapping = {
  "전체": "TOTAL",
  "제목": "TITLE",
  "선생님": "AUTHOR"
};

const TransitionWrapper = styled.div`
  overflow: hidden;
  max-height: ${props => (props.expanded ? '500px' : '0')};
  transition: max-height 0.5s ease-in-out;
`;

const LectureBoard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterCondition, setFilterCondition] = useState('전체');
  const [searchWord, setSearchWord] = useState('');
  const [lectures, setLectures] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastSelectedCategory, setLastSelectedCategory] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const subject = searchParams.get('category') || '영어';
    const page = parseInt(searchParams.get('page')) || 1;
    const mappedCategory = categoryMapping[subject];

    if (!mappedCategory) {
        console.error('Invalid category:', subject);
        navigate('/404'); // 404 Not Found 페이지로 리다이렉트
        return;
    }

    setLastSelectedCategory(mappedCategory);
    setCurrentPage(page);
    setSelectedCategory(subject);  // 초기 선택 카테고리를 설정합니다.

    if (subject === '내신' || subject === '수능' || subject === '문법') {
        setSelectedSubCategory(null); // 초기 선택 하위 카테고리를 설정합니다.
    }

    const fetchInitialData = async () => {
        try {
            const data = await fetchLectures(mappedCategory, '', 'TOTAL', page);
            setLectures(data.post_list);
            setTotalPageCount(data.total_page_count);
        } catch (error) {
            console.error('Error fetching lectures:', error);
        }
    };

    fetchInitialData();
}, [searchParams]);

  const resetCategories = async () => {
    const subject = searchParams.get('category') || '영어';
    const mappedCategory = categoryMapping[subject];

    if (!mappedCategory) {
      console.error('Invalid category:', subject);
      return;
    }

    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSearchWord('');
    setLastSelectedCategory(mappedCategory);

    try {
      const data = await fetchLectures(mappedCategory);
      setLectures(data.post_list);
      setTotalPageCount(data.total_page_count);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error resetting categories:', error);
    }
  };

  const handleFilterClick = (condition) => {
    setFilterCondition(condition);
    setShowDropdown(false);
  };

  const handleSearch = async (keyword) => {
    const currentCategory = selectedSubCategory ? selectedSubCategory : selectedCategory ? selectedCategory : searchParams.get('category') || '영어';
    const mappedCategory = categoryMapping[currentCategory];

    if (!mappedCategory) {
      console.error('Invalid category:', currentCategory);
      return;
    }

    setLastSelectedCategory(mappedCategory);

    try {
      const data = await fetchLectures(mappedCategory, keyword, searchFilterMapping[filterCondition]);
      setLectures(data.post_list);
      setTotalPageCount(data.total_page_count);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching lectures:', error);
    }
  };

  
  const handleCategoryClick = async (cat) => {
    const mappedCategory = categoryMapping[cat];

    if (!mappedCategory) {
      console.error('Invalid category:', cat);
      return;
    }

    setSelectedCategory(cat);
    setSelectedSubCategory(null);
    setSearchWord('');
    setLastSelectedCategory(mappedCategory);

    try {
      const data = await fetchLectures(mappedCategory);
      setLectures(data.post_list);
      setTotalPageCount(data.total_page_count);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching category lectures:', error);
    }
  };

  const handleSubCategoryClick = async (subCat) => {
    const mappedCategory = categoryMapping[subCat];

    if (!mappedCategory) {
      console.error('Invalid subcategory:', subCat);
      return;
    }

    setSelectedSubCategory(subCat);
    setSearchWord('');
    setLastSelectedCategory(mappedCategory);

    try {
      const data = await fetchLectures(mappedCategory);
      setLectures(data.post_list);
      setTotalPageCount(data.total_page_count);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching subcategory lectures:', error);
    }
  };

  const fetchLectures = async (category, keyword = '', filter = 'TOTAL', page = 1) => {
    const response = await getLectureList(category, page, filter, keyword);
    if (response && response.data) {
      return response.data;
    }
    return { post_list: [], total_page_count: 1 };
  };

  const truncateTitle = (title) => {
    return title.length > 35 ? `${title.substring(0, 35)}...` : title;
  };

  const handleLectureClick = (lectureId) => {
    navigate(`/post/lecture/${lectureId}`);
  };

  const renderCategories = () => {
    const subject = searchParams.get('category') || '영어';
    switch (subject) {
        case "국어":
        case "탐구":
            return null;
        case "수학":
            return (
                <CategoryRow>
                    {["수학1", "수학2", "고등수학", "미적분", "확률과통계"].map(cat => (
                        <CategoryWrapper key={cat} onClick={() => handleCategoryClick(cat)}>
                            <Typography size="body_sub_title" color={selectedCategory === cat ? "bright_black_gray" : "gray"}>{cat}</Typography>
                        </CategoryWrapper>
                    ))}
                </CategoryRow>
            );
        case "영어":
            return (
                <>
                    <CategoryRow>
                        {["내신", "수능", "문법"].map(cat => (
                            <CategoryWrapper key={cat} onClick={() => handleCategoryClick(cat)}>
                                <Typography size="body_sub_title" color={selectedCategory === cat ? "bright_black_gray" : "gray"}>{cat}</Typography>
                            </CategoryWrapper>
                        ))}
                    </CategoryRow>
                    <TransitionWrapper expanded={Boolean(selectedCategory)}>
                        {selectedCategory && renderSubCategories(selectedCategory)}
                    </TransitionWrapper>
                </>
            );
        case "내신":
        case "수능":
        case "문법":
            return (
                <>
                    <CategoryRow>
                        {renderSubCategories(subject)}
                    </CategoryRow>
                </>
            );
        default:
            return null;
    }
};

const renderSubCategories = (category) => {
    const subCategories = {
        "내신": ["영어0", "영어1", "영어2", "독해", "ebs", "고1 모의고사", "고2 모의고사"],
        "수능": ["모의고사"],
        "문법": ["호주머니 어법", "기초 어법"]
    };

    if (!subCategories[category]) {
        return null;
    }

    return (
        <CategoryRow>
            {subCategories[category].map(subCat => (
                <CategoryWrapper key={subCat} onClick={() => handleSubCategoryClick(subCat)}>
                    <Typography size="body_sub_title" color={selectedSubCategory === subCat ? "bright_black_gray" : "gray"}>{subCat}</Typography>
                </CategoryWrapper>
            ))}
        </CategoryRow>
    );
};

  const renderLectures = () => {
    return lectures.map((lecture, index) => {
      const thumbnailUrl = `https://img.youtube.com/vi/${lecture.youtube_id}/0.jpg`;

      return (
        <BodyContentWrapper key={lecture.id} onClick={() => handleLectureClick(lecture.id)}>
          <NumandThumnail>
            <LectureNumWrapper>
              <Typography size="body_content_medium" color='black_gray'>{index + 1}</Typography>
            </LectureNumWrapper>
            <ThumnailandTitle>
              <ThumnailImg src={thumbnailUrl} />
              <Typography size="body_content_medium" color='black_gray'>{truncateTitle(lecture.title)}</Typography>
            </ThumnailandTitle>
          </NumandThumnail>
          <Typography size="body_content_medium" color='black_gray'>{lecture.author}</Typography>
        </BodyContentWrapper>
      );
    });
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 10;
    const startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPageCount);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageNumber
          key={i}
          selected={i === currentPage}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </PageNumber>
      );
    }

    return (
      <PageNumberWrapper>
        {pages}
      </PageNumberWrapper>
    );
  };

  const handlePageClick = async (pageNumber) => {
    const data = await fetchLectures(lastSelectedCategory, searchWord, searchFilterMapping[filterCondition], pageNumber);
    setLectures(data.post_list);
    setCurrentPage(pageNumber);
  };

  return (
    <MainContainer>
      <SideBar />
      <MainContentwrapper>
        <SubjectTitleWrapper onClick={resetCategories}>
          <Typography size="h1" color="bright_black_gray">{searchParams.get('category') || '영어'}</Typography>
        </SubjectTitleWrapper>
        <CategorySelectWrapper>
          {renderCategories()}
        </CategorySelectWrapper>
        <SearchBarAndFilterWrapper>
          <FilterAndSearchWrapper>
            <FilterBox onClick={() => setShowDropdown(!showDropdown)}>
              <Typography size="body_content_medium" color="bright_black_gray">{filterCondition}</Typography>
              <DropDownImg src={dropdownclick} />
              <DropdownMenu show={showDropdown}>
                {["전체", "제목", "선생님"].map(condition => (
                  <DropdownItem key={condition} onClick={() => handleFilterClick(condition)}>
                    <HoverableTypography size="body_content_medium" color="bright_black_gray">{condition}</HoverableTypography>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </FilterBox>
            <PostSearchBar setSearchWord={setSearchWord} handleSearch={handleSearch} searchWord={searchWord} />
          </FilterAndSearchWrapper>
        </SearchBarAndFilterWrapper>
        <BodyWrapper>
          <BodyFirstRow>
            <NumAndLectureTitleWrapper>
              <Typography size="body_sub_title" color="bright_black_gray">번호</Typography>
              <Typography size="body_sub_title" color="bright_black_gray">강의 제목</Typography>
            </NumAndLectureTitleWrapper>
            <AuthorWrapper>
              <Typography size="body_sub_title" color="bright_black_gray">선생님</Typography>
            </AuthorWrapper>
          </BodyFirstRow>
          {renderLectures()}
        </BodyWrapper>
        {renderPageNumbers()}
      </MainContentwrapper>
    </MainContainer>
  );
};

export default LectureBoard;
