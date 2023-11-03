let [a,b,c] = [ true ?1:2,false?3:4,true?8:9]
console.log([a,b,c])

function e(){
    return `eee ${b}`
}
console.log(e())

let now = new Date()
  let month = now.getMonth() + 1;
  let day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()
  console.log(day)