import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch } from "react-redux";
import { createNewProduct } from "../../../redux/actions/ProductAction";
import { checkOwnerPage } from "../../../redux/actions/UserAction";

function CreateNewProduct() {
  const { userId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateNewProduct = (e) => {
    e.preventDefault();

    const requestBody = {
      name,
      price,
      category,
      seller: userId,
      description,
    };
    dispatch(createNewProduct(requestBody));
    dispatch(checkOwnerPage(userId));
    navigate(`/${userId}/page`);
  };

  return (
    <div className="container-CU-product">
      <h1 className="title-CU-product">Ajoutez nouvelle annonce !</h1>

      <form onSubmit={handleCreateNewProduct}>
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
          Pour ajouter la description de l'annonce, veuillez retourner vers la
          version desktop.
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default CreateNewProduct;
