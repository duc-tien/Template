import productApi from "./productApi"

async function fetchProducts(add) {
    try {
      const res = await productApi.getAll(add);
  //    function handler(course) {
   //     return (course)
    //  }
  //    var arrayState = res.data.map(handler)
     return (res)
    } catch (error) {
      console.log(error)
    }
  }

  export default fetchProducts