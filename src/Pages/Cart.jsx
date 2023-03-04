import { getItem, setItem} from "../services/LocalStorageFuncs"
import { useState } from "react"
import { BsFillCartDashFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { BsFillBackspaceFill } from 'react-icons/bs';
import '../styles/Cart.css'

export const Cart = () => {
  const [data, setData] = useState(getItem('carrinhoStore') || []);
  


  const removeItem = (obj) =>{
    const arrFilter = data.filter((item) => item.id !== obj.id)
    setData(arrFilter)
    setItem('carrinhoStore', arrFilter)
  }

  return (
    <div>
      <div className="voltar">
        <Link to='/'><p><BsFillBackspaceFill/></p></Link>
      </div>
      <h1>Cart</h1>
      <hr />
      <div className='container'>
        {
          data.map((item, key) =>(
            <div key={key} className='container-cart'>
              <h4>{item.title}</h4>
              <img src={item.thumbnail} alt={item.title} />
              <h4>R$ {item.price}.00</h4>
              <button onClick={() => removeItem(item)}> <BsFillCartDashFill /> </button>
            </div>
          ))
        }
        {data.length <= 0 &&
          <div className="cart-clear">
            <p>Adicione algum conteúdo no carrinho.</p>
          </div>
        }
      </div>
    </div>
  )
}