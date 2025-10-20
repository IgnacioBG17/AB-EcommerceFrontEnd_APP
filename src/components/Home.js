import { Fragment, useEffect } from "react";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProductPagination, getProducts } from "../actions/productsAction";
import { useAlert } from "react-alert";
import Products  from "./products/Products";
import Pagination from "react-js-pagination";
import { setPageIndex } from "../slices/productPaginationSlice";

const Home = () => {
  const dispatch = useDispatch();
  //const { products, loading, error } = useSelector((state) => state.products);

  const {
    products,
    count,
    pageIndex,
    pageSize,
    pageCount,
    loading,
    resultByPage,
    error,
    search,
    precioMax,
    precioMin,
    category,
    rating,
  } = useSelector((state) => state.productPagination);
  
  const alert = useAlert();

  useEffect(() => {
    if (error != null) {
      return alert.error(error);
    }

    dispatch(
      getProductPagination({
        pageIndex: pageIndex,
        pageSize: pageSize,
        search: search,
        precioMax: precioMax,
        precioMin: precioMin,
        categoryId: category,
        rating: rating,
      })
    );

  }, [
    dispatch,
    error,
    alert,
    search,
    pageSize,
    pageIndex,
    precioMax,
    precioMin,
    category,
    rating,
  ]);

  function setCurrentPageNo(pageNumber){
	dispatch(setPageIndex({ pageIndex: pageNumber }))
  }

  return (
    <Fragment>
      <MetaData titulo={"Los mejores productos online"} />
      <section id="products" className="container mt-5">
        <div className="row">
          <Products col={4} products={products} loading={loading} />
        </div>
      </section>

      <div className="d-flex justify-content-center mt-5">
          <Pagination 
            activePage={pageIndex}
			itemsCountPerPage={pageSize}
			totalItemsCount={count}
			onChange={setCurrentPageNo}
			nextPageText={">"}
			prevPageText={"<"}
			firstPageText={"<<"}
			lastPageText={">>"}
			itemClass="page-item"
			linkClass="page-link"
          />
      </div>
    </Fragment>
  );
};

export default Home;
