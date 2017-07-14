import Login from './model'
// import validateSignup from "./validateSignup"



export default function validateSignup(data){
  let errors = {}
  if(data.title === "") errors.title = "Please Provide a Title"
  if(data.email === "") errors.email = "Please Provide a Email"
  if(data.password === "") errors.password = "Please Provide a Password"
  if(data.passwordConfirmation != data.password) errors.passwordConfirmation = "Password Confirmation Must match Password"
  if(data.image === "") errors.image = "Please Provide an Image URL"
  if(data.location === "") errors.location = "Please Provide some location for your post"
  const isValid = Object.keys(errors).length === 0
  return {errors, isValid};
}


export const login = async (req, res)=>{
  console.log(req.body);
  // const{errors, isValid} = validateLogin(req.body)
  const{email, password} = req.body
  if(true){
    try {
      return res.status(200).json({user: await Login.findOne({'email': req.email})})
    }
    catch(err){
      return res.status(err.status).json({error: true, message:"User doesn't exist"})
    }
  }

}
