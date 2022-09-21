import { array } from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaPencilAlt , FaRegTrashAlt } from "react-icons/fa";

import './style.css';

const ListaDeUsuario = () => {
  var [ list, setList ] = useState( [] );

   useEffect( () => {
     axios.get('https://testeapigabriel.herokuapp.com/user/all').then(result => {
      const { data: { data: { rows }} } = result;

      setList(rows)
     } )
   }, []);  



   const deletePost = (id, e) => {
    e.preventDefault();
    axios.delete(`https://testeapigabriel.herokuapp.com/user/${id}`).then
    (res => {
  console.log('Delete!!!' , res)
  }).catch(err => console.log(err))


      setList(list.filter(list => id !== id))
  }
 
  return(
  <div>
    <body>
      <div className="container">
    <h1 className="Logo">Usuarios</h1>
      <Link to={'/cadastro'} className="linkPages">
        Adicionar novo 
      </Link>
      </div>
      </body>

    <div className="Box">
      <ul className='ListaUsuarios'>
      <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Açao</th>
            </tr>
          </thead>
          <tbody>
          {
          list.map( ({ firstName , lastName, email, phone, id }) => {
          return <tr key={array}>
           <td>{firstName} {lastName}</td>
           <td>{email}</td>
           <td>{phone}</td>
           <td><Link to={{pathname: `/edit/${id}`}} className="icons"><FaPencilAlt/></Link> 
             <button onClick={(e) => deletePost(id, e)} className="iconDelet"> <FaRegTrashAlt/>
               </button>
           </td>
           </tr>
           })}
          </tbody>
        </table>
      </ul>    
      </div>
  </div>
  )
}



 
export default ListaDeUsuario;
