import {Input} from "reactstrap";
import React from "react";

export default function SearchTodos({searchKey, setSearchKey}){

    return(
        <>
            <Input
                id='addInput'
                type='text'
                className='form-control'
                placeholder='Search todos'
                value={searchKey}
                onChange={(e)=>setSearchKey(e.target.value)}
            />
        </>
    )
}