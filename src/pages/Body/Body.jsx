import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { About } from "../About/About";
import { Register } from "../Register/Register";
import { Profile } from "../Profile/Profile";
import { Admin } from "../Admin/Admin";
import { Editions } from "../Editions/Editions";
import { ProfileEdit } from "../ProfileEdit/ProfileEdit";
import { Characters } from "../Characters/Characters";
import { CharactersDetail } from "../CharactersDetail/CharactersDetail";

export const Body = () => {

    return (

        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/editions" element ={<Editions />} />
                <Route path="/profileedit" element ={<ProfileEdit />} />
                <Route path="/characters" element ={<Characters />} />
                <Route path="/characterdetail" element ={<CharactersDetail />} />
            </Routes>
        </>


    ) 
} 