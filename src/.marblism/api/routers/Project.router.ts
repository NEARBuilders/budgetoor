/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        create: procedure.input($Schema.ProjectInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).project.create(input as any))),

        delete: procedure.input($Schema.ProjectInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).project.delete(input as any))),

        findFirst: procedure.input($Schema.ProjectInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).project.findFirst(input as any))),

        findMany: procedure.input($Schema.ProjectInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).project.findMany(input as any))),

        findUnique: procedure.input($Schema.ProjectInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).project.findUnique(input as any))),

        update: procedure.input($Schema.ProjectInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).project.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    create: {

        useMutation: <T extends Prisma.ProjectCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ProjectCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ProjectGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ProjectGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ProjectCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ProjectCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ProjectGetPayload<T>, Context>) => Promise<Prisma.ProjectGetPayload<T>>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ProjectDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ProjectDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ProjectGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ProjectGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ProjectDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ProjectDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ProjectGetPayload<T>, Context>) => Promise<Prisma.ProjectGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ProjectFindFirstArgs, TData = Prisma.ProjectGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ProjectFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ProjectGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ProjectFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ProjectFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ProjectGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ProjectGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ProjectFindManyArgs, TData = Array<Prisma.ProjectGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.ProjectFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ProjectGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ProjectFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ProjectFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ProjectGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ProjectGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ProjectFindUniqueArgs, TData = Prisma.ProjectGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ProjectFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ProjectGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ProjectFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ProjectFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ProjectGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ProjectGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    update: {

        useMutation: <T extends Prisma.ProjectUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ProjectUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ProjectGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ProjectGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ProjectUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ProjectUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ProjectGetPayload<T>, Context>) => Promise<Prisma.ProjectGetPayload<T>>
            };

    };
}
