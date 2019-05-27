// 前导 0 月 日 时 分 秒  的
function appendZero(obj) {
  if (obj < 10){
    return "0" +""+obj
  }else {
    return obj
  }
}

// 默认格式
function formatDateTime(time){
  let currrentTime = new Date(time);
  return (currrentTime.getFullYear() + '-' + appendZero(currrentTime.getMonth() + 1) + '-' + appendZero(currrentTime.getDate())+" "+appendZero(currrentTime.getHours())+":"+appendZero(currrentTime.getMinutes())+":"+appendZero(currrentTime.getSeconds()))
}

function formatDate(){
  let currrentTime = new Date();
  return (currrentTime.getFullYear() + '-' + appendZero(currrentTime.getMonth() + 1) + '-' + appendZero(currrentTime.getDate()))
}


export {formatDateTime,formatDate}
