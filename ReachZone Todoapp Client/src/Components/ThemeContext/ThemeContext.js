import React, {useState} from 'react'
export const ThemeContextProvider = React.createContext()
const ThemeContext = function(props){
 const [theme, setTheme] = useState('light')
 const [toggle, setToggle] = useState(false)
  const changeTheme= function(){
    (toggle===true ? setToggle(false): setToggle(true))
    if(toggle===true){
        setTheme('light')
    }
    else{
        setTheme('dark')
    }

  }

return (
    <ThemeContextProvider.Provider value={{ theme, changeTheme}}>
        {props.children}
    </ThemeContextProvider.Provider>
)
}

export default ThemeContext