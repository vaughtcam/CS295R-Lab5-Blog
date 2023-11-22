import Header from "../components/Header";
import UserContext from "../context/user"
import { useContext } from "react"
import { useForm } from "react-hook-form";
import './styles.css';
import { useState } from "react";


/*const {user} = useContext(UserContext)
const [image, setImage] = useState(user.image)

function convertImageToBase64(imgUrl, callback) { const image = new Image(); image.crossOrigin='anonymous';
image.onload = () => {
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d'); canvas.height = image.naturalHeight; canvas.width = image.naturalWidth; ctx.drawImage(image, 0, 0);
const dataUrl = canvas.toDataURL();
callback && callback(dataUrl) }
    image.src = imgUrl;
}
const handleFileChange = (event) => {
const file = URL.createObjectURL(event.target.files[0]);
convertImageToBase64(file, removeTypeAndSave) }
const removeTypeAndSave = (base64Image) => { const updatedImage = base64Image.replace(
"data:image/png;base64,", "" ); setImage(updatedImage);
}
*/

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
  /*
      const {user} = useContext(UserContext)
      return (
          <div>
              <header><img src={`data:image/png;base64, ${user.image}`}></img></header>
          <h1>{user.name} </h1>
          {user.bio}
          
          </div>s
      );
  */


  const { user } = useContext(UserContext)
  const [image, setImage] = useState(user.image)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleFileChange = (event) => {
    const file = URL.createObjectURL(event.target.files[0]);
    convertImageToBase64(file, removeTypeAndSave)
  }

  const removeTypeAndSave = (base64Image) => {
    const updatedImage = base64Image.replace(
      "data:image/png;base64,", ""); setImage(updatedImage);
  }


  //<img src={`data:image/png;base64, ${user.image}`}></img>
  //<img src={`data:image/png;base64,"${image}"`}></img>
  return (
    <div className="App">
      <div>
      <img src={`data:image/png;base64,"${image}"`} alt ="pic"></img>
        <h1>{user.name} </h1>
        {user.bio}
      </div>
      

      <form onSubmit={handleSubmit(onSubmit)}>


        <div className="form-control">
          <label>Profile Picture</label>
          <input onChange={handleFileChange}
            type="file"
            name="image"
            {...register("image", {
              required: "image is required.",
              message: "image is Required"
            })
            }
          />
          {errors.image && (
            <p className="errorMsg">{errors.image.message}</p>
          )}
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
            {...register("Name", {
              required: "Name is required.",
              message: "Name is Required"
            })
            }
          />
          {errors.Name && (
            <p className="errorMsg">{errors.Name.message}</p>
          )}
        </div>



        <div className="form-control">
          <label>Userid</label>
          <input
            type="text"
            name="Userid"
            {...register("Userid", {
              required: "Userid is required.",
              message: "Userid is Required"
            })
            }
          />
          {errors.Userid && (
            <p className="errorMsg">{errors.Userid.message}</p>
          )}
        </div>






        <div className="form-control">
          <label>Tell Us About Yourself</label>
          <input
            type="text"
            name="Bio"
            {...register("Bio", {
              required: "Bio is required.",
              message: "Bio is Required"
            })
            }
          />
          {errors.Bio && (
            <p className="errorMsg">{errors.Bio.message}</p>
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