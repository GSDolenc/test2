import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import './style.css';

const validationUser = yup.object().shape({
    firstName: yup.string().required("coloque sei nome ;)"),
    lastName: yup.string().required("coloque seu sobrenome"),
    email: yup.string().required("coloque um email valido, exemplo email@gamil.com "),
    phone: yup.string().required("coloque um telefone no farmato (xx) xxxxx-xxxx").min(15, "farmato (xx) xxxxx-xxxx"),
    password: yup.string().required("senha com no minimo 8 caracteres").min(8, "senha com no minimo 8 caracteres")
})

const initialValue = {
   type: 'USER'
}

const CadastroCom = ({ }) => {

    const [isLoading, setIsloading] = useState(false);

    const{register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationUser)
    })

   // const [values, setValues] = useState ({initialValue});
    const history = useNavigate();

    //function onChange(ev) {
     //   const {name, value} = ev.target;
    //    setValues({ ...values, [name]: value });
    //}

    const onSubmit = data => 
    axios.post("https://testeapigabriel.herokuapp.com/user", data).then(() => {
               history('/')
           })
            .catch(error => {
           console.log(error);
           }).finally(() => {
              setIsloading(false);
          });
            



    return (
        <div className="main">
           <h2 className="Titulo">Cadastro</h2>
        <div className="box">
              <form onSubmit={handleSubmit(onSubmit)}>
            <div className="info">
                <label htmlFor="name">FistName</label>
                <input type="text" id="firstname" name="firstName" placeholder="primeiro nome" {...register("firstName")} />
                <p className="error-massage">{errors.firstName?.message}</p>
            </div>
            <div className="info">
                <label htmlFor="name">LastName</label>
                <input type="text" id="lastname" name="lastName" placeholder="sobrenome" {...register("lastName")} />
                <p className="error-massage">{errors.lastName?.message}</p>
            </div>
            <div className="info">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" name="email" placeholder="email@gamil.com" {...register("email")} />
                <p className="error-massage">{errors.email?.message}</p>
            </div>
            <div className="info">
                <label htmlFor="telefone">Telefone</label>
                <input type="text" id="phone" name="phone" placeholder="(xx) xxxxx-xxxx" {...register("phone")} />
                <p className="error-massage">{errors.phone?.message}</p>
            </div>
            <div className="info">
                <label htmlFor="senha">Senha</label>
                <input type="password" id="password" name="password" {...register("password")} />
                <p className="error-massage">{errors.password?.message}</p>
            </div>
            <div className="info">
                <label htmlFor="type">type</label>
                <input type="text" id="type" name="type" placeholder="USER" {...register("type")} />
                <p className="error-massage">{errors.password?.message}</p>
            </div>
            <div className="button2">
              <button type="submit">{isLoading ? 'Carregando' : 'Cadastrar'}</button>
            </div>
            </form>
        </div>
    </div>
        )

}

export default CadastroCom
