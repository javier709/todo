import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType() /* sirve para crear u nuevo objeto por el que graphQl sabe cuales van a aser sus campos y atributos */
export class Todo {

    @Field( () => Int )
    id: number;

    @Field( () => String )
    description: string;

    @Field( () => Boolean )
    done: boolean = false;
}