import { useState, useEffect } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while fetching the orders.");
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value
    });

    if (response.data.success) {
      await fetchAllOrders();
    }

  }

  useEffect(() => {
    fetchAllOrders();
  }, [url]); // Add url as a dependency

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="parcel_icon" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}{idx === order.items.length - 1 ? '' : ', '}
                  </span>
                ))}
              </p>
              <p className="order-item-name">
                {order.address.first_name} {order.address.last_name}
              </p>
              <div className='order-item-address'>
                <p>{order.address.street + ", " + order.address.city}</p>
                <p>{order.address.state + ", " + order.address.country}</p>
                <p>Pincode: {order.address.zip}</p>
              </div>
              <p className="order-item-phone">Phone: {order.address.mobile}</p>
            </div>
            <p>Items: {order.items.length} </p>
            <p>Total: &#8377; {order.amount} </p>

            <select onChange={(event) => statusHandler(event, order._id)} value={order.status} >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
