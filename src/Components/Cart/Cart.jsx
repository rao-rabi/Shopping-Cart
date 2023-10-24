import { useEffect, useState } from "react";
import { CartState } from "../Context/Context";
import "./Cart.css";
import Rating from "../Rating/Rating";
import { ListGroup, Button, Row, Col, Image, Form } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
function Cart() {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);
  return (
    <div className="cartList">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} rounded fluid />
                </Col>
                <Col md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>
                  <span>Rs. {prod.price}</span>
                </Col>
                <Col md={2}>
                  <Rating rating={prod.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
                    <AiFillDelete fontSize={"20px"} />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <div className="filters summary">
        <span className="title">Subtotal {cart.length} items</span>
        <span style={{ fontSize: 20, fontWeight: 700 }}>Total: Rs.{total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cart;
