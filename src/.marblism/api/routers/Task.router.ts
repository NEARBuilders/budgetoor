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

        create: procedure.input($Schema.TaskInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).task.create(input as any))),

        delete: procedure.input($Schema.TaskInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).task.delete(input as any))),

        findFirst: procedure.input($Schema.TaskInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).task.findFirst(input as any))),

        findMany: procedure.input($Schema.TaskInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).task.findMany(input as any))),

        findUnique: procedure.input($Schema.TaskInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).task.findUnique(input as any))),

        update: procedure.input($Schema.TaskInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).task.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    create: {

        useMutation: <T extends Prisma.TaskCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TaskCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TaskGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TaskGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TaskCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TaskCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TaskGetPayload<T>, Context>) => Promise<Prisma.TaskGetPayload<T>>
            };

    };
    delete: {

        useMutation: <T extends Prisma.TaskDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TaskDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TaskGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TaskGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TaskDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TaskDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TaskGetPayload<T>, Context>) => Promise<Prisma.TaskGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.TaskFindFirstArgs, TData = Prisma.TaskGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.TaskFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TaskGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TaskFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TaskFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TaskGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TaskGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.TaskFindManyArgs, TData = Array<Prisma.TaskGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.TaskFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.TaskGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TaskFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TaskFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.TaskGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.TaskGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.TaskFindUniqueArgs, TData = Prisma.TaskGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.TaskFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TaskGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TaskFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TaskFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TaskGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TaskGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    update: {

        useMutation: <T extends Prisma.TaskUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TaskUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TaskGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TaskGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TaskUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TaskUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TaskGetPayload<T>, Context>) => Promise<Prisma.TaskGetPayload<T>>
            };

    };
}
