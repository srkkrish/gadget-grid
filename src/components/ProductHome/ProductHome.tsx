import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

import './ProductHome.css'

let categoryIcons = {
    appliances: "fa fa-cogs",
    audio: "fa fa-music",
    gaming: "fa fa-gamepad",
    laptop: "fa fa-laptop",
    mobile: "fa fa-mobile",
    tv: "fa fa-tv"
};

const ProductHome = () => {
    const [categories, setCategories] = useState({ "status": "", "message": "", "categories": [] }); // State to store fetched categories
    const navigate = useNavigate(); // Get the navigate function from useNavigate

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://fakestoreapi.in/api/products/category');
                const data = await response.json();
                setCategories(data); // Store the fetched categories in state
                console.log(data);
            } catch (error) {
                console.log(error); // If there's an error, log the error message
            }
        }
        fetchCategories();
    }, [])

    // Fetch products based on the selected category
    const LoadProducts = async (category: any) => {
        navigate(`/product/${category}`); // Navigate to DetailedProduct page with the category as parameter
    }

    return (
        <div className='product-home'>
            <h3>Categories</h3>
            <div className="categories-list">
                <h3>{categories?.message}</h3>
                <ul>
                    {categories.categories.map((category, index) => (
                        <li title={`${category}`} key={index} onClick={() => LoadProducts(category)}>
                            <span className={`${categoryIcons[category]}`}></span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default ProductHome;