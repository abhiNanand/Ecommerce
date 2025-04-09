
import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Address } from  "../../Services/Address/Address";

const initalState:Address= {
    name: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    town: '',
    phoneNumber: '',
    emailAddress: '',
};

const addressSlice=({
    name:"storeAddress",
    initalState,
    reducers:{
        updateAddress:(state,PayloadAction<>)=>{

        },
    },
    

});

//name:  ;compnayName;streetAddress;apartment;TowerControl;updatePhoneNumber;emailAddress>

//