import images from '../../asset/images';
import Content from '../../components/Content';
function Home() {
  return (
    <Content>
      <div className="flex flex-col items-center justify-center mt-32">
        <img
          src={images.home_background}
          alt="welcome"
          className="w-[256px] h-[200px]"
        />
        <div className="italic text-2xl font-Roboto font-light text-[#616161] leading-normal">
          <p>Chào mừng bạn đến với HustEDU</p>
        </div>
      </div>
    </Content>
  );
}

export default Home;
