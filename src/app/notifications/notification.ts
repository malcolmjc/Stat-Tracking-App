export interface Notification {
  type: string;
  message?: string;
  recipient: string; // username
  sender: string; // username
  details?: any; // should be object with supplemental info
  id: string;
}
