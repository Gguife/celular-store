import { useEffect, useState } from "react"
import {BsFillCartCheckFill, BsFillCartPlusFill , BsCartFill} from 'react-icons/bs';
import { getItem, setItem } from "../services/LocalStorageFuncs";
import { Link } from "react-router-dom";
import '../styles/Store.css'

export const Store = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState( getItem('carrinhoStore') || []);


  useEffect(() => {
    const fecthApi = async () =>{
      const url = 'https://api.mercadolibre.com/sites/MLB/search?q=celular';
      const response = await fetch(url)
      const objJson = await response.json();
      setData(objJson.results);
    }
    fecthApi();
  }, [])
  
  const handleClick = (obj) =>{
    const element = cart.find((item) => item.id === obj.id)
    if(element) {
      const arrFilter = cart.filter((item) => item.id !== obj.id)
      setCart(arrFilter)
      setItem('carrinhoStore', arrFilter)
    }else{
      setCart([...cart, obj])
      setItem('carrinhoStore', [...cart, obj])
    }
  }

  return (
    <div>
      <div className="logo">
        <a href="https://github.com/Gguife">Gguife</a>
      </div>
      <div className="cart-div">
        <Link to='/cart'><button><BsCartFill /> Cart</button></Link>
      </div>
      <h1>Store</h1>
      <hr />
      <div className="container">
        {
          data.map((item, key) => (
            <div key={key} className='container-store'>
              <h4>{item.title}</h4>
              <img src={item.thumbnail} alt={item.title}/>
              <h4>R$ {item.price}.00</h4>
              <button onClick={() => handleClick(item)}>
                {
                  cart.some((itemCard) => itemCard.id === item.id) ? ( <BsFillCartCheckFill /> ) : ( <BsFillCartPlusFill /> )
                }
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
}
