import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../actions/productsAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader";
import { Carousel } from "react-bootstrap";
import { addItemShoppingCart } from "../../actions/cartAction";
import { createReview } from "../../actions/reviewAction";

const ProductDetail = () => {
  const { shoppingCartId, shoppingCartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.security);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [rating, setRating] = useState(5);
  const [comentario, setComentario] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { loading, error, product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductById(id));

    if (error != null) {
      alert.error(error);
    }
  }, [dispatch, alert, error, id]);

  const images = useMemo(() => {
    if (!product?.images || product.images.length === 0) {
      return [{ id: "default", url: "/images/default_product.png" }];
    }
    return product.images;
  }, [product]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [id]);

  if (!product || loading) {
    return <Loader />;
  }

  const increaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber >= product.stock) return;
    setQuantity(count.valueAsNumber + 1);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;
    setQuantity(count.valueAsNumber - 1);
  };

  const addToCart = () => {
    const item = {
      cantidad: quantity,
      imagen: images[activeImageIndex]?.url || images[0]?.url,
      precio: product.precio,
      productId: product.id,
      producto: product.nombre,
      stock: product.stock,
    };

    const params = {
      shoppingCartId,
      shoppingCartItems,
      cantidad: quantity,
      productId: id,
      item,
    };

    dispatch(addItemShoppingCart(params));
    alert.success("El producto fue agregado al carrito");
  };

  const submitReviewHandler = async () => {
    if (!comentario.trim()) {
      alert.error("Ingresa un comentario");
      return;
    }

    try {
      setSubmittingReview(true);
      await dispatch(
        createReview({
          ProductId: Number(id),
          Nombre: user?.nombre || "Cliente",
          Rating: Number(rating),
          Comentario: comentario,
        })
      ).unwrap();

      alert.success("Review enviado correctamente");
      setComentario("");
      setRating(5);
      dispatch(getProductById(id));
    } catch (reviewError) {
      alert.error(reviewError || "No se pudo enviar el review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const onPrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const onNextImage = () => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="row f-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <Carousel
          pause="hover"
          controls={false}
          indicators={images.length > 1}
          activeIndex={activeImageIndex}
          onSelect={(selectedIndex) => setActiveImageIndex(selectedIndex)}
        >
          {images.map((image, index) => (
            <Carousel.Item key={image.id || index}>
              <img className="d-block w-100" src={image.url} alt={`${product.nombre} ${index + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>

        {images.length > 1 && (
          <div className="product-carousel-actions">
            <button type="button" className="btn btn-sm theme-nav-btn" onClick={onPrevImage}>
              Previous
            </button>
            <span>
              {activeImageIndex + 1} / {images.length}
            </span>
            <button type="button" className="btn btn-sm theme-nav-btn" onClick={onNextImage}>
              Next
            </button>
          </div>
        )}
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{product.nombre}</h3>
        <p id="product_id">Product # {product.id}</p>

        <hr />

        <div className="rating-outer">
          <div className="rating-inner" style={{ width: `${(product.rating / 5) * 100}%` }}></div>
        </div>
        <span id="no_of_reviews">({product.numeroReviews} Reviews)</span>

        <hr />

        <p id="product_price">${product.precio}</p>
        <div className="stockCounter d-inline">
          <span className="btn btn-danger minus" onClick={decreaseQty}>
            -
          </span>
          <input type="number" className="form-control count d-inline" value={quantity} readOnly />
          <span className="btn btn-primary plus" onClick={increaseQty}>
            +
          </span>
        </div>
        <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" onClick={addToCart}>
          Agregar al carrito
        </button>

        <hr />

        <p>
          Status:
          <span id="stock_status" className={product.stock > 0 ? "greenColor" : "redColor"}>
            {product.stock > 0 ? "En Stock" : "Fuera de Stock"}
          </span>
        </p>

        <hr />

        <h4 className="mt-2">Description:</h4>
        <p>{product.descripcion}</p>
        <hr />
        <p id="product_seller mb-3">
          Vendedor: <strong>{product.vendedor}</strong>
        </p>

        <button
          id="review_btn"
          type="button"
          className="btn btn-primary mt-4"
          data-toggle="modal"
          data-target="#ratingModal"
        >
          Submit Your Review
        </button>

        <div className="row mt-2 mb-5">
          <div className="rating w-50">
            <div
              className="modal fade"
              id="ratingModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="ratingModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="ratingModalLabel">
                      Submit Review
                    </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <ul className="stars">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <li
                          key={value}
                          className={`star ${value <= rating ? "orange" : ""}`}
                          onClick={() => setRating(value)}
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fa fa-star"></i>
                        </li>
                      ))}
                    </ul>

                    <textarea
                      name="review"
                      id="review"
                      className="form-control mt-3"
                      value={comentario}
                      onChange={(event) => setComentario(event.target.value)}
                    ></textarea>

                    <button
                      className="btn my-3 float-right review-btn px-4 text-white"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={submitReviewHandler}
                      disabled={submittingReview}
                    >
                      {submittingReview ? "Enviando..." : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
