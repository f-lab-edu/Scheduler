import { createConfirmDialog } from '@/components/common/modal/ModalTemplates';
import { openDatabase, STATUS_STORE, TASK_STORE } from '@/data/dbConfig';
import { IStatusList, ITask } from 'types/types';

// status
export async function createStatus(statusTitle: string): Promise<number> {
  const db = await openDatabase();
  const transaction = db.transaction([STATUS_STORE], 'readwrite');
  const store = transaction.objectStore(STATUS_STORE);
  const index = store.index('statusTitle');

  return new Promise((resolve, reject) => {
    const checkRequest = index.get(statusTitle);

    checkRequest.onerror = () => reject(new Error(checkRequest.error?.message || 'IndexedDB error'));
    checkRequest.onsuccess = () => {
      if (checkRequest.result) {
        const message = '동일한 리스트명이 존재합니다.';
        const confirmButtonText = '확인';
        const confirmHandler = () => {
          document.body.removeChild($confirmDialog);
          reject(new Error('제목 중복'));
        };

        const $confirmDialog = createConfirmDialog(message, confirmButtonText, confirmHandler);
        document.body.appendChild($confirmDialog);
        return;
      }
      const addRequest = store.add({ statusTitle, taskCount: 0 });
      addRequest.onerror = () => reject(new Error(addRequest.error?.message || 'IndexedDB error'));
      addRequest.onsuccess = () => resolve(addRequest.result as number);
    };
  });
}

export async function getStatus(statusId: number): Promise<IStatusList | undefined> {
  const db = await openDatabase();
  const transaction = db.transaction([STATUS_STORE], 'readonly');
  const store = transaction.objectStore(STATUS_STORE);
  const request = store.get(statusId);
  return new Promise((resolve, reject) => {
    request.onerror = () => reject(new Error(request.error?.message || 'IndexedDB error'));
    request.onsuccess = () => resolve(request.result);
  });
}

export async function getAllStatuses(): Promise<IStatusList[]> {
  const db = await openDatabase();
  const transaction = db.transaction([STATUS_STORE], 'readonly');
  const store = transaction.objectStore(STATUS_STORE);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onerror = () => reject(new Error(request.error?.message || 'IndexedDB error'));
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
    request.onerror = () => reject(new Error(request.error?.message || 'IndexedDB error'));
    request.onsuccess = () => {
      const statusList = request.result as IStatusList;
      if (!statusList) {
        return reject(new Error('Status를 찾을 수 없음'));
      }
      statusList.statusTitle = newTitle;
      const updateRequest = store.put(statusList);
      updateRequest.onerror = () => reject(new Error(updateRequest.error?.message || 'IndexedDB error'));
      updateRequest.onsuccess = () => resolve();
    };
  });
}

export async function deleteStatus(statusId: number): Promise<void> {
  const db = await openDatabase();
  const transaction = db.transaction([STATUS_STORE, TASK_STORE], 'readwrite');
  const statusStore = transaction.objectStore(STATUS_STORE);
  const taskStore = transaction.objectStore(TASK_STORE); //status 삭제되면 종속 task 삭제 위해

  return new Promise((resolve, reject) => {
    const deleteStatusReq = statusStore.delete(statusId);

    deleteStatusReq.onerror = () => reject(new Error(deleteStatusReq.error?.message || 'IndexedDB error'));
    deleteStatusReq.onsuccess = () => {
      // statusId에 종속된 Task 모두 삭제
      const index = taskStore.index('statusId');
      const cursorReq = index.openCursor(String(statusId));

      cursorReq.onerror = () => reject(new Error(cursorReq.error?.message || 'IndexedDB error'));
      cursorReq.onsuccess = (e) => {
        const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          const deleteTaskReq = cursor.delete();
          deleteTaskReq.onerror = () => reject(new Error(deleteTaskReq.error?.message || 'IndexedDB error'));
          deleteTaskReq.onsuccess = () => cursor.continue();
        } else {
          resolve();
        }
      };
    };
  });
}

// task
export async function createTask(task: ITask): Promise<number> {
  const db = await openDatabase();
  const transaction = db.transaction([TASK_STORE], 'readwrite');
  const store = transaction.objectStore(TASK_STORE);
  const request = store.add(task);

  return new Promise((resolve, reject) => {
    request.onerror = () => reject(new Error(request.error?.message || 'IndexedDB error'));
    request.onsuccess = () => resolve(request.result as number);
  });
}


export async function getTasks(taskId: number): Promise<ITask | undefined> {
  const db = await openDatabase();
  const transaction = db.transaction([TASK_STORE], 'readonly');
  const store = transaction.objectStore(TASK_STORE);
  const request = store.get(taskId);
  return new Promise((resolve, reject) => {
    request.onerror = () => reject(new Error(request.error?.message || 'IndexedDB error'));
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
    request.onerror = () => reject(new Error(request.error?.message || 'IndexedDB error'));
    request.onsuccess = () => {
      resolve(request.result as ITask[]);
    };
  });
}
export async function getTasksByMonth(month: string): Promise<ITask[]> {
  const db = await openDatabase();
  const transaction = db.transaction([TASK_STORE], 'readonly');
  const store = transaction.objectStore(TASK_STORE);

  const index = store.index('months');
  const request = index.getAll(month);

  return new Promise((resolve, reject) => {
    request.onerror = () => reject(new Error(request.error?.message || 'IndexedDB error'));
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
    getReq.onerror = () => reject(new Error(getReq.error?.message || 'IndexedDB error'));
    getReq.onsuccess = () => {
      const existing = getReq.result as ITask;
      if (!existing) {
        return reject(new Error('Task not found'));
      }
      const updatedTask = { ...existing, ...updatedFields };
      const updateReq = store.put(updatedTask);
      updateReq.onerror = () => reject(new Error(updateReq.error?.message || 'IndexedDB error'));
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
    request.onerror = () => reject(new Error(request.error?.message || 'IndexedDB error'));
    request.onsuccess = () => resolve();
  });
}
