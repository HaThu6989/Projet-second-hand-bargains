import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Header from "../../../common/header/Header";
import { useDispatch } from "react-redux";
import axios from "axios";

function CreateNewProduct() {
  const { userId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  // const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const storedToken = localStorage.getItem("authToken");
  console.log("storedToken", storedToken);
  const handleCreateNewProduct = () => {
    const requestBody = {
      name,
      price,
      category,
      seller: userId,
    };
    console.log("requestBody", requestBody);
    axios
      .post("http://localhost:5006/product/createNewProduct", requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("response.data", response.data);
        // Navigate(`/${userId}/page`);
      })
      .catch((error) => console.log("error", error));
    console.log("requestBody", requestBody);
    // dispatch(createNewProduct(request));
  };

  return (
    <>
      <Header />
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
              <option value="autre">Choisir un type de catégorie</option>
              <option value="electromenager">Electromenager</option>
              <option value="ameublement">Ameublement</option>
              <option value="enfants">Enfants</option>
              <option value="vetements">Vêtements</option>
              <option value="livres">Livres</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          {/* <div className="description">
          <label>Description</label>
          <CKEditor
            config={{
              ckfinder: {
                uploadUrl: `${process.env.REACT_APP_API_URL}/upload-image-product`,
                withCredentials: true,
                headers: {
                  "Content-Type": "image/jpeg",
                  Authorization: "your token",
                },
              },
            }}
            editor={ClassicEditor}
            data={description}
            onReady={(editor) => {
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              // console.log({ event, editor, data });
              return setDescription(data);
            }}
          />
        </div> */}
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </>
  );
}

export default CreateNewProduct;
