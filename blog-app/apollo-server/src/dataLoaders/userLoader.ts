import { User } from "@prisma/client";
import DataLoader from "dataloader";
import { prisma } from "..";

const batchUsers = async (ids: number[]): Promise<User[]> => {
  // ids: []
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  /**
   {
    1: {id: 1, name: sabbir}
    2: {id: 2, name: sabbir}
    3: {id: 3, name: sabbir}
    4: {id: 4, name: sabbir}
    5: {id: 5, name: sabbir}
   }
   */
  const userData: { [key: string]: User } = {};
  users.forEach((user) => {
    userData[user.id] = user;
  });
  return ids.map((id) => userData[id]);
};

//@ts-ignore
export const userLoader = new DataLoader<number, User>(batchUsers);
