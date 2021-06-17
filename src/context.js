import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('j');
  const [cocktails, setCocktails] = useState([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
   try{
    const response = await fetch(`${url}${searchTerm}`);
    const data = await response.json();
    const {drinks} = data;
    if(drinks){
    const newCocktails = drinks.map((item) => {
      const {idDrink, strAlcoholic,strDrink,strDrinkThumb,strCategory,strGlass} = item;
      return{
       id: idDrink,
       name:strDrink,
       img: strDrinkThumb,
       info: strAlcoholic,
       glass: strGlass,
      }
    })
    setCocktails(newCocktails)
    }else{
      setCocktails([])
    }
    setLoading(false)
   }catch(err){
     console.log(err);
     setLoading(false)
   }
  },[searchTerm])
  useEffect(()=>{
     fetchData()
  },[searchTerm,fetchData])

  return <AppContext.Provider value={{loading,cocktails,setSearchTerm}}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
