import { useRef, useState, useEffect } from "react";

import useIsInViewport from "../hooks/useIsInViewport";

const VideoCard = ({
  index,
  author,
  videoURL,
  authorLink,
  lastVideoIndex,
  getVideos,
}) => {
  const video = useRef();
  const isInViewport = useIsInViewport(video);
  const [loadNewVidsAt, setloadNewVidsAt] = useState(lastVideoIndex);

  if (isInViewport) {
    setTimeout(() => {
      video.current.play();
    }, 1000);

    if (loadNewVidsAt === Number(video.current.id)) {
      setloadNewVidsAt((prev) => prev + 2);
      getVideos(3);
    }
  }

  const togglePlay = () => {
    let currentVideo = video.current;
    if (currentVideo.paused) {
      currentVideo.play();
    } else {
      currentVideo.pause();
    }
  };

  useEffect(() => {
    if (!isInViewport) {
      video.current.pause();
    }
  }, [isInViewport]);

  return (
    <div className="slider-children">
      <video
        muted
        className="video"
        ref={video}
        onClick={togglePlay}
        id={index}
        autoPlay={index === 1}
      >
        <source src={videoURL} type="video/mp4" />
      </video>
      <div className="video-content" onClick={togglePlay}>
        <p className="m-0">@{author}</p>
        <p>
          Video by <a href={authorLink}>{author} </a> on Pexel
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
