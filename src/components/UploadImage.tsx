/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const UploadImage: React.FC = () => {
  //   const [image, setImage] = useState<string>("");
  //   const [url, setUrl] = useState<string>("");
  //   const [preview, setPreview] = useState(null);
  //   function validateFileType() {
  //     var fileName = document.getElementById("fileName").value;
  //     var idxDot = fileName.lastIndexOf(".") + 1;
  //     var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
  //     if (extFile == "jpg" || extFile == "jpeg" || extFile == "png" || extFile == "gif") {
  //       //TO DO
  //     } else {
  //       alert("Only jpg, jpeg, png and gif files are allowed!");
  //     }
  //   }
  //   const uploadImage = async () => {
  //     const data = new FormData();
  //     data.append("file", image);
  //     data.append("upload_preset", "kjrswtpy");
  //     data.append("cloud_name", "dwjypnbvd");
  //     data.append("folder", "quiz");

  //     try {
  //       const response = await fetch(
  //         `https://api.cloudinary.com/v1_1/dwjypnbvd/image/upload`,
  //         {
  //           method: "POST",
  //           body: data,
  //         }
  //       );
  //       const res = await response.json();
  //       setUrl(res.public_id);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const handleImageChange = (event) => {
  //     const file = event.target.files[0];
  //     setImage(file);

  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);

  //     reader.onload = () => {
  //       setPreview(reader.result);
  //     };
  //   };
  return (
    // <div className="p-xsmall border-2 border-dashed w-20 h-16 border-gray-400 rounded-md">
    //   <label htmlFor="" className="">
    //     <input
    //       type="file"
    //       className=""
    //       accept="image/*"
    //       onChange={handleImageChange}
    //     />
    //   </label>
    //   {preview && <img src={preview} alt="preview" className="w-full" />}
    // </div>
    <></>
  );
};

export default UploadImage;
