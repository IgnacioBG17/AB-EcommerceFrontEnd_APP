import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  getProductPaginationAdmin,
  registerProduct,
  updateProduct,
  updateStatusProduct,
} from "../../actions/productsAction";
import { deleteReview, getPaginationReviews } from "../../actions/reviewAction";
import {
  getPaginationUsersAdmin,
  getRolesList,
  updateAdminStatusUser,
  updateAdminUser,
} from "../../actions/userAction";

const sectionOptions = ["Dashboard", "Products", "Ordenes", "Usuarios", "Reviews"];

const initialProductData = {
  id: "",
  nombre: "",
  precio: "",
  descripcion: "",
  vendedor: "",
  stock: "",
  categoryId: "",
  fotos: [],
  imageUrls: [],
};

const initialUserData = {
  id: "",
  nombre: "",
  apellido: "",
  telefono: "",
  role: "",
};

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [submitting, setSubmitting] = useState(false);
  const [productData, setProductData] = useState(initialProductData);
  const [pageIndex, setPageIndex] = useState(1);

  const [reviewPageIndex, setReviewPageIndex] = useState(1);

  const [userPageIndex, setUserPageIndex] = useState(1);
  const [userSearch, setUserSearch] = useState("");
  const [userData, setUserData] = useState(initialUserData);

  const dispatch = useDispatch();
  const alert = useAlert();
  const { categories, loading: categoriesLoading } = useSelector((state) => state.category);
  const {
    loading: loadingProducts,
    submitting: submittingProducts,
    adminProducts,
    adminCount: totalItems,
  } = useSelector((state) => state.product);
  const {
    loading: loadingReviews,
    reviews,
    count: reviewTotalItems,
  } = useSelector((state) => state.reviewMaintenance);
  const {
    loading: loadingUsers,
    submitting: submittingUsers,
    users,
    count: userTotalItems,
    roles,
  } = useSelector((state) => state.userMaintenance);

  const isEditing = useMemo(() => Boolean(productData.id), [productData.id]);
  const isEditingUser = useMemo(() => Boolean(userData.id), [userData.id]);

  const fetchAdminProducts = useCallback(async () => {
    try {
      await dispatch(getProductPaginationAdmin({ pageIndex, pageSize: 8 })).unwrap();
    } catch (error) {
      alert.error(error || "No se pudo cargar el listado de productos");
    }
  }, [alert, dispatch, pageIndex]);

  const fetchReviews = useCallback(async () => {
    try {
      await dispatch(
        getPaginationReviews({ pageIndex: reviewPageIndex, pageSize: 8 })
      ).unwrap();
    } catch (error) {
      alert.error(error || "No se pudo cargar el listado de reviews");
    }
  }, [alert, dispatch, reviewPageIndex]);

  const fetchUsers = useCallback(async () => {
    try {
      await dispatch(
        getPaginationUsersAdmin({
          pageIndex: userPageIndex,
          pageSize: 8,
          search: userSearch?.trim() || null,
        })
      ).unwrap();
    } catch (error) {
      alert.error(error || "No se pudo cargar el listado de usuarios");
    }
  }, [alert, dispatch, userPageIndex, userSearch]);

  const fetchRoles = useCallback(async () => {
    try {
      await dispatch(getRolesList()).unwrap();
    } catch (error) {
      alert.error(error || "No se pudo cargar el listado de roles");
    }
  }, [alert, dispatch]);

  useEffect(() => {
    if (activeSection === "Products") {
      fetchAdminProducts();
    }
    if (activeSection === "Reviews") {
      fetchReviews();
    }
    if (activeSection === "Usuarios") {
      fetchUsers();
      fetchRoles();
    }
  }, [activeSection, fetchAdminProducts, fetchReviews, fetchUsers, fetchRoles]);

  const onProductFieldChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "fotos") {
      setProductData((prev) => ({ ...prev, fotos: files ? Array.from(files) : [] }));
      return;
    }

    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const onUserFieldChange = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const buildProductFormData = () => {
    const formData = new FormData();

    if (isEditing) {
      formData.set("Id", productData.id);
    }

    formData.set("Nombre", productData.nombre);
    formData.set("Precio", productData.precio);
    formData.set("Descripcion", productData.descripcion);
    formData.set("Vendedor", productData.vendedor);
    formData.set("Stock", productData.stock);
    formData.set("CategoryId", productData.categoryId);

    if (productData.fotos?.length > 0) {
      productData.fotos.forEach((foto) => {
        formData.append("Fotos", foto);
      });
    }

    if (isEditing && productData.imageUrls?.length > 0) {
      productData.imageUrls.forEach((image, index) => {
        if (image?.publicCode) {
          formData.set(`ImageUrls[${index}].PublicCode`, image.publicCode);
        }
        if (image?.url) {
          formData.set(`ImageUrls[${index}].Url`, image.url);
        }
      });
    }

    return formData;
  };

  const resetForm = () => {
    setProductData(initialProductData);
  };

  const resetUserForm = () => {
    setUserData(initialUserData);
  };

  const submitProductHandler = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      const formData = buildProductFormData();

      if (isEditing) {
        await dispatch(updateProduct(formData)).unwrap();
        alert.success("Producto actualizado correctamente");
      } else {
        await dispatch(registerProduct(formData)).unwrap();
        alert.success("Producto registrado correctamente");
      }

      resetForm();
      fetchAdminProducts();
    } catch (error) {
      alert.error(error || "No se pudo guardar el producto");
    } finally {
      setSubmitting(false);
    }
  };

  const submitUserHandler = async (event) => {
    event.preventDefault();

    if (!isEditingUser) {
      alert.error("Selecciona un usuario del listado para editar.");
      return;
    }

    try {
      await dispatch(
        updateAdminUser({
          id: userData.id,
          nombre: userData.nombre,
          apellido: userData.apellido,
          telefono: userData.telefono,
          role: userData.role,
        })
      ).unwrap();

      alert.success("Usuario actualizado correctamente");
      resetUserForm();
      fetchUsers();
    } catch (error) {
      alert.error(error || "No se pudo actualizar el usuario");
    }
  };

  const editProduct = (product) => {
    setProductData({
      id: product.id,
      nombre: product.nombre || "",
      precio: product.precio || "",
      descripcion: product.descripcion || "",
      vendedor: product.vendedor || "",
      stock: product.stock || "",
      categoryId: product.categoryId || "",
      fotos: [],
      imageUrls: (product.images || []).map((image) => ({
        publicCode: image.publicCode || image.publicId || image.code || "",
        url: image.url || "",
      })),
    });
  };

  const editUser = (user) => {
    setUserData({
      id: user.id || "",
      nombre: user.nombre || "",
      apellido: user.apellido || "",
      telefono: user.telefono || "",
      role: user.role || user.rol || "",
    });
  };

  const toggleStatus = async (id) => {
    try {
      await dispatch(updateStatusProduct(id)).unwrap();
      alert.success("Estado del producto actualizado");
      fetchAdminProducts();
    } catch (error) {
      alert.error(error || "No se pudo actualizar el estado del producto");
    }
  };

  const toggleUserStatus = async (id) => {
    try {
      await dispatch(updateAdminStatusUser(id)).unwrap();
      alert.success("Estado del usuario actualizado");
      fetchUsers();
    } catch (error) {
      alert.error(error || "No se pudo actualizar el estado del usuario");
    }
  };

  const onDeleteReview = async (id) => {
    try {
      await dispatch(deleteReview(id)).unwrap();
      alert.success("Review eliminado correctamente");
      fetchReviews();
    } catch (error) {
      alert.error(error || "No se pudo eliminar el review");
    }
  };

  const renderProductsSection = () => (
    <div className="maintenance-content">
      <h2 className="dashboard-title">Mantenimiento de Productos</h2>
      <p className="dashboard-subtitle">Crea, edita y cambia el estado de los productos desde esta pantalla.</p>

      <div className="product-maintenance-grid">
        <form className="product-maintenance-form" onSubmit={submitProductHandler}>
          <h5>{isEditing ? "Editar producto" : "Crear producto"}</h5>

          <div className="form-row-grid">
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                className="form-control"
                value={productData.nombre}
                onChange={onProductFieldChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="precio">Precio</label>
              <input
                id="precio"
                name="precio"
                type="number"
                className="form-control"
                value={productData.precio}
                onChange={onProductFieldChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              className="form-control"
              rows="3"
              value={productData.descripcion}
              onChange={onProductFieldChange}
              required
            />
          </div>

          <div className="form-row-grid">
            <div className="form-group">
              <label htmlFor="vendedor">Vendedor</label>
              <input
                id="vendedor"
                name="vendedor"
                type="text"
                className="form-control"
                value={productData.vendedor}
                onChange={onProductFieldChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input
                id="stock"
                name="stock"
                type="number"
                className="form-control"
                value={productData.stock}
                onChange={onProductFieldChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-row-grid">
            <div className="form-group">
              <label htmlFor="categoryId">Categoría</label>
              <select
                id="categoryId"
                name="categoryId"
                className="form-control"
                value={productData.categoryId}
                onChange={onProductFieldChange}
                required
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nombre}
                  </option>
                ))}
              </select>
              {categoriesLoading && <small>Cargando categorías...</small>}
            </div>

            <div className="form-group">
              <label htmlFor="fotos">Fotos</label>
              <input
                id="fotos"
                name="fotos"
                type="file"
                className="form-control"
                onChange={onProductFieldChange}
                accept="image/*"
                multiple
                required={!isEditing}
              />
              {productData.fotos?.length > 0 && <small>{productData.fotos.length} imagen(es) seleccionada(s)</small>}
            </div>
          </div>

          <div className="product-form-actions">
            <button type="submit" className="btn btn-warning mt-2" disabled={submittingProducts || submitting}>
              {submitting ? "Guardando..." : isEditing ? "Actualizar Producto" : "Guardar Producto"}
            </button>
            {isEditing && (
              <button type="button" className="btn btn-secondary mt-2" onClick={resetForm}>
                Cancelar edición
              </button>
            )}
          </div>
        </form>

        <div className="product-admin-list">
          <div className="product-admin-list-header">
            <h5>Listado administrativo</h5>
            <button type="button" className="btn btn-outline-warning btn-sm" onClick={fetchAdminProducts}>
              Recargar
            </button>
          </div>

          {loadingProducts ? (
            <p>Cargando productos...</p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-sm product-admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminProducts.map((product) => {
                      const statusValue = product.status || product.estado || "N/A";

                      return (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.nombre}</td>
                          <td>${product.precio}</td>
                          <td>{product.stock}</td>
                          <td>{statusValue}</td>
                          <td className="product-admin-actions">
                            <button type="button" className="btn btn-outline-info btn-sm" onClick={() => editProduct(product)}>
                              Editar
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => toggleStatus(product.id)}
                            >
                              Cambiar estado
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="product-pagination-actions">
                <button
                  type="button"
                  className="btn btn-sm theme-nav-btn"
                  onClick={() => setPageIndex((prev) => Math.max(prev - 1, 1))}
                  disabled={pageIndex <= 1}
                >
                  Anterior
                </button>
                <span>Página {pageIndex}</span>
                <button
                  type="button"
                  className="btn btn-sm theme-nav-btn"
                  onClick={() => setPageIndex((prev) => prev + 1)}
                  disabled={adminProducts.length === 0}
                >
                  Siguiente
                </button>
                <span>Total: {totalItems}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderUsersSection = () => (
    <div className="maintenance-content">
      <h2 className="dashboard-title">Mantenimiento de Usuarios</h2>
      <p className="dashboard-subtitle">Edita y cambia el estado de los usuarios desde esta pantalla.</p>

      <div className="product-maintenance-grid">
        <form className="product-maintenance-form" onSubmit={submitUserHandler}>
          <h5>{isEditingUser ? "Editar usuario" : "Selecciona un usuario"}</h5>

          <div className="form-row-grid">
            <div className="form-group">
              <label htmlFor="nombreUsuario">Nombre</label>
              <input
                id="nombreUsuario"
                name="nombre"
                type="text"
                className="form-control"
                value={userData.nombre}
                onChange={onUserFieldChange}
                disabled={!isEditingUser}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellidoUsuario">Apellido</label>
              <input
                id="apellidoUsuario"
                name="apellido"
                type="text"
                className="form-control"
                value={userData.apellido}
                onChange={onUserFieldChange}
                disabled={!isEditingUser}
                required
              />
            </div>
          </div>

          <div className="form-row-grid">
            <div className="form-group">
              <label htmlFor="telefonoUsuario">Teléfono</label>
              <input
                id="telefonoUsuario"
                name="telefono"
                type="text"
                className="form-control"
                value={userData.telefono}
                onChange={onUserFieldChange}
                disabled={!isEditingUser}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rolUsuario">Rol</label>
              <select
                id="rolUsuario"
                name="role"
                className="form-control"
                value={userData.role}
                onChange={onUserFieldChange}
                disabled={!isEditingUser}
                required
              >
                <option value="">Selecciona un rol</option>
                {roles.map((roleName) => (
                  <option key={roleName} value={roleName}>
                    {roleName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="product-form-actions">
            <button type="submit" className="btn btn-warning mt-2" disabled={!isEditingUser || submittingUsers}>
              {submittingUsers ? "Guardando..." : "Actualizar Usuario"}
            </button>
            {isEditingUser && (
              <button type="button" className="btn btn-secondary mt-2" onClick={resetUserForm}>
                Cancelar edición
              </button>
            )}
          </div>
        </form>

        <div className="product-admin-list">
          <div className="product-admin-list-header users-toolbar">
            <h5>Listado administrativo</h5>
            <div className="users-actions-inline">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Buscar usuario..."
                value={userSearch}
                onChange={(event) => {
                  setUserSearch(event.target.value);
                  setUserPageIndex(1);
                }}
              />
              <button type="button" className="btn btn-outline-warning btn-sm" onClick={fetchUsers}>
                Buscar
              </button>
              <button type="button" className="btn btn-outline-warning btn-sm" onClick={fetchRoles}>
                Roles
              </button>
              <button type="button" className="btn btn-outline-warning btn-sm" onClick={fetchUsers}>
                Recargar
              </button>
            </div>
          </div>

          {loadingUsers ? (
            <p>Cargando usuarios...</p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-sm product-admin-table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Teléfono</th>
                      <th>Rol</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => {
                      const statusValue = user.isActive === true
                                        ? "Activo" 
                                        : user.isActive === false
                                          ? "No Activo" 
                                          : "N/A";

                      return (
                        <tr key={user.id}>
                    
                          <td>{user.username || user.userName || "-"}</td>
                          <td>{user.nombre}</td>
                          <td>{user.apellido}</td>
                          <td>{user.telefono}</td>
                          <td>{user.role || user.rol}</td>
                          <td>{statusValue}</td>
                          <td className="product-admin-actions">
                            <button type="button" className="btn btn-outline-info btn-sm" onClick={() => editUser(user)}>
                              Editar
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => toggleUserStatus(user.id)}
                            >
                              Cambiar estado
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="product-pagination-actions">
                <button
                  type="button"
                  className="btn btn-sm theme-nav-btn"
                  onClick={() => setUserPageIndex((prev) => Math.max(prev - 1, 1))}
                  disabled={userPageIndex <= 1}
                >
                  Anterior
                </button>
                <span>Página {userPageIndex}</span>
                <button
                  type="button"
                  className="btn btn-sm theme-nav-btn"
                  onClick={() => setUserPageIndex((prev) => prev + 1)}
                  disabled={users.length === 0}
                >
                  Siguiente
                </button>
                <span>Total: {userTotalItems}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderReviewsSection = () => (
    <div className="maintenance-content">
      <h2 className="dashboard-title">Mantenimiento de Reviews</h2>
      <p className="dashboard-subtitle">Gestiona reviews existentes. La creación se realiza desde ProductDetail.</p>

      <div className="product-maintenance-grid">
        <div className="product-admin-list reviews-full-width">
          <div className="product-admin-list-header">
            <h5>Listado de reviews</h5>
            <button type="button" className="btn btn-outline-warning btn-sm" onClick={fetchReviews}>
              Recargar
            </button>
          </div>

          {loadingReviews ? (
            <p>Cargando reviews...</p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-sm product-admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Producto</th>
                      <th>Nombre</th>
                      <th>Rating</th>
                      <th>Comentario</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review) => (
                      <tr key={review.id}>
                        <td>{review.id}</td>
                        <td>{review.productId}</td>
                        <td>{review.nombre}</td>
                        <td>{review.rating}</td>
                        <td>{review.comentario}</td>
                        <td className="product-admin-actions">
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => onDeleteReview(review.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="product-pagination-actions">
                <button
                  type="button"
                  className="btn btn-sm theme-nav-btn"
                  onClick={() => setReviewPageIndex((prev) => Math.max(prev - 1, 1))}
                  disabled={reviewPageIndex <= 1}
                >
                  Anterior
                </button>
                <span>Página {reviewPageIndex}</span>
                <button
                  type="button"
                  className="btn btn-sm theme-nav-btn"
                  onClick={() => setReviewPageIndex((prev) => prev + 1)}
                  disabled={reviews.length === 0}
                >
                  Siguiente
                </button>
                <span>Total: {reviewTotalItems}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    if (activeSection === "Products") {
      return renderProductsSection();
    }

    if (activeSection === "Usuarios") {
      return renderUsersSection();
    }

    if (activeSection === "Reviews") {
      return renderReviewsSection();
    }

    return (
      <div>
        <h2 className="dashboard-title">{activeSection}</h2>
        <p className="dashboard-subtitle">Selecciona una opción del menú para administrar la tienda.</p>
      </div>
    );
  };

  return (
    <section className="dashboard-fullscreen">
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <h3>Panel</h3>
          <div className="dashboard-menu-wrapper">
            {sectionOptions.map((section) => (
              <button
                key={section}
                type="button"
                className={`dashboard-menu-item ${activeSection === section ? "active" : ""}`}
                onClick={() => setActiveSection(section)}
              >
                {section}
              </button>
            ))}
          </div>
        </aside>

        <article className="dashboard-main-panel">{renderSectionContent()}</article>
      </div>
    </section>
  );
};

export default Dashboard;
