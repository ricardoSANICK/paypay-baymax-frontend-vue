export default{
  errors:{
    network:{
      500:{
        type: "Server Error",
        desc: "(500) Server Erro"
      }
      , 504:{
        type: "Server Error",
        desc: "(504) Server Error"
      }
      , 503:{
        type: "Service Unavailable",
        desc: "Service temporarily unavailable"
      }
    }
  }

}