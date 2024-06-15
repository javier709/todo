import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { StatusArgs } from './dto/args/status.args';
import { todo } from 'node:test';

@Injectable()
export class TodoService {

    private todos: Todo[] = [

        { id: 1, description: 'Piedra del Alma'   , done: false },
        { id: 2, description: 'Piedra del Espacio', done: true },
        { id: 3, description: 'Piedra del Poder'  , done: false },
        { id: 4, description: 'Piedra del Tiempo' , done: false },
    ];

    get totalTodos() {
        return this.todos.length; // Retorna el numero de todos que tengo en el arreglo
    }

    get pendingTodos() {
        return this.todos.filter( todo => todo.done === false ).length; // Retorna el numero de todos que tengo en el arreglo
    }

    get completedTodos() {
        return this.todos.filter( todo => todo.done === true ).length; // Retorna el numero de todos que tengo en el arreglo
    }



    findAll( statusArgs: StatusArgs ): Todo[] {

        const { status } = statusArgs;
        if( status !== undefined ) return this.todos.filter( todo => todo.done === status );
        
        
        return this.todos;
    
    }

    findOne( id: number  ): Todo {

        const todo =  this.todos.find( todo => todo.id === id )

        if ( !todo ) throw new NotFoundException(`Todo with id ${ id } not found`);

        return todo;
    
    }

    create( createTodoInput: CreateTodoInput ): Todo {

        const todo = new Todo();
        todo.description = createTodoInput.description;
        todo.id = Math.max( ...this.todos.map( todo=> todo.id ), 0 ) + 1
        
        this.todos.push( todo );

        return todo;

    }

    update( updateTodoInput: UpdateTodoInput ) {
        const { id, description, done } = updateTodoInput;
        const todoToUpdate = this.findOne( id )

        if ( description ) todoToUpdate.description = description;
        if ( done !== undefined ) todoToUpdate.done = done;

        this.todos = this.todos.map( todo => {
            return ( todo.id === id ) ? todoToUpdate : todo;
        });

        return todoToUpdate;

    }

    delete( id:number ): Boolean {
        const todo = this.findOne( id );

        this.todos = this.todos.filter( todo => todo.id !== id )

        return true;
    }


}
