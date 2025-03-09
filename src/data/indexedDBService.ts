import { openDatabase, STATUS_STORE, TASK_STORE } from '@/data/dbConfig';
import { IStatusList, ITask } from 'types/types';

// status
export async function createStatus(title: string): Promise<number> {
  const db = await openDatabase();
  const transaction = db.transaction([STATUS_STORE], 'readwrite');
  const store = transaction.objectStore(STATUS_STORE);
  const request = store.add({ title, taskCount: 0 });

  return new Promise((resolve, reject) => {
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const newId = request.result as number;

      transaction.oncomplete = () => {
        resolve(newId);
      };

      transaction.onerror = () => {
        reject(new Error('트랜잭션 실패'));
      };
    };
  });
}

export async function getStatus(statusId: number): Promise<IStatusList | undefined> {
  const db = await openDatabase();
  const transaction = db.transaction([STATUS_STORE], 'readonly');
  const store = transaction.objectStore(STATUS_STORE);
  const request = store.get(statusId);
  return new Promise((resolve, reject) => {
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function getAllStatuses(): Promise<IStatusList[]> {
  const db = await openDatabase();
  const transaction = db.transaction([STATUS_STORE], 'readonly');
  const store = transaction.objectStore(STATUS_STORE);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result as IStatusList[]);
  });
}

export async function updateStatus(statusId: number, newTitle: string): Promise<void> {
  const db = await openDatabase();
  const transaction = db.transaction([STATUS_STORE], 'readwrite');
  const store = transaction.objectStore(STATUS_STORE);
  // 데이터를 가져오고 수정하는 방식
  const request = store.get(statusId);
  return new Promise((resolve, reject) => {
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const statusList = request.result as IStatusList;
      if (!statusList) {
        return reject(new Error('Status를 찾을 수 없음'));
      }
      statusList.title = newTitle;
      const updateRequest = store.put(statusList);
      updateRequest.onerror = () => reject(updateRequest.error);
      updateRequest.onsuccess = () => resolve();
    };
  });
}

export async function deleteStatus(statusId: number): Promise<void> {
  const db = await openDatabase();
  const transaction = db.transaction([STATUS_STORE], 'readwrite');
  const store = transaction.objectStore(STATUS_STORE);

  const request = store.delete(statusId);
  return new Promise((resolve, reject) => {
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

// task
export async function createTask(task: Omit<ITask, 'id'>): Promise<number> {
  const db = await openDatabase();
  const transaction = db.transaction([TASK_STORE], 'readwrite');
  const store = transaction.objectStore(TASK_STORE);
  const request = store.add(task);

  return new Promise((resolve, reject) => {
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result as number);
  });
}


export async function getTasks(taskId: number): Promise<ITask | undefined> {
  const db = await openDatabase();
  const transaction = db.transaction([TASK_STORE], 'readonly');
  const store = transaction.objectStore(TASK_STORE);
  const request = store.get(taskId);
  return new Promise((resolve, reject) => {
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function getTasksByStatus(statusId: number): Promise<ITask[]> {
  const db = await openDatabase();
  const transaction = db.transaction([TASK_STORE], 'readonly');
  const store = transaction.objectStore(TASK_STORE);
  // statusId 인덱스로 검색
  const index = store.index('statusId');
  const request = index.getAll(statusId);

  return new Promise((resolve, reject) => {
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      resolve(request.result as ITask[]);
    };
  });
}

export async function updateTask(taskId: number, updatedFields: Partial<ITask>): Promise<void> {
  const db = await openDatabase();
  const transaction = db.transaction([TASK_STORE], 'readwrite');
  const store = transaction.objectStore(TASK_STORE);

  const getReq = store.get(taskId);
  return new Promise((resolve, reject) => {
    getReq.onerror = () => reject(getReq.error);
    getReq.onsuccess = () => {
      const existing = getReq.result as ITask;
      if (!existing) {
        return reject(new Error('Task not found'));
      }
      const updatedTask = { ...existing, ...updatedFields };
      const updateReq = store.put(updatedTask);
      updateReq.onerror = () => reject(updateReq.error);
      updateReq.onsuccess = () => resolve();
    };
  });
}

export async function deleteTask(taskId: number): Promise<void> {
  const db = await openDatabase();
  const transaction = db.transaction([TASK_STORE], 'readwrite');
  const store = transaction.objectStore(TASK_STORE);

  const request = store.delete(taskId);
  return new Promise((resolve, reject) => {
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}
