import './Exercise.css';
import YouTube from "react-youtube";
import {useRef} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Navbar from "../nav/Navbar";
import Content from "../common/Content";

const YoutubePlayer = () => {
  const location = useLocation();
  const videoId = location.state?.videoId
  const playerRef = useRef(null);
  const navigate = useNavigate();

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    event.target.playVideo(); // 자동 재생
  };

  const onPlayerStateChange = (event) => {
    const player = event.target;
    const state = event.data;

    if (state === 2) {
      // 2: 일시정지 상태
      console.log("⛔ 일시정지 시도! 다시 재생함");
      player.playVideo();
    }

    if (state === 0) {
      // 0: 영상 종료됨
      console.log("✅ 영상이 끝났습니다");
      alert("영상이 끝났어요!");
      // 원하는 동작: navigate, 상태 업데이트 등
      navigate("/loading");
    }
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
      controls: 0,     // 컨트롤러 숨김
      disablekb: 1,    // 키보드 제어 비활성화
      modestbranding: 1,
      rel: 0
    },
  };

  return (
      <>
        {/*<Navbar/>*/}
        <Content>
          <div className="youtube-player" style={{pointerEvents: 'none'}}>
            <YouTube
                videoId={videoId}
                opts={opts}
                onReady={onPlayerReady}
                onStateChange={onPlayerStateChange}
            />
          </div>
        </Content>
      </>
  );
};

export default YoutubePlayer;
