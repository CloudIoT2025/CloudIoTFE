import './Exercise.css';
import YouTube from "react-youtube";
import {useRef} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Navbar from "../nav/Navbar";
import Content from "../common/Content";
import axiosInstance from "../api/api";

const YoutubePlayer = () => {
  const location = useLocation();
  const videoId = location.state?.videoId
  const playerRef = useRef(null);
  const navigate = useNavigate();

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    event.target.playVideo(); // 자동 재생
  };

  const onPlayerStateChange = async (event) => {
    const player = event.target;
    const state = event.data;

    if (state === 2) {
      console.log("⛔ 일시정지 시도! 다시 재생함");
      player.playVideo();
    }

    if (state === 0) {
      console.log("✅ 영상이 끝났습니다");
      try {
        const res = await axiosInstance.post('/api/exercise/end', { videoId });
        alert(`운동 종료!\n점수: ${res.data.score}\n칼로리: ${res.data.calroies}`);
      } catch (err) {
        console.error("운동 종료 알림 실패:", err);
      }
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
