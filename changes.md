# REST to GraphQL transition

- install the dependencies

```bash
> yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```

- remove the controllers
- add types
- add resolvers

## project settings

- add the following dependency in app.module.ts

```typescript
// adding dependency for GraphQL
GraphQLModule.forRoot({
  driver: ApolloDriver,
  autoSchemaFile: true,
});
```

## Users

- remove UserController
- add User Type

```typescript
@ObjectType('User')
export class UserType {
  @Field((type) => ID)
  id: number;

  @Field()
  username: string;
}
```

- add the resolver

```typescript
@Resolver((of) => UserType)
export class UserResolver {
  /// methods to expose the graphql APIs
}
```

## Tasks
