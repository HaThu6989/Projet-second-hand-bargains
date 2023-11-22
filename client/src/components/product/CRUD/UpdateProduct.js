import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  updateProduct,
  checkOwnerPage,
} from "../../../redux/actions/ProductAction";
import { AuthContext } from "../../../context/auth.context";

function UpdateProduct() {
  const { productId } = useParams();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { data } = location?.state;

  const [name, setName] = useState(data?.name);
  const [price, setPrice] = useState(data?.price);
  const [category, setCategory] = useState(data?.category);
  const [description, setDescription] = useState(data?.description);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateProduct = (e) => {
    e.preventDefault();

    console.log("aaaaaaaaaaaaaaaa");
    const requestBody = {
      name,
      price,
      category,
      description,
    };

    console.log("requestBody", requestBody);
    console.log("user", user);
    console.log("productId", productId);
    dispatch(updateProduct(productId, requestBody));
    navigate(`/productList/${productId}`);
  };

  return (
    <div className="container-CU-product">
      <h1 className="title-CU-product">Mise à jour votre annonce !</h1>

      <form onSubmit={handleUpdateProduct}>
        <div className="box-label-input">
          <label>Nom</label>
          <input
            type="text"
            name="name"
            value={name}
            required={true}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="box-label-input">
          <label>Prix</label>
          <input
            type="number"
            name="price"
            min="0"
            value={price}
            required={true}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="box-label-input">
          <label>Catégorie</label>
          <select
            as="select"
            type="select"
            name="category"
            value={category}
            required={true}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Choisir un type de catégorie</option>
            <option value="electromenager">Electromenager</option>
            <option value="ameublement">Ameublement</option>
            <option value="enfants">Enfants</option>
            <option value="vetements">Vêtements</option>
            <option value="livres">Livres</option>
            <option value="autres">Autres</option>
          </select>
        </div>
        <div className="description">
          <label>Description</label>
          <CKEditor
            editor={ClassicEditor}
            config={{
              ckfinder: {
                uploadUrl: `${process.env.REACT_APP_API_URL}/product/upload-image-product`,
                withCredentials: true,
                headers: {
                  "Content-Type": "image/jpeg",
                },
              },
            }}
            data={description}
            onChange={(event, editor) => {
              const data = editor.getData();
              return setDescription(data);
            }}
          />
        </div>
        <div className="description-mobile">
          Pour mettre à jour la description de l'annonce, veuillez retourner
          vers la version desktop.
        </div>
        <button type="submit">Editer</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
