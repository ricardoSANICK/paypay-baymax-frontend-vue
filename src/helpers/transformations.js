const ResponseToUserStore = user=>{
  const {groups, avatar, fullName, fechaVencimiento:expirationDate, lastpasswordchange:lastPasswordChange, diasvencimiento:expirationDays, username} = user;
  
  return {
    groups
    , avatar
    , fullName
    , expirationDate
    , lastPasswordChange
    , expirationDays
    , username
  }
}
  
export default { ResponseToUserStore }