import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../../../api/products";
import { ProductDetail } from "../../../types/products";
import { useNavigate } from 'react-router-dom'
import { addToCart } from "../../../api/cart";
import { useUserContext } from "../../../context/UserContext";
import "./ProductDetails.scss"


const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const [currentImg, setCurrentImg] = useState("")
  const { user } = useUserContext()
  console.log(user)
  const [quantity, setQuantity] = useState(1)

  const activeCardStyle = {
    transform: 'scale(1.1)',
    opacity: '0.7',
    border: '3px solid #F67D28',
  }


  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        if (id) {
          const productData = await fetchProductDetails(parseInt(id));
          setProduct(productData);
          setCurrentImg(productData.image);
          setLoading(false);
        }
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [id]);

  const backButton = () => {
    navigate("/products")
  }
  const addToCartHandler = (userId: number, prodId: number, qty: number) => {
    addToCart(userId, prodId, qty)
    alert(product?.title + " added to cart")
  }
  const handleIncre = () => {
    setQuantity((prev) => prev + 1)
  }
  const handleDecre = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error: {error}</p>;


  const dummyURLS = ["https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTx6aLFiKo9VX-PCamdQyb7Zbpm7ID9PXZXfzfK7wWi_bSNORS2dJFApLj9Ybx0mS_96HuA5MQKfNoSsTuUtNpML-Ct4qPcodjbqzLw_btd4vg4mSo_HWDm5IU",
    "https://www.shutterstock.com/shutterstock/photos/2174646593/display_1500/stock-photo-walk-modern-unisex-footwear-sneakers-isolated-on-orange-background-fashionable-stylish-sports-2174646593.jpg",
    "https://media.istockphoto.com/id/91830363/photo/tennis.jpg?s=612x612&w=0&k=20&c=kjLeEmmqiyewvRZaaRskWUvtkeaonJF0jXrNrxpFENI="

  ]
  return (
    <>
      <button onClick={backButton}>Back</button>
      <div className="Product-List-Container">
        {/* add image and list of images in first aside  and add product details in 2nd aside*/}
        <aside className="product-details-container">
          <div className="main-image">
            <img src={currentImg} alt="product image" />
          </div>
          <div className="image-list">

            <ul>
              <li
                style={currentImg === product?.image ? activeCardStyle : {}}
                onClick={() => setCurrentImg(product?.image || "")}
              >
                <img src={product?.image} alt="Product Image 1" />
              </li>
              <li
                style={currentImg === dummyURLS[0] ? activeCardStyle : {}}
                onClick={() => setCurrentImg(dummyURLS[0])}
              >
                <img src={dummyURLS[0]} alt="Dummy Image 1" />
              </li>

              <li
                style={currentImg === dummyURLS[1] ? activeCardStyle : {}}
                onClick={() => setCurrentImg(dummyURLS[1])}
              >
                <img src={dummyURLS[1]} alt="Dummy Image 2" />
              </li>
              <li
                style={currentImg === dummyURLS[2] ? activeCardStyle : {}}
                onClick={() => setCurrentImg(dummyURLS[2] || "")}
              >
                <img src={dummyURLS[2]} alt="Product Image 2" />
              </li>
            </ul>

          </div>
        </aside >
        <aside className="product-desc-container">
          <h5>{product?.category}</h5>
          <h2>{product?.title}</h2>
          <p className="prod-desc">{product?.description}</p>
          <p className="prod-price">${product?.price}</p>
          <p className="prod-price prod-original-price">${(product?.price || 0) + 149}</p>
          <p className="prod-rating">Rating: {product?.ratingRate}</p>
          <div className="buttons-container"><button onClick={handleDecre} className="button-cart" >-</button> <span>{quantity}</span>
            <button onClick={handleIncre} className="button-cart">+</button></div>

          {(user?.id && product?.id) ? <button className="button-add-cart" onClick={() => addToCartHandler(user.id, product?.id, quantity)}>Add to Cart</button> : null}
        </aside>
      </div >
    </>
  )
};

export default ProductDetails;