import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  FormUserInfo,
  FormContainer,
  FormTitle,
  FormWrapper,
  FormRow,
  FormInput,
  FormSubmitBtn,
  FormLabelText,
  FormFile,
} from './MyPageFormStyles';
import DaumAddress from './DaumAddress';

function MyPageForm() {
  // const user = useSelector((state) => state.user);
  const token = window.localStorage.getItem('accessToken');
  const userId = window.localStorage.getItem('userId');

  const params = useParams();

  const [userInfo, setuserInfo] = useState({
    email: '',
    password: '',
    username: '',
    userId,
    dogname: '',
    address: '',
  });
  console.log(params.userId);
  console.log(userId);
  console.log(token);

  const [popup, setPopup] = useState(false);
  const handleComplete = (e) => {
    e.preventDefault();
    setPopup(!popup);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setuserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await axios.get(
        `http://ec2-43-200-54-216.ap-northeast-2.compute.amazonaws.com:8080/api/users/${params.userId}`,
        { headers: { userId: params.userId, Authorization: token } },
      );
      setuserInfo(res.data);
      console.log(res.data);
    };
    getUserInfo();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.patch(
      `http://ec2-43-200-54-216.ap-northeast-2.compute.amazonaws.com:8080/api/users/${params.userId}`,
      userInfo,
      { headers: { Authorization: token } },
    );
    console.log(res.data);
  };

  return (
    <FormUserInfo>
      <FormContainer>
        <FormWrapper onChange={onChange} onSubmit={onSubmit}>
          <FormTitle>회원정보</FormTitle>
          <div className="form-div">
            <FormRow>
              <FormFile>
                <FormLabelText className="profile"> 프로필</FormLabelText>
                <FormInput
                  type="file"
                  id="profile"
                  name="profile"
                  onChange={onChange}
                />
              </FormFile>
            </FormRow>
            <FormRow>
              <FormLabelText>이메일</FormLabelText>
              <FormInput
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={onChange}
              />
            </FormRow>
            <FormRow>
              <FormLabelText>비밀번호</FormLabelText>
              <FormInput type="password" id="password" name="password" />
            </FormRow>
            <FormRow>
              <FormLabelText>닉네임</FormLabelText>
              <FormInput
                type="text"
                id="username"
                name="username"
                value={userInfo.username}
                onChange={onChange}
              />
            </FormRow>
          </div>
          <FormTitle>반려동물 정보</FormTitle>
          <div className="form-div">
            <FormRow>
              {' '}
              <FormLabelText>반려동물 이름 </FormLabelText>
              <FormInput
                type="text"
                id="dogname"
                name="dogname"
                value={userInfo.dogname}
                onChange={onChange}
              />
            </FormRow>
            <FormRow>
              <FormLabelText> 구분 </FormLabelText>
              <label htmlFor="radio">
                유기견
                <input type="radio" id="radio" />{' '}
              </label>
              유기묘 <input type="radio" />
              그외 <input type="radio" />
            </FormRow>
          </div>
          <FormTitle>유기동물 봉사자 정보</FormTitle>
          <div className="form-div">
            <FormRow>
              <FormLabelText>센터 주소</FormLabelText>
              <FormLabelText placeholder="주소">
                {userInfo.address}
              </FormLabelText>
              <FormInput
                type="text"
                id="shelter"
                name="shelter"
                value={userInfo.address}
                onChange={onChange}
              />
              <button type="button" onClick={handleComplete}>
                주소찾기
              </button>
              {popup && (
                <DaumAddress
                  company={userInfo.address}
                  setCompany={setuserInfo.address}
                />
              )}
            </FormRow>
          </div>

          <FormSubmitBtn type="submit" yellow big>
            회원 정보 수정 하기
          </FormSubmitBtn>
        </FormWrapper>
      </FormContainer>
    </FormUserInfo>
  );
}

export default MyPageForm;