import React from 'react';


export function ValidateEmail(email) {
    var mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
    if (!email.match(mailformat)) {
        return false;
    }
    return true
}
export const settingUpAuth = (OBJ) => {
    
    debugger
    const { _id, age, email, gender, contactNo, fullName, } = OBJ.data.data.user;
    data = {
        auth: true,
        token: OBJ.data.token,
        id: _id, age, email, gender, contactNo, fullName
    }
    return data
}