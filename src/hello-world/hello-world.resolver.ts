import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

/* 
    Los resolvers son practicamente PROVIDERS, son similares a los controllers de un REST endpoint con NEST
    Los resolvers proveen las instrucciones para transformar las instrucciones provenientes
    del cliente en date que GraphQL puede utilizar.

*/

@Resolver()
export class HelloWorldResolver {


    @Query( () => String, { description: 'Hola mundo es lo que retorna', name: 'helloWorld' } ) // necesito indicar a GraphQL que va a regresar este metodo, description me permite documentar que es lo que retorna este metodo
    helloWorld(): string {
        return 'Hola Mundo';
    }

    @Query( () => Float, {name: 'randomNumber'  } )
    getRandomNumber(): number {
        return Math.random() * 100;
    }


    // Query con arguments
    /* Si quiero que me tome un valor por defecto, en este caso el numero 6, tengo que decirle que sea nullable: true, y especificar el valor por defecto, sino siempre va a esperar que en la consulta venga un valor INT */
    /* Para que no surjan errores de tipo, tengo que especificar el type de valor que espera recibir, en este caso el metodo trabaja con number, el type puede ser float, int, etc.. Pero debo especificarlo */
    @Query( () => Int,  { name: 'randomFromZeroTo', description: 'From zero to argument TO (default 6)' })
    getRandomFromZeroTo( @Args('to', { nullable: true, type: () => Int } ) to: number = 6 +1 ): number {
        return Math.floor( Math.random() * to );
    }

}
