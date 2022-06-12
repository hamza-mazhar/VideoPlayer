import React, { useEffect, useState } from "react";
import { List, Avatar, Row, Col } from "antd";
import axios from "axios";
import DetailedVideoSidePane from "./Sections/DetailedVideoSidePane";
import Comments from "./Sections/Comments";

function DetailedVideoPage(props) {
  const videoId = props.match.params.videoId;
  const [video, setVideo] = useState([]);
  const [commentLists, setCommentLists] = useState([]);

  const videoVariable = {
    videoId: videoId,
  };

  useEffect(() => {
    axios.post("/api/video/getVideo", videoVariable).then((response) => {
      if (response.data.success) {
        setVideo(response.data.video);
      } else {
        alert("Failed to get video info!");
      }
    });

    axios.post("/api/comment/getComments", videoVariable).then((response) => {
      if (response.data.success) {
        setCommentLists(response.data.comments);
      } else {
        alert("Failed to get comment info!");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateComment = (newComment) => {
    if (newComment === "") {
      alert("Comment cannot be empty!");
    } else {
      setCommentLists(commentLists.concat(newComment));
    }
  };

  if (video.writer) {
    return (
      <Row>
        <Col lg={18} xs={24}>
          <div
            className="postPage"
            style={{ width: "100%", padding: "3rem 4em" }}
          >
            <video
              id={`${video.filePath}`}
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.filePath}`}
              controls
              autoPlay
            ></video>

            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={video.writer && video.writer.image} />}
                title={<p style={{ color: "white" }}>{video.title}</p>}
                description={
                  <React.Fragment>
                    <h4 style={{ color: "white" }}>{video.views} views</h4>
                    <h5 style={{ color: "rgb(179,179,179)" }}>
                      {video.description}
                    </h5>
                  </React.Fragment>
                }
              />
              <div></div>
            </List.Item>

            <Comments
              key={video._id}
              commentLists={commentLists}
              postId={video._id}
              refreshFunction={updateComment}
            />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <DetailedVideoSidePane />
        </Col>
      </Row>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default DetailedVideoPage;
