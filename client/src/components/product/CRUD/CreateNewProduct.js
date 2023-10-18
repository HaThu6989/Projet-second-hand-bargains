import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

function CreateNewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateNewProduct = () => {
    const requets = {
      name,
      price,
      category,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/product/createNewProduct`,
        requets
      )
      .then((response) => {
        console.log("response.data", response.data);
        // setProducts(json);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container-CU-product">
      <div className="title-CU-product">Ajoutez votre nouvelle annonce !!!</div>

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
            <option>Choisir un type de catégorie</option>
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
  );
}

export default CreateNewProduct;
