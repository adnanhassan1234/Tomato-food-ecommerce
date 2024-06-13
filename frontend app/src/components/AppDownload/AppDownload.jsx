import { assets } from "../../assets/frontend_assets/assets";
import "./appdownload.css";

const AppDownload = () => {
  return (
    <div className="app_download" id="download_app">
      <p>
        For Better Experience Download <br /> Tomato App
      </p>
      <div className="app_download__platform">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  );
};

export default AppDownload;
