/* Input field common component */

function Input(props) {
  const handleChange = (e) => {
    props.setUserData({ ...props.userData, [e.target.name]: e.target.value })
  }
  return (
    <input value={props.userData[props.name]} name={props.name} className={props.className} type={props.type} placeholder={props.placeholder} onChange={(e) => handleChange(e)} />
  )
}

export default Input