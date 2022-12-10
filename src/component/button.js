import '../css/button.css';

function button({color, text, height, width, fontSize}) {

  const buttonStyle = {
    backgroundColor: color ? color : "#EBC4BE",
    color: "white",
    fontSize: height ? parseInt(height)*0.4 : "12px",
    lineHeight: height ? height : "30px",
    textAlign: "center",
    height: height ? height : "30px", 
    width: width ? width : "100px", 
    borderRadius: height ? parseInt(height)/2 : "15px"
  }

  return (
    <div className="button-component" style={buttonStyle}>
      {text}
    </div>
  );
}

export default button;
