import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GQLAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    // create a new GraphQL context using the default context
    const ctx = GqlExecutionContext.create(context);

    // return the GraphQL context request
    return ctx.getContext().req;
  }
}
