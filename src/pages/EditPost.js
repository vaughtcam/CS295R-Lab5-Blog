import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import PostContext from "../context/posts"
import UserContext from "../context/user"
import { useContext } from "react"
import { Controller, useForm } from "react-hook-form";
import './styles.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

///should probably go in a separate file in a folder called utilities

function convertImageToBase64(imgUrl, callback) {
  const image = new Image(); image.crossOrigin = 'anonymous';
  image.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d'); canvas.height = image.naturalHeight; canvas.width = image.naturalWidth; ctx.drawImage(image, 0, 0);
    const dataUrl = canvas.toDataURL();
    callback && callback(dataUrl)
  }
  image.src = imgUrl;
}


function EditPost() {

  const { categories, createPost, editPostById } = useContext(PostContext)
  const { user } = useContext(UserContext)
  const location = useLocation();
  const navigate = useNavigate();
  const isNew = location.pathname === "/posts/new"

  const newPost = {
    "userId": user.id,
    "title": "Title",
    "content": "Content",
    "datetime": new Date().getTime(),
    "category": categories[0].name
  };
  const post = (isNew) ? newPost : location.state;
  const [image, setImage] = useState(post.image)
  const [postContent, setPostContent] = useState(post.content);


  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: post.title,
      category: post.category,
    }
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }]
    ]
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font"
  ];

  const handlePostContentChange = (content, delta, source, editor) => {
    setPostContent(content);
  }

  const handleFileChange = (event) => {
    const file = URL.createObjectURL(event.target.files[0]);
    convertImageToBase64(file, removeTypeAndSave)
  }

  const removeTypeAndSave = (base64Image) => {
    const updatedImage = base64Image.replace(
      "data:image/png;base64,", ""); setImage(updatedImage);
  }

  const onSubmit = async (data) => {
    const { title, datetime, category } = data;
    console.log(data)
    const updatedPost = {
      title,
      userId: parseInt(user.id),
      datetime: parseInt(datetime),
      category,
      content: postContent,
      image
    }

    if (!isNew)
      await editPostById(post.id, updatedPost);
    else
      await createPost(updatedPost, user);

    navigate('/');
  }

  return (
    <div className="App">

      <div>
        <img src={`data:image/png;base64, ${image}`} height="350px"></img>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Picture</label>
          <input onChange={handleFileChange}
            type="file"
            name="image"
            id="image"
          />
        </div>

        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            name="Title"
            {...register("title", {
              required: "Title is required.",
              message: "Title is required"
            })}
          />
          {errors.title && <p className="errorMsg">{errors.title.message}</p>}
        </div>

        <div className="form-control">
          <label> Category </label>
          <select {...register("category", {
            required: "Category is required.",
            message: "Category is required"
          })}>
            <option value="games">Games</option>
            <option value="misc">Misc</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
          {errors.Category && <p className="errorMsg">{errors.Category.message}</p>}
        </div>

        <div className="form-control">
          <label>Posted On</label>
          <label>{new Date(post.datetime).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })}</label>
        </div>

        <ReactQuill
          className="ql-editor"
          theme="snow"
          modules={modules}
          formats={formats}
          value={postContent}
          onChange={handlePostContentChange}
        />

        <div className="form-control">
          <label></label>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default EditPost