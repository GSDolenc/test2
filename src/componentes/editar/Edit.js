import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import './style.css';

const validationUser = yup.object().shape({
    firstName: yup.string().required("coloque sei nome ;)"),
    lastName: yup.string().required("coloque seu sobrenome"),
    email: yup.string().required("coloque um email valido com @"),
    phone: yup.string().required("coloque um telefone no farmato (xx) xxxxx-xxxx").min(15, "farmato (xx) xxxxx-xxxx"),
    password: yup.string().required("senha com no minimo 8 caracteres").min(8, "senha com no minimo 8 caracteres")
})

const initialValue = {
   type: 'SPECIALIST',
   

}


const EditCom = ({ }) => {

    const { id } = useParams();

    const{register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationUser)
    })

    const [isLoading, setIsloading] = useState(false);

    const [values, setValues] = useState ({initialValue});
    const history = useNavigate();

    //function onChange(ev) {
  //      const {name, value} = ev.target;
   //     setValues({ ...values, [name]: value });
    //}

    useEffect( () => {
        axios.get(`https://testeapigabriel.herokuapp.com/user/${id}`).then(result => {
         const { data: { data: { rows }} } = result;
         reset(rows)
   
   
       
        } )
      }, []);  

    const onSubmit = data => 
    axios.put(`https://testeapigabriel.herokuapp.com/user/${id}`, data).then(() => {
               history('/')
           })
            .catch(error => {
           console.log(error);
           }).finally(() => {
              setIsloading(false);
            });
            

    //function onSubmit(ev) {
    //  ev.preventDefault();
     //   setIsloading(true);
//
      //  axios.put(`https://testeapigabriel.herokuapp.com/user/${id}`, values)
     //   .then(() => {
    //        history('/')
     //   })
       // .catch(error => {
    //    console.log(error);
   //     }).finally(() => {
    // //       setIsloading(false);
      //  });
 // }
 

    
    return (
    <div className="main">
           <h2 className="Titulo">Editar Usuario</h2>
        <div className="box">
              <form onSubmit={handleSubmit(onSubmit)}>
            <div className="info">
                <label htmlFor="name">FistName</label>
                <input type="text" name="firstName" {...register("firstName")} />
                <p className="error-massage">{errors.firstName?.message}</p>
            </div>
            <div className="info">
                <label htmlFor="name">LastName</label>
                <input type="text" name="lastName" {...register("lastName")} />
                <p className="error-massage">{errors.lastName?.message}</p>
            </div>
            <div className="info">
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" {...register("email")} />
                <p className="error-massage">{errors.email?.message}</p>
            </div>
            <div className="info">
                <label htmlFor="telefone">Telefone</label>
                <input type="text" name="phone" {...register("phone")} />
                <p className="error-massage">{errors.phone?.message}</p>
            </div>
            <div className="info">
                <label htmlFor="senha">Senha</label>
                <input type="password" name="password" {...register("password")} />
                <p className="error-massage">{errors.password?.message}</p>
            </div>
            <div className="button2">
              <button type="submit">{isLoading ? 'Carregando' : 'Cadastrar'}</button>
            </div>
            
            </form>
            
        </div>
        
    </div>
   )
  
};


export default EditCom