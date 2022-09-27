import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
// import { useSelector } from 'react-redux';
import Avatar from 'react-avatar';
import moment from 'moment';
import 'moment/locale/ko';
import { RepleContentDiv, RepleUploadDiv } from './SingleReedReplyStyle';

function RepleContent({ comment }) {
  const [modalFlag, setModalFlag] = useState(false);
  const [editFlag, setEditFLag] = useState(false);
  const [eidtReple, setEditReple] = useState(comment.comment);

  // const user = useSelector((state) => state.token);
  const ref = useRef();

  function useOnClickOutside(refer, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (!refer.current || refer.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, [refer, handler]);
  }

  useOnClickOutside(ref, () => setModalFlag(false));

  const SetTime = (a, b) => {
    if (a !== b) {
      moment(b).format(`YYYY년 MMMM Do, hh:mm'(수정됨)`);
    } else {
      moment(a).format('YYYY년 MMMM Do, hh:mm');
    }
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    const body = {
      comment: comment.comment,
      id: comment.id,
    };
    axios.put('http://localhost:3004/comments', body);
    alert('수정 되었습니다');
    setEditFLag(false);
  };

  const DeleteHandler = (e) => {
    e.preventDefault();
    if (window.confirm('정말로 삭제 하시겠습니까?')) {
      const body = {
        comment: comment.comment,
        id: comment.id,
      };
      axios.delete('http://localhost:3004/comments', body);
      window.location.reload();
    }
  };

  return (
    <RepleContentDiv>
      <div className="author">
        <div className="userInfo">
          <Avatar size="30" round style={{ border: '1px solid #c6c6c6' }} />
          <p> {comment.id}</p>
        </div>
        {/* {props.reple.uid === user.token && (유저 확인하고 조건부 팝업 버튼) } */}
        <div className="modal-Control">
          <button
            type="button"
            onClick={() => setModalFlag(true)}
            className="more"
          >
            <span> ...</span>
          </button>
          {modalFlag && (
            <div className="modal" ref={ref}>
              <button
                type="button"
                onClick={() => {
                  setEditFLag(true);
                  setEditReple(true);
                }}
              >
                수정
              </button>
              <button
                type="button"
                className="delete"
                onClick={(e) => DeleteHandler(e)}
              >
                삭제
              </button>
            </div>
          )}
        </div>
        <p className="time">{SetTime(comment.id, comment.id)}</p>
        {editFlag ? (
          <RepleUploadDiv>
            <form>
              <input
                className="reple-edit-input"
                type="text"
                value={eidtReple}
                onChange={(e) => {
                  setEditReple(e.currentTarget.value);
                }}
              />
              <button
                type="button"
                onClick={(e) => {
                  SubmitHandler(e);
                }}
              >
                등록
              </button>
            </form>
            <div className="cancel">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setEditFLag(false);
                }}
              >
                취소
              </button>
            </div>
          </RepleUploadDiv>
        ) : (
          <p className="comment">{comment.comment}</p>
        )}
      </div>
    </RepleContentDiv>
  );
}

export default RepleContent;
