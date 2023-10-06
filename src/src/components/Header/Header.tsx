import "./Header.scss";
import CubeIcon from "../../assets/Images/cube.png";

const Header = () => {
    return (
        <div className="header-container">
            <div className="left-content">
                <div><img src={CubeIcon} alt="Icon" style={{width: "40px", height: "40px"}}/></div>
                <div className="align-self-center">MeshJS  </div>
            </div>
            <div className="align-self-center">
                Refinery Factory
            </div>
            {/* <div style={{width:"200px"}}>
            </div> */}
        </div>
    );
};

export default Header;