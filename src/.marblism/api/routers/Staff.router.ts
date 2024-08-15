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

        create: procedure.input($Schema.StaffInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).staff.create(input as any))),

        delete: procedure.input($Schema.StaffInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).staff.delete(input as any))),

        findFirst: procedure.input($Schema.StaffInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).staff.findFirst(input as any))),

        findMany: procedure.input($Schema.StaffInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).staff.findMany(input as any))),

        findUnique: procedure.input($Schema.StaffInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).staff.findUnique(input as any))),

        update: procedure.input($Schema.StaffInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).staff.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    create: {

        useMutation: <T extends Prisma.StaffCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.StaffCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.StaffGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.StaffGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.StaffCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.StaffCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.StaffGetPayload<T>, Context>) => Promise<Prisma.StaffGetPayload<T>>
            };

    };
    delete: {

        useMutation: <T extends Prisma.StaffDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.StaffDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.StaffGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.StaffGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.StaffDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.StaffDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.StaffGetPayload<T>, Context>) => Promise<Prisma.StaffGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.StaffFindFirstArgs, TData = Prisma.StaffGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.StaffFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.StaffGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.StaffFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.StaffFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.StaffGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.StaffGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.StaffFindManyArgs, TData = Array<Prisma.StaffGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.StaffFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.StaffGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.StaffFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.StaffFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.StaffGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.StaffGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.StaffFindUniqueArgs, TData = Prisma.StaffGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.StaffFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.StaffGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.StaffFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.StaffFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.StaffGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.StaffGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    update: {

        useMutation: <T extends Prisma.StaffUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.StaffUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.StaffGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.StaffGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.StaffUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.StaffUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.StaffGetPayload<T>, Context>) => Promise<Prisma.StaffGetPayload<T>>
            };

    };
}
