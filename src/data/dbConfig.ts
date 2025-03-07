export const DB_NAME = 'SchedulerDB';
export const DB_VERSION = 1;
export const STATUS_STORE = 'status';
export const TASK_STORE = 'tasks';

let dbInstance: IDBDatabase | null = null; //싱글톤 인스턴스 추가로 매 입력마다 openDatabase() 방지

// db열기, 업그레이드 이벤트 ~> 객체 저장소 생성
export function openDatabase(): Promise<IDBDatabase> {
  if (dbInstance) {
    return Promise.resolve(dbInstance); // 이미 열려 있으면 바로 반환
  }
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event: Event) => {
      const $target = event.target as IDBRequest;
      reject($target.error);
      console.error('Database error:', $target.error);
    };

    //IndexedDB의 버전이 변경될 때 실행
    request.onupgradeneeded = (event) => {
      const $target = event.target as IDBRequest<IDBDatabase>;
      const db = $target.result;
      // status 스토어 생성
      if (!db.objectStoreNames.contains(STATUS_STORE)) {
        const objectStore = db.createObjectStore(STATUS_STORE, {
          keyPath: 'id',
          autoIncrement: true,
        });
        objectStore.createIndex('title', 'title', { unique: false });
      }
      //task 스토어 생성
      if (!db.objectStoreNames.contains(TASK_STORE)) {
        const objectStore = db.createObjectStore(TASK_STORE, {
          keyPath: 'id',
          autoIncrement: true,
        });
        objectStore.createIndex('statusId', 'statusId', { unique: false });
      }
    };

    request.onsuccess = (event) => {
      const $target = event.target as IDBRequest<IDBDatabase>;
      dbInstance = $target.result;
      resolve($target.result);
    };
  });
}
