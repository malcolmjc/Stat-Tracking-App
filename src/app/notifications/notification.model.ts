export interface Notification {
  type: 'group-join-request';
  message?: string;
  recipient: string; // username
  sender: string; // username
  details?: any; // should be object with supplemental info
  id: string;
}
