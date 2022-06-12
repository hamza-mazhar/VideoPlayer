import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Input, Switch } from "antd";
import axios from "axios";

import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

const { TextArea } = Input;

function Comments(props) {
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(true);

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (user.userData && !user.userData.isAuth) {
      return alert("Sign in first!");
    }

    const variables = {
      content: comment,
      writer: user.userData._id,
      postId: props.postId,
    };

    axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        setComment("");
        props.refreshFunction(response.data.result);
      } else {
        alert("Failed to save Comment");
      }
    });
  };
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    setShowComment(checked);
  };

  return (
    <div key={props.postId}>
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ color: "white" }}> Comments</p>
        <Switch defaultChecked={showComment} onChange={onChange} />
      </div>

      <hr style={{ borderColor: "rgb(40,40,40)" }} />

      {showComment &&
        props.commentLists &&
        props.commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment key={props.postId}>
                <SingleComment
                  comment={comment}
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                />
                <ReplyComment
                  commentLists={props.commentLists}
                  postId={props.postId}
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            )
        )}

      <form style={{ display: "flex", height: "39px" }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          value={comment}
          placeholder="Leave a comment!"
        />
        <br />
        <Button
          style={{
            width: "20%",
            height: "35px",
            backgroundColor: "rgb(37, 141, 252)",
            color: "white",
          }}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Comments;
