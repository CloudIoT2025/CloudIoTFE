import './Exercise.css';
import YouTube from "react-youtube";
import {useRef} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Navbar from "../nav/Navbar";
import Content from "../common/Content";
import axiosInstance from "../api/api";

const YoutubePlayer = () => {
  const location = useLocation();
  const videoId = location.state?.videoId;
  const playerRef = useRef(null);
  const navigate = useNavigate();

  const onPlayerReady = async event => {
    playerRef.current = event.target;

    try {
      const response = await axiosInstance.get(
        `/api/exercise/start?videoId=${videoId}&rspId=${localStorage.getItem(
          'rspId'
        )}`,
        { headers: { 'x-user-id': localStorage.getItem('userId') } }
      );
      const { status } = response;
      if (status === 200) {
        console.log('🚀 운동 시작 API 호출 완료');
        event.target.playVideo(); // 자동 재생
      }
    } catch (err) {
      console.error('❌ 운동 시작 API 호출 실패:', err);
    }
  };

  const onPlayerStateChange = async event => {
    const player = event.target;
    const state = event.data;

    if (state === 2) {
      console.log("⛔ 일시정지 시도! 다시 재생함");
      player.playVideo();
    }

    if (state === 0) {
      console.log('✅ 영상이 끝났습니다');
      navigate('/loading', { state: { videoId } });
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
          <div className="youtube-player">
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
