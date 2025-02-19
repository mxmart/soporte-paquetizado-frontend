export interface INotification {
    id:                  number;
    notification_text:   string;
    url:                 string;
    creation_date:       string;
    read:              boolean;
    readby:           string;
};
  
export interface INotifications {
    notifications: INotification[];
    total_notifications: number;
    unreaded_notifications: number;
};