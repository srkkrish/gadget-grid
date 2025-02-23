import { useState } from "react"
import { useNavigate } from 'react-router-dom'

import "./Header.css"
import productListImage from "./../../assets/product-list.png"

const Header = ({ title }: any) => {
    // Create a state variable to store the selected color
    const [headerColor, setHeaderColor] = useState("#F08080");
    const [textColor, setTextColor] = useState("#000");
    const navigate = useNavigate(); // Get the navigate function from useNavigate

    // Handle change in color input
    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeaderColor(event.target.value);
        setTextColor(getContrastColor(headerColor));
    };

    // Function to calculate contrast color (black or white)
    const getContrastColor = (hexColor: string): string => {
        // Convert hex color to RGB
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        // Calculate the brightness of the color using the luminance formula
        const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        // If brightness is high, set text color to black, otherwise white
        return brightness > 128 ? '#000000' : '#FFFFFF';
    }

    const RouteToHome = () => {
        navigate('/');
    }

    const Logout = () => {
        navigate('/logout');
    }

    return (
        <header className='listify-header' style={{ backgroundColor: headerColor, color: textColor }}>
            <div className="header-left">
                <img src={productListImage} alt="Product List" height={35} width={35} onClick={() => RouteToHome()} />
                {title}
            </div>
            <div className="header-right">
                <input type="color" name="headercolor" title="Choose header color" value={headerColor} onChange={handleColorChange} />
                <span className="fa fa-sign-out-alt" title="Logout" onClick={() => Logout()} style={{ color: getContrastColor(headerColor) }}></span>
            </div>
        </header>
    );
}
export default Header;