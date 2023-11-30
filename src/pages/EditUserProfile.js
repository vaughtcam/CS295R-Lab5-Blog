import Header from "../components/Header";
import UserContext from "../context/user"
import { useContext } from "react"
import { useForm, getValues } from "react-hook-form";
import './styles.css';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

function EditUserProfile() {
  
  const { user, editUserById } = useContext(UserContext)
  const [image, setImage] = useState(user.image)
  const navigate = useNavigate()
  console.log(user.email, user.name, user.id, user.bio, user.password)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id: user.id,
      email: user.email,
      name: user.name,
      userid: user.userid ,
      bio: user.bio,
      password: user.password
    }
  });

  const onSubmit = async (data) => {
    const { id, email, name, userid, bio, password} = data;
    console.log(data)
    const updatedUser = {
      name,
      userid,
      email,
      bio,
      password ,
      image
    }

    await editUserById(id, updatedUser);
    navigate('/');
  }

  const handleFileChange = (event) => {
    const file = URL.createObjectURL(event.target.files[0]);
    convertImageToBase64(file, removeTypeAndSave)
  }

  const removeTypeAndSave = (base64Image) => {
    const updatedImage = base64Image.replace(
      "data:image/png;base64,", ""); setImage(updatedImage);
  }

  return (
    <div className="App">
      
      <div>
        <img src={`data:image/png;base64,${image}`} height="300 px" alt="pic"></img>
        <h1>{user.name} </h1>
        {user.bio}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Profile Picture</label>
          <input onChange={handleFileChange}
            type="file"
            name="image"
            id="image"
          />
        </div>

        <div className="form-control">
          <label>Email</label>
          <input
            type="text"
            name="email"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid."
              }
            })}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </div>

        <div className="form-control">
          <label>Name</label>
          <input
            type="text"
            name="Name"
            {...register("name", {
              required: "Name is required.",
              message: "Name is Required"
            })
            }
          />
          {errors.name && (
            <p className="errorMsg">{errors.name.message}</p>
          )}
        </div>

        <div className="form-control">
          <label>Userid</label>
          <input
            type="text"
            name="Userid"
            {...register("userid", {
              required: "Userid is required.",
              message: "Userid is Required"
            })
            }
          />
          {errors.userid && (
            <p className="errorMsg">{errors.userid.message}</p>
          )}
        </div>

        <div className="form-control">
          <label>Tell Us About Yourself</label>
          <input
            type="text"
            name="Bio"
            {...register("bio", {
              required: "Bio is required.",
              message: "Bio is Required"
            })
            }
          />
          {errors.bio && (
            <p className="errorMsg">{errors.bio.message}</p>
          )}
        </div>

        <div className="form-control">
          <label></label>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
export default EditUserProfile