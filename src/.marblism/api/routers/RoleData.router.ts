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

        create: procedure.input($Schema.RoleDataInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).roleData.create(input as any))),

        delete: procedure.input($Schema.RoleDataInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).roleData.delete(input as any))),

        findFirst: procedure.input($Schema.RoleDataInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).roleData.findFirst(input as any))),

        findMany: procedure.input($Schema.RoleDataInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).roleData.findMany(input as any))),

        findUnique: procedure.input($Schema.RoleDataInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).roleData.findUnique(input as any))),

        update: procedure.input($Schema.RoleDataInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).roleData.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    create: {

        useMutation: <T extends Prisma.RoleDataCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RoleDataCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.RoleDataGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.RoleDataGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RoleDataCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RoleDataCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.RoleDataGetPayload<T>, Context>) => Promise<Prisma.RoleDataGetPayload<T>>
            };

    };
    delete: {

        useMutation: <T extends Prisma.RoleDataDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RoleDataDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.RoleDataGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.RoleDataGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RoleDataDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RoleDataDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.RoleDataGetPayload<T>, Context>) => Promise<Prisma.RoleDataGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.RoleDataFindFirstArgs, TData = Prisma.RoleDataGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.RoleDataFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.RoleDataGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.RoleDataFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.RoleDataFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.RoleDataGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.RoleDataGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.RoleDataFindManyArgs, TData = Array<Prisma.RoleDataGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.RoleDataFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.RoleDataGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.RoleDataFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.RoleDataFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.RoleDataGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.RoleDataGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.RoleDataFindUniqueArgs, TData = Prisma.RoleDataGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.RoleDataFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.RoleDataGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.RoleDataFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.RoleDataFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.RoleDataGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.RoleDataGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    update: {

        useMutation: <T extends Prisma.RoleDataUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RoleDataUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.RoleDataGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.RoleDataGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RoleDataUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RoleDataUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.RoleDataGetPayload<T>, Context>) => Promise<Prisma.RoleDataGetPayload<T>>
            };

    };
}
