import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'; // To access the category parameter in the URL

import './DetailedProduct.css'

const prodHeaders: any = ["Model", "Brand", "Color", "Description", "Discount", "Image", "Price", "Title"];

const DetailedProduct = () => {
    const { category } = useParams(); // Get the category from the URL parameter
    const [loading, setLoading] = useState(true); // To manage loading state
    const [error, setError] = useState(''); // To manage errors during API call
    const [products, setProducts] = useState([]); // State to store fetched products
    const [productHeaders, setProductHeaders] = useState([]); // State to store product headers
    const [searchTerm, setSearchTerm] = useState(''); // State to store search term
    const [filteredProducts, setFilteredProducts] = useState([]); // State to store filtered products

    useEffect(() => {
        setProductHeaders(prodHeaders);
        const fetchProducts = async () => {
            try {
                setLoading(true); // Start loading
                const response = await fetch(`https://fakestoreapi.in/api/products/category?type=${category}`);
                const data = await response.json();
                console.log(data);
                setProducts(data.products); // Store fetched products in state
            } catch (error) {
                setError('Failed to fetch products'); // Handle any errors
                console.error(error);
            } finally {
                setLoading(false); // Stop loading after fetching data
            }
        };

        if (category) {
            fetchProducts(); // Fetch products when category changes
        }
    }, [category]); // Re-fetch products if category changes

    useEffect(() => {
        filterProducts(); // Call filterProducts when searchTerm or products change
    }, [searchTerm, products]);

    const filterProducts = () => {
        if (!searchTerm) {
            setFilteredProducts(products);
            return;
        }

        const filtered = products.filter((product: any) => {
            const searchLower = searchTerm.toLowerCase();
            return (
                product.model?.toLowerCase().includes(searchLower) ||
                product.brand?.toLowerCase().includes(searchLower) ||
                product.color?.toLowerCase().includes(searchLower) ||
                product.description?.toLowerCase().includes(searchLower) ||
                product.title?.toLowerCase().includes(searchLower)
            );
        });
        setFilteredProducts(filtered);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const ShowDescDialog = (product: any): any => {
        const dialog: any = document.querySelector(".view-detailed-description");
        if (dialog) {
            const content: any = document.querySelector(".view-detailed-description .content");
            content.innerHTML = `<p>${product.description}</p>`; // Set the dialog content dynamically
            dialog.showModal();
        }
    }

    const CloseDescDialog = () => {
        const dialog: any = document.querySelector(".view-detailed-description");
        if (dialog) dialog.close();
    }

    return (
        <div className='detailed-products'>

            <div className="header">
                <h3>Products in {category} Category</h3>
                <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
            </div>

            {loading && <p style={{ fontSize: '1.25rem' }}>Loading products &#x1F4E6;</p>}
            {error && <p>{error}</p>}

            {products && products.length > 0 && <div className="products-list">
                <table>
                    <thead>
                        <tr>
                            {productHeaders.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {filteredProducts.map((product: any, index: any) => (
                            <tr key={index}>
                                <td className="model-field">{product.model}</td>
                                <td>{product.brand}</td>
                                <td>{product.color}</td>
                                <td>
                                    <div className="desc-field">
                                        <div className="truncate-description">
                                            {product.description}
                                        </div>
                                        <div className="fa fa-window-maximize" onClick={() => ShowDescDialog(product)}
                                            title="View detailed description">
                                        </div>
                                    </div>
                                </td>
                                <td>{product.discount}</td>
                                <td className="img-field">
                                    <img src={product.image} alt={product.title} style={{ width: '100px' }} />
                                </td>
                                <td>{product.price}$</td>
                                <td>{product.title}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}

            <dialog className="view-detailed-description">
                <div className="header">
                    <h4>View Description</h4>
                    <button onClick={() => CloseDescDialog()}>X</button>
                </div>

                <div className="content"></div>
            </dialog>
        </div>
    );
}
export default DetailedProduct;