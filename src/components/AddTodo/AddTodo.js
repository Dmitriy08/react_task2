import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import React from "react";
import {addTodo} from "../../actions";
import {useDispatch} from "react-redux";

export default function AddTodo({newTodoName, setNewTodo}){
    const dispatch = useDispatch();
    const addTodoHandler = (e) => {
        e.preventDefault();
        dispatch(addTodo(newTodoName))
        setNewTodo('');
    }
    return (
        <>
            <Form onSubmit={addTodoHandler}>
                <FormGroup>
                    <Label for='addInput'>New Todo Item: </Label>
                    <Input
                        id='addInput'
                        type='text'
                        className='form-control'
                        placeholder='New todo name'
                        value={newTodoName}
                        onChange={(e)=>setNewTodo(e.target.value)}
                    />
                </FormGroup>
                <Button type='submit' color="success" className='pull-right'>
                    Add New Item
                </Button>
            </Form>
        </>
    )
}