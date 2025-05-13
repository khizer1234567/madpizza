import { openDB } from 'idb';

export const initDB = async () => {
  return await openDB('POS_DB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('orders')) {
        db.createObjectStore('orders', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const saveOrder = async (order) => {
  const db = await initDB();
  await db.add('orders', order);
};

export const getOrders = async () => {
  const db = await initDB();
  return await db.getAll('orders');
};
