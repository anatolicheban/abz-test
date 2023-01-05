const EMAIL_REGEX =
  // eslint-disable-next-line no-control-regex
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
// eslint-disable-next-line no-useless-escape
const PHONE_REGEX = /^[\+]{0,1}380([0-9]{9})$/;

type Data = {
  name: string;
  email: string;
  phone: string;
  image?: File;
};

type ValidationObj = {
  nameErr: string;
  emailErr: string;
  phoneErr: string;
  imageErr: string;
};

export const isFormValid = async ({ name, email, phone, image }: Data): Promise<ValidationObj> => {
  const isValidFields: ValidationObj = {
    nameErr: "",
    emailErr: "",
    phoneErr: "",
    imageErr: "",
  };

  if (!name) {
    isValidFields.nameErr = "Field should not be empty";
  }
  if (!email) {
    isValidFields.emailErr = "Field should not be empty";
  }
  if (!phone) {
    isValidFields.phoneErr = "Field should not be empty";
  }
  if (!image) {
    isValidFields.imageErr = "Image is required";
  }

  if (name) {
    if (name.length < 2) {
      console.log("!");
      isValidFields.nameErr = "Too short username";
    } else if (name.length > 60) {
      isValidFields.nameErr = "Too large username";
    }
  }

  if (email && !EMAIL_REGEX.test(email)) {
    isValidFields.emailErr = "Invalid Email";
  }

  if (phone && !PHONE_REGEX.test(phone)) {
    isValidFields.phoneErr = "Invalid phone number";
  }

  if (image) {
    if (image.size > 5000000) {
      isValidFields.imageErr = "Image size must be < 5 MB";
    } else {
      const imgValidation = await validateImgSize(image);
      if (imgValidation) {
        isValidFields.imageErr = imgValidation as string;
      }
    }
  }

  return isValidFields;
};

function validateImgSize(image: File) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      let img = new Image();
      img.src = e.target?.result as string;
      img.onload = function () {
        console.log(img.height);
        if (img.height < 70 || img.width < 70) {
          console.log("!");
          resolve("Image is too little!");
        }
        resolve("");
      };
    };
  });
}
