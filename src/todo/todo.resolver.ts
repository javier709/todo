import { Args, Int, Query, Resolver, Mutation } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';

@Resolver( () => Todo ) /* Le decimos al resolver que va a estar trabajando con un objeto Todo */
export class TodoResolver {

    constructor (
        private readonly todoService: TodoService

    ) {}

    @Query( () => [Todo], { name: 'todos' } )
    findAll(): Todo[] {
        return this.todoService.findAll();
    }

    @Query( () => Todo, { name: 'todo' } )
    findOne( @Args('id', { type: () => Int } ) id:number) {
        return this.todoService.findOne ( id );
    }

    @Mutation( ()=> Todo, { name: 'createTodo' }  )
    createTodo(
        @Args('createTodoInput') createTodoInput: CreateTodoInput
    )   {
        return this.todoService.create( createTodoInput );
    }

    @Mutation( ()=> Todo, { name: 'updateTodo' }  )
    updateTodo( @Args('updateTodoInput') updateTodoInput: UpdateTodoInput )    /* Args: el nombre por el cual el front va a enviar los parámetros */
        {
            return this.todoService.update(updateTodoInput)
    
    }

    @Mutation( () => Boolean )
    removeTodo(
        @Args('id', { type: () => Int }) id: number
    ) {
        return this.todoService.delete( id );
    }



}
